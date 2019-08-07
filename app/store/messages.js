import firebase from '@@/app/plugins/firebase'
const db = firebase.firestore()

let listenStartTime

const state = () => {
  return []
}

const actions = {
  listenMessages ({ commit }, roomId) {
    listenStartTime = new Date()
    db.collection('rooms').doc(roomId).collection('messages').orderBy('createdDate')
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

  unlistenAllMessages ({ commit }, roomId) {
    const unsubscribe = db.collection('rooms').doc(roomId).collection('messages').onSnapshot(() => {})
    unsubscribe()
  }
}

const mutations = {
  addMessage (state, message) {
    state.push(message)
  },

  updateMessage (state, message) {
    // 更新対象のmessageをストア中の最新から順に線形探索
    for (let index = state.length - 1; index >= 0; index--) {
      let currentMessage = state[index]
      if (currentMessage.id === message.id) {
        const message = currentMessage
        state.splice(index, 1, message)
        break
      }
    }
  }
}

export default {
  state,
  actions,
  mutations
}
