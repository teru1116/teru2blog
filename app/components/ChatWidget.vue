<template>
  <div>
    Chat
    <ul>
      <li v-for="(keyValue, index) in Array.from(message.list)" :key="index">
        <MessageItem
          :messageId="keyValue[0]"
          :message="keyValue[1]"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import MessageItem from './MessageItem'

export default {
  components: {
    MessageItem
  },
  computed: {
    ...mapState([
      'user',
      'message'
    ])
  },
  watch: {
    user: {
      handler (newUser) {
        // ストアのユーザー情報が更新されたら、メッセージを全取得する
        this.$store.dispatch('message/fetchAllMessages', newUser.uid)
      },
      deep: true
    }
  }
}
</script>
