<template>
  <div class="chat-widget">
    <!-- チャットウィジェット ヘッダー -->
    <div class="widget-header">
      <button class="toggle-widget"/>
      <h2>チャットでお問い合わせ</h2>
    </div>
    <div class="widget-body">
      <!-- チャット表示部 -->
      <div class="messages-view">
        <ul>
          <!-- Vue.jsはMap型のリアクティブをサポートしていないため、ストア側でmessagesが変更されてもUIが更新されない -->
          <!-- messages更新時に手動でフラグを立てるか、他のVue.jsがサポートしている型（ArrayかObject）を検討する -->
          <li v-for="(element, index) in message.messages" :key="index">
            <MessageItem
              :message="element"
            />
          </li>
        </ul>
      </div>
      <!-- チャット入力部 -->
      <div class="input-footer">
        <div class="textbox-wrapper">
          <AutogrowTextarea
            v-model="inputMessageText"
            placeholder="メッセージを入力"
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

export default {
  components: {
    MessageItem,
    AutogrowTextarea
  },
  computed: {
    ...mapState([
      'user',
      'message'
    ])
  },
  data () {
    return {
      inputMessageText: ''
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
    }
  }
}
</script>

<style lang="scss" scoped>
.chat-widget {
  @media screen and (min-width: 600px) {
    width: 400px;
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
      font-size: 18px;
    }
  }
  .widget-body {
    .messages-view {
      padding: 0 8px;
      overflow: scroll;
      @media screen and (min-width: 600px) {
        height: 300px;
      }
      @media screen and (max-width: 599px) {
        height: 300px;
      }
    }
    .input-footer {
      display: flex;
      height: 56px;
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
        button {
          //
        }
      }
    }
  }
}
</style>

