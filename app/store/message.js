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
  },

  setAllMessages (state, payload) {
    state.list = payload
  }
}

const actions = {
  // メッセージをストアに追加する（DBには送信しない）
  addMessage ({ commit }, { messageId, message }) {
    commit('addMessage', { messageId, message })
  },

  // すでにストアに存在しているメッセージを、DBに送信する
  async sendMessage ({ commit }, { roomId, messageId, message }) {
    delete message.status
    await db.collection('rooms').doc(roomId).collection('messages').doc(messageId).set(message)
    commit('sendMessage', { messageId })
  },

  // roomIdを指定すると、DBのメッセージ履歴をストアに反映する
  async fetchAllMessages ({ commit }, roomId) {
    let messages = new Map()
    const snapshot = await db.collection('rooms').doc(roomId).collection('messages').get()
    snapshot.forEach(doc => {
      messages.set(doc.id, doc.data())
    })
    commit('setAllMessages', messages)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
