<template>
  <div
    class="message-item"
    :class="{ isMine }"
  >
    <!-- サムネイル -->
    <div v-if="!isMine">
      <div/>
      <small>{{ message.userName }}</small>
    </div>
    <!-- 吹き出し -->
    <div class="bubble">
      <p>{{ message.text }}</p>
    </div>
    <!-- 送信時間 -->
    <time v-if="message.status === 'sent' && message.createdDate">{{ messageTime }}</time>
  </div>
</template>

<script>
export default {
  props: {
    message: Object
  },
  computed: {
    isMine () {
      return this.message.uid === this.$store.state.user.uid
    },
    messageTime () {
      const createdDate = this.message.createdDate
      let minutes = this.message.createdDate.getMinutes()
      if (minutes < 10) {
        minutes = `0${minutes}`
      }
      return createdDate ? `${this.message.createdDate.getHours()}:${minutes}` : ''
    }
  },
  data () {
    return {
      //
    }
  }
}
</script>

<style lang="scss" scoped>
.message-item {
  display: flex;
  align-items: flex-end;
  padding: 4px 0;
  @media screen and (min-width: 600px) {}
  @media screen and (max-width: 599px) {}
  .bubble {
    background-color: #f5f9fa;
    color: #222;
    padding: 4px 8px;
    border-radius: 4px;
    @media screen and (min-width: 600px) {}
    @media screen and (max-width: 599px) {}
  }
  time {
    font-size: 12px;
    margin: 0 0 0 6px;
    @media screen and (min-width: 600px) {}
    @media screen and (max-width: 599px) {}
  }
  &.isMine {
    flex-direction: row-reverse;
    .bubble {
      background-color: #0070c9;
      background: linear-gradient(#42a1ec,#0070c9);
      color: #fff;
    }
    time {
      margin: 0 6px 0 0;
    }
  }
}
</style>
