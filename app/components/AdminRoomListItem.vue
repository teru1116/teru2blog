<template>
  <li>
    <nuxt-link :to="$route.params.roomId ? `${room.id}` : `rooms/${room.id}`">
      <time>{{ dateString }}</time>
      <p>{{ room.lastMessageText }}</p>
    </nuxt-link>
  </li>
</template>

<script>
export default {
  props: {
    room: {
      type: Object,
      default: {
        id: '',
        lastMessageText: '',
        lastMessageDate: new Date()
      }
    }
  },
  computed: {
    dateString () {
      const lastMessageDate = this.room.lastMessageDate
      return `${lastMessageDate.getFullYear()}.${lastMessageDate.getMonth() + 1}.${lastMessageDate.getDate()}`
    }
  }
}
</script>

<style lang="scss" scoped>
li {
  height: 60px;
  border-bottom: 1px solid rgba(34,34,34,0.2);
  a {
    display: block;
    padding: 8px 12px;
    time {
      color: #555;
      font-size: 13px;
      font-weight: bold;
    }
    p {
      color: #333;
      font-size: 15px;
      line-height: 1.76;
      margin: 4px 0 0;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      white-space: nowrap;
    }
  }
}
</style>
