<template>
  <div :class="{ isMine }">
    <!-- サムネイル -->
    <div v-if="!isMine">
      <div/>
      <small>{{ message.userName }}</small>
    </div>
    <!-- 吹き出し -->
    <div>
      <p>{{ message.text }}</p>
    </div>
    <!-- 送信時間 -->
    <time v-if="message.status === 'sent'">{{ messageTime }}</time>
  </div>
</template>

<script>
export default {
  props: {
    messageId: String,
    message: Object
  },
  computed: {
    isMine () {
      return this.message.uid === this.$store.state.user.uid
    },
    messageTime () {
      return `${this.message.createdDate.getHours()}:${this.message.createdDate.getMinutes()}`
    }
  },
  data () {
    return {
      //
    }
  }
}
</script>
