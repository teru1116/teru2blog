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

  clearState (state) {
    state = Object.assign(state, defaultState())
  }
}

const actions = {
  async fetchAllRooms ({ commit }) {
    let results = []
    const snapshot = await db.collection('rooms').where('isTestData', '==', true).get()
    snapshot.forEach(doc => {
      results.push(Object.assign({ id: doc.id }, doc.data()))
    })
    commit('setRooms', results)
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
