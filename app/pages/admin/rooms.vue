<template>
  <section>
    <div class="room-list-wrapper">
      <ul>
        <ListItem
          v-for="(room, index) in rooms"
          :room="room"
          :key="index"
        />
      </ul>
    </div>
    <div class="room-messages-wrapper">
      <nuxt-child />
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import ListItem from './../../components/AdminRoomListItem'

export default {
  components: {
    ListItem
  },
  computed: {
    ...mapState({
      rooms: state => state.admin.room.rooms
    })
  },
  created () {
    this.$store.dispatch('admin/room/fetchAllRooms')
  },
  layout: 'admin'
}
</script>

<style lang="scss" scoped>
section {
  display: flex;
  .room-list-wrapper {
    width: 300px;
    border-right: 1px solid #eaecef;
    ul {
      height: calc(100vh - 48px);
      overflow: scroll;
    }
  }
  .room-messages-wrapper {
    flex: 1;
    height: calc(100vh - 48px);
  }
}
</style>

