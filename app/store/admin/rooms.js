import firebase from '@@/app/plugins/firebase'
const db = firebase.firestore()

const state = () => {
  return []
}

const actions = {
  async listenRooms ({ commit }) {
    commit('clearState')
    db.collection('rooms').orderBy('lastMessage.createdDate', 'desc')
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          const room = Object.assign({ id: change.doc.id }, change.doc.data())
          if (change.doc.data().lastMessage.createdDate) {
            room.lastMessage.createdDate = change.doc.data().lastMessage.createdDate.toDate()
          }
          if (change.type === 'added') {
            commit('addRoom', room)
          }
          if (change.type === "modified") {
            commit('updateRoom', room)
          }
        })
      })
  },

  async unlistenRooms ({ commit }) {
    const unsubscribe = db.collection('rooms').onSnapshot(() => {})
    unsubscribe()
  },

  clearRooms ({ commit }) {
    commit('clearState')
  }
}

const mutations = {
  addRoom (state, room) {
    state.push(room)
  },

  updateRoom (state, room) {
    // ストアの中から、該当するルームを、最新から順に線形探索
    for (let index = state.length - 1; index >= 0; index--) {
      let currentRoom = state[index]
      if (currentRoom.id === room.id) {
        const updatedRoom = room
        // ルームを最新に持ってくる
        state.splice(index, 1)
        state.unshift(updatedRoom)
        break
      }
    }
  },

  clearState (state) {
    state.splice(0, state.length)
  }
}

export default {
  state,
  actions,
  mutations
}
