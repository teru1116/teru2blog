<template>
  <div class="chatroom">
    <!-- チャット表示部 -->
    <div class="messages-view" :style="{ height: `calc(100vh - 48px - 16px - ${footerHeight}px)` }">
      <ol>
        <li v-for="(message, index) in messages" :key="index">
          <MessageItem :message="message" />
        </li>
      </ol>
    </div>
    <!-- チャット入力部 -->
    <div class="input-footer" :style="{ height: `${footerHeight}px` }">
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
</template>

<script>
import { mapState } from 'vuex'
import MessageItem from './../../../components/MessageItem'
import AutogrowTextarea from './../../../components/AutogrowTextarea'
import v4 from 'uuid/v4'

export default {
  components: {
    MessageItem,
    AutogrowTextarea
  },
  computed: {
    ...mapState({
      messages () { return this.$store.state.admin.message.messages }
    })
  },
  data () {
    return {
      inputMessageText: '',
      footerHeight: 32
    }
  },
  watch: {
    '$route.params.roomId': function (roomId) {
      this.$store.dispatch('admin/message/unlistenAllMessages', this.$route.params.roomId)
      this.$store.dispatch('admin/message/listenAllMessages', roomId)
    }
  },
  methods: {
    onClickSendButton () {
      const roomId = this.$route.params.roomId
      const message = {
        id: v4(),
        uid: 'admin',
        text: this.inputMessageText
      }
      this.$store.dispatch('admin/message/addAndSendMessage', { roomId, message })
      this.inputMessageText = ''
    },
    onChangeTextareaHeight (newVal) {
      this.footerHeight = newVal + 18
    }
  },
  created () {
    this.$store.dispatch('admin/message/listenAllMessages', this.$route.params.roomId)
  },
  destroyed () {
    this.$store.dispatch('admin/message/unlistenAllMessages', this.$route.params.roomId)
  }
}
</script>

<style lang="scss" scoped>
.chatroom {
  height: calc(100vh - 48px);
  position: relative;
  @media screen and (min-width: 600px) {
    width: calc(100vw - 300px);
  }
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
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    border-top: 1px solid #e6e6e6;
    padding: 8px 8px;
    background-color: #fff;
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
</style>

