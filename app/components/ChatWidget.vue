<template>
  <div class="chat-widget">
    <!-- チャットウィジェット ヘッダー -->
    <div class="widget-header">
      <button class="toggle-widget"/>
      <h2>チャットでお問い合わせ</h2>
    </div>
    <div class="widget-body">
      <!-- チャット表示部 -->
      <div
        class="messages-view"
        :style="{ height: `${messageViewHeight}px` }"
      >
        <ol>
          <li v-for="(element, index) in message.messages" :key="index">
            <MessageItem
              :message="element"
            />
          </li>
        </ol>
      </div>
      <!-- チャット入力部 -->
      <div
        class="input-footer"
        :style="{ height: `${footerHeight}px` }"
      >
        <div class="textbox-wrapper">
          <AutogrowTextarea
            v-model="inputMessageText"
            placeholder="メッセージを入力"
            v-on:onChangeHeight="onChangeTextareaHeight"
          />
        </div>
        <div class="sendbutton-wrapper">
          <button class="submit" @click="onClickSendButton">送信</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import MessageItem from './MessageItem'
import AutogrowTextarea from './AutogrowTextarea'
import v4 from 'uuid/v4'

const widgetBodyDefaultHeight = 350

export default {
  components: {
    MessageItem,
    AutogrowTextarea
  },
  computed: {
    ...mapState([
      'user',
      'message'
    ]),
    messageViewHeight () {
      return widgetBodyDefaultHeight - this.footerHeight
    }
  },
  data () {
    return {
      inputMessageText: '',
      footerHeight: 50
    }
  },
  watch: {
    user: {
      handler (newUser) {
        // ストアのユーザー情報が更新されたら、メッセージのリッスンを開始する
        this.$store.dispatch('message/listenAllMessages', newUser.uid)
      },
      deep: true
    }
  },
  methods: {
    onClickSendButton () {
      const roomId = this.user.uid
      const message = {
        id: v4(),
        uid: this.user.uid,
        text: this.inputMessageText
      }
      this.$store.dispatch('message/addAndSendMessage', { roomId, message })
      this.inputMessageText = ''
    },
    onChangeTextareaHeight (newVal) {
      this.footerHeight = newVal + 18
    }
  }
}
</script>

<style lang="scss" scoped>
.chat-widget {
  position: absolute;
  bottom: 0;
  right: 15px;
  background-color: #fff;
  @media screen and (min-width: 600px) {
    width: 300px;
  }
  @media screen and (max-width: 599px) {}
  .widget-header {
    display: flex;
    background-color: #0070c9;
    background: linear-gradient(#42a1ec,#0070c9);
    color: #fff;
    padding: 12px 8px;
    @media screen and (min-width: 600px) {}
    @media screen and (max-width: 599px) {}
    h2 {
      font-size: 16px;
      margin: 0;
    }
  }
  .widget-body {
    .messages-view {
      padding: 0 8px;
      overflow: scroll;
      ol {
        padding: 8px 0 0;
        li {
          margin-bottom: 8px;
        }
      }
    }
    .input-footer {
      display: flex;
      border-top: 1px solid #e6e6e6;
      padding: 8px 8px;
      .textbox-wrapper {
        flex: 1;
        textarea {
          width: 100%;
          border: 0;
        }
      }
      .sendbutton-wrapper {
        width: 64px;
        margin-left: 8px;
      }
    }
  }
}
</style>
