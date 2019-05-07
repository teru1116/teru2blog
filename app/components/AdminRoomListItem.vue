<template>
  <li>
    <nuxt-link :to="$route.params.roomId ? `${room.id}` : `rooms/${room.id}`">
      <div class="room-list-item-left">
        <p>{{ room.lastMessageText }}</p>
      </div>
      <div class="room-list-item-right">
        <time>{{ dateString }}</time>
      </div>
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
  height: 50px;
  border-bottom: 1px solid rgba(34,34,34,0.2);
  a {
    display: flex;
    justify-content: space-between;
    .room-list-item-left {}
    .room-list-item-right {}
  }
}
</style>
