import firebase from './../plugins/firebase'

const db = firebase.firestore()

const state = () => ({
  list: new Map()
})

const getters = {
  list: (state) => state.list
}

const mutations = {
  addMessage (state, payload) {
    const message = payload.message
    message.status = 'sending'
    state.list.set(payload.id, message)
  },

  sendMessage (state, payload) {
    const message = state.list.get(payload.id)
    message.status = 'sent'
    state.list.set(payload.id, message)
  }
}

const actions = {
  addMessage ({ commit }, { id, message }) {
    commit('addMessage', { id, message })
  },

  async sendMessage ({ commit }, { id, message }) {
    delete message.status
    await db.collection('rooms').doc('TEST_ROOM').collection('messages').doc(id).set(message)
    commit('sendMessage', { id })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
