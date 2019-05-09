import firebase from './../../plugins/firebase'

const db = firebase.firestore()

const defaultState = () => {
  return {
    rooms: [],
  }
}

const state = defaultState()

const getters = {
  rooms: state => state.rooms
}

const mutations = {
  setRooms (state, payload) {
    state.rooms = payload
  },

  addRoom (state, payload) {
    state.rooms.push(payload)
  },

  updateRoom (state, payload) {
    // ストアの中から、該当するルームを、最新から順に線形探索
    for (let index = state.rooms.length - 1; index >= 0; index--) {
      let currentRoom = state.rooms[index]
      if (currentRoom.id === payload.id) {
        const room = payload
        // ルームを最新に持ってくる
        state.rooms.splice(index, 1)
        state.rooms.unshift(room)
        break
      }
    }
  },

  clearState (state) {
    state = Object.assign(state, defaultState())
  }
}

const actions = {
  async fetchAllRooms ({ commit }) {
    let results = []
    const snapshot = await db.collection('rooms').where('isTestData', '==', false).get()
    snapshot.forEach(doc => {
      results.push(Object.assign({ id: doc.id }, doc.data()))
    })
    commit('setRooms', results)
  },

  async listenAllRooms ({ commit }) {
    commit('clearState')
    db.collection('rooms').orderBy('lastMessageDate', 'desc')
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          const room = Object.assign({ id: change.doc.id }, change.doc.data())
          if (change.doc.data().lastMessageDate) {
            room.lastMessageDate = change.doc.data().lastMessageDate.toDate()
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

  async unlistenAllRooms ({ commit }) {
    const unsubscribe = db.collection('rooms').onSnapshot(() => {})
    unsubscribe()
  },

  clearState ({ commit }) {
    commit('clearState')
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
