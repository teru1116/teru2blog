<template>
  <section>
    <template v-if="!$isMobile || $isMobile && !$route.params.roomId">
      <div class="room-list-wrapper">
        <ul>
          <ListItem
            v-for="(room, index) in rooms"
            :room="room"
            :key="index"
          />
        </ul>
      </div>
    </template>
    <template v-if="$route.params.roomId">
      <div class="room-messages-wrapper">
        <nuxt-child />
      </div>
    </template>
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
    this.$store.dispatch('admin/room/listenAllRooms')
  },
  destroyed () {
    this.$store.dispatch('admin/room/unlistenAllRooms')
  },
  layout: 'admin'
}
</script>

<style lang="scss" scoped>
section {
  @media screen and (min-width: 600px) {
    display: flex;
  }
  .room-list-wrapper {
    border-right: 1px solid #eaecef;
    @media screen and (min-width: 600px) {
      width: 300px;
    }
    @media screen and (max-width: 599px) {
      width: 100vw;
    }
    ul {
      height: calc(100vh - 48px);
      overflow: scroll;
    }
  }
  .room-messages-wrapper {
    height: calc(100vh - 48px);
    @media screen and (min-width: 600px) {
      flex: 1;
    }
    @media screen and (max-width: 599px) {
      width: 100vw;
    }
  }
}
</style>
