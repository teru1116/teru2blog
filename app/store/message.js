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
    state.list.set(payload.messageId, message)
  },

  sendMessage (state, payload) {
    const message = state.list.get(payload.messageId)
    message.status = 'sent'
    state.list.set(payload.messageId, message)
  }
}

const actions = {
  addMessage ({ commit }, { messageId, message }) {
    commit('addMessage', { messageId, message })
  },

  async sendMessage ({ commit }, { roomId, messageId, message }) {
    delete message.status
    await db.collection('rooms').doc(roomId).collection('messages').doc(messageId).set(message)
    commit('sendMessage', { messageId })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
