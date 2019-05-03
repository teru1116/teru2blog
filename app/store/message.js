import firebase from './../plugins/firebase'

const db = firebase.firestore()

const defaultState = () => {
  return {
    messages: []
  }
}

const state = defaultState()

const getters = {
  messages: (state) => state.messages
}

const mutations = {
  addSendingMessage (state, payload) {
    const message = payload
    message.status = 'sending'
    state.messages.push(message)
  },

  addReceivedMessage (state, payload) {
    const message = payload
    message.status = 'sent'
    state.messages.push(message)
  },

  updatedMessage (state, payload) {
    // ストアの中から、送信成功したメッセージを、最新から順に線形探索
    for (let index = state.messages.length - 1; index === 0; index--) {
      let currentMessage = state.messages[index]
      if (currentMessage.id === payload.id) {
        const message = payload
        message.status = 'sent'
        state.messages.splice(index, 1, message)
        break
      }
    }
  },

  setAllMessages (state, payload) {
    state.messages = payload
  },

  clearState (state) {
    state = Object.assign(state, defaultState())
  }
}

const actions = {
  // メッセージ送信時はこれを実行する（メッセージのストアへの追加とDBへの送信を行う）
  async addAndSendMessage ({ dispatch }, { roomId, message }) {
    dispatch('addSendingMessage', message)
    await dispatch('sendMessage', { roomId, message })
  },

  // 送信しようとしているメッセージをローカルで追加する
  addSendingMessage ({ commit }, message) {
    commit('addSendingMessage', message)
  },

  // 受信したメッセージをストアに追加する
  addReceivedMessage ({ commit }, message) {
    commit('addReceivedMessage', message)
  },

  // すでにストアに存在しているメッセージを、DBに送信する
  async sendMessage ({ commit }, { roomId, message }) {
    delete message.status
    message['createdDate'] = firebase.firestore.FieldValue.serverTimestamp()
    const ref = db.collection('rooms').doc(roomId).collection('messages').doc(message.id)
    await ref.set(message)
    const doc = await ref.get()
    const fetchedMessage = Object.assign({ id: doc.id }, doc.data())
    fetchedMessage.createdDate = doc.data().createdDate.toDate()
    commit('updatedMessage', fetchedMessage)
  },

  // 指定したroomIdのメッセージを全取得してストアにセットする
  async fetchAllMessages ({ commit }, roomId) {
    let messages = []
    const snapshot = await db.collection('rooms').doc(roomId).collection('messages').orderBy('createdDate').get()
    snapshot.forEach(doc => {
      const message = Object.assign({ id: doc.id }, doc.data())
      message.status = 'sent'
      message.createdDate = doc.data().createdDate.toDate()
      messages.push(message)
    })
    commit('setAllMessages', messages)
  },

  listenAllMessages ({ commit }, roomId) {
    db.collection('rooms').doc(roomId).collection('messages').orderBy('createdDate')
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type === 'added') {
            const message = Object.assign({ id: change.doc.id }, change.doc.data())
            if (change.doc.data().createdDate) {
              message.createdDate = change.doc.data().createdDate.toDate()
            }
            commit('addReceivedMessage', message)
          }
          if (change.type === "modified") {
            const message = Object.assign({ id: change.doc.id }, change.doc.data())
            message.createdDate = change.doc.data().createdDate.toDate()
            commit('updatedMessage', message)
          }
        })
      })
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
