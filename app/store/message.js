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

  updateSentMessage (state, payload) {
    const message = state.list.get(payload.messageId)
    message.status = 'sent'
    message.createdDate = payload.createdDate
    state.list.set(payload.messageId, message)
  },

  setAllMessages (state, payload) {
    state.list = payload
  }
}

const actions = {
  // メッセージ送信時はこれを実行する（メッセージのストアへの追加とDBへの送信を行う）
  async addAndSendMessage ({ dispatch }, { roomId, messageId, message }) {
    dispatch('addMessage', { messageId, message })
    await dispatch('sendMessage', { roomId, messageId, message })
  },

  // メッセージをストアに追加する（DBには送信しない）
  addMessage ({ commit }, { messageId, message }) {
    commit('addMessage', { messageId, message })
  },

  // すでにストアに存在しているメッセージを、DBに送信する
  async sendMessage ({ commit }, { roomId, messageId, message }) {
    delete message.status
    message['createdDate'] = firebase.firestore.FieldValue.serverTimestamp()
    const ref = db.collection('rooms').doc(roomId).collection('messages').doc(messageId)
    await ref.set(message)
    const doc = await ref.get()
    const createdDate = doc.data().createdDate.toDate()
    commit('updateSentMessage', { messageId, createdDate })
  },

  // 指定したroomIdのメッセージを全取得してストアにセットする
  async fetchAllMessages ({ commit }, roomId) {
    let messages = new Map()
    const snapshot = await db.collection('rooms').doc(roomId).collection('messages').get()
    snapshot.forEach(doc => {
      const message = Object.assign(doc.data(), { status: 'sent' })
      message.createdDate = doc.data().createdDate.toDate()
      messages.set(doc.id, message)
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
