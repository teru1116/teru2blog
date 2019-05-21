<template>
  <div class="chat-widget" :class="{ isExpanded }">
    <!-- チャットウィジェット ヘッダー -->
    <div class="widget-header">
      <button class="toggle-widget" @click="isExpanded = !isExpanded">
        <i class="material-icons">{{ isExpanded ? 'expand_more' : 'expand_less' }}</i>
      </button>
      <h2>チャットでお問い合わせ</h2>
    </div>
    <div class="widget-body">
      <!-- チャット表示部 -->
      <div
        class="messages-view"
        :style="{ height: `${messageViewHeight}px` }"
      >
        <ol>
          <li v-for="(element, index) in messages" :key="index">
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
    ...mapState({
      messages: state => state.messages,
      me: state => state.me
    }),
    messageViewHeight () {
      return widgetBodyDefaultHeight - this.footerHeight
    }
  },
  data () {
    return {
      inputMessageText: '',
      footerHeight: 50,
      isExpanded: false
    }
  },
  watch: {
    me: {
      handler (newVal) {
        // ストアのユーザー情報が更新されたら、メッセージのリッスンを開始する
        this.$store.dispatch('messages/listenMessages', newVal.uid)
      },
      deep: true
    }
  },
  methods: {
    async onClickSendButton () {
      const uid = this.me.uid
      const roomId = uid
      const message = {
        id: v4(),
        uid,
        text: this.inputMessageText
      }
      await this.$store.dispatch('messages/sendMessage', { roomId, message }).catch(e => {
        window.alert('メッセージの送信に失敗しました。')
        console.error(e)
      })
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
  bottom: -367px;
  background-color: #fff;
  border-color: #0052A3;
  &.isExpanded {
    bottom: 0;
  }
  @media screen and (min-width: 600px) {
    right: 15px;
    width: 300px;
  }
  @media screen and (max-width: 599px) {
    right: 0;
    width: 75vw;
  }
  .widget-header {
    display: flex;
    background-color: #0052A3;
    border-radius: 4px 4px 0 0;
    color: #fff;
    padding: 6px 8px;
    @media screen and (min-width: 600px) {}
    @media screen and (max-width: 599px) {}
    .toggle-widget {
      height: 16px;
      margin-right: 4px;
      i {
        font-size: 20px;
        color: #fff;
      }
    }
    h2 {
      color: #fff;
      font-size: 14px;
      line-height: 18px;
      margin: 0;
    }
  }
  .widget-body {
    border-left: 1px solid #e6e6e6;
    border-right: 1px solid #e6e6e6;
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
      align-items: flex-end;
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
        margin-left: 8px;
      }
    }
  }
}
</style>

