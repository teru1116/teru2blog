import firebase from '@@/app/plugins/firebase'

const db = firebase.firestore()

const state = () => {
  return {
    messages: [],
    unsubscribe: null // リッスン開始時に返される、リスナーをデタッチする関数
  }
}

const actions = {
  listenMessages ({ commit }, roomId) {
    if (!roomId) return

    const unsubscribe = db.collection('rooms').doc(roomId).collection('messages').orderBy('createdDate')
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          const message = Object.assign({ id: change.doc.id }, change.doc.data())

          // リモートの変更であれば、DBのcreatedDateにサーバ時間がセットされているので、messageにセットする
          if (change.doc.data().createdDate) {
            message.createdDate = change.doc.data().createdDate.toDate()
          }

          if (change.type === 'added') {
            commit('addMessage', message)
          }
          if (change.type === "modified") {
            commit('updateMessage', message)
          }
        })
      })

      commit('setUnsubscribe', unsubscribe)
  },

  async sendMessage ({ commit }, { roomId, message }) {
    const batch = db.batch()
    const roomRef = db.collection('rooms').doc(roomId)
    const messageRef = db.collection('rooms').doc(roomId).collection('messages').doc(message.id)
    
    // ルームDBを更新
    batch.set(roomRef, {
      lastMessage: {
        id: message.id,
        uid: message.uid,
        text: message.text,
        createdDate: firebase.firestore.FieldValue.serverTimestamp()
      }
    })

    // メッセージDBを更新
    message['createdDate'] = firebase.firestore.FieldValue.serverTimestamp()
    batch.set(messageRef, message)
    
    await batch.commit()
  },

  unlistenMessages ({ state }) {
    state.unsubscribe()
  },

  clearState ({ commit }) {
    commit('clearState')
  }
}

const mutations = {
  addMessage (state, message) {
    state.messages.push(message)
  },

  updateMessage (state, message) {
    const messages = state.messages
    // 更新対象のmessageをストア中の最新から順に線形探索
    for (let index = messages.length - 1; index >= 0; index--) {
      let currentMessage = messages[index]
      if (currentMessage.id === message.id) {
        state.messages.splice(index, 1, message)
        break
      }
    }
  },

  setUnsubscribe (state, unsubscribe) {
    state.unsubscribe = unsubscribe
  },

  clearState (state) {
    state.messages.splice(0, state.messages.length)
    state.unsubscribe = null
  }
}

export default {
  state,
  actions,
  mutations
}
