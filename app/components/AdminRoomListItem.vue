<template>
  <li>
    <nuxt-link :to="`${room.id}`">
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
      const lastMessageDate = this.room.lastMessageDate.toDate()
      return `${lastMessageDate.getFullYear()}.${lastMessageDate.getMonth() + 1}.${lastMessageDate.getDate()}`
    }
  }
}
</script>

<style lang="scss" scoped>
li {
  height: 50px;
  a {
    display: flex;
    justify-content: space-between;
    .room-list-item-left {}
    .room-list-item-right {}
  }
}
</style>
