import Vuex from 'vuex'
import message from './../../app/store/message'
import { createLocalVue } from '@vue/test-utils'
import cloneDeep from 'clone-deep'
import v4 from 'uuid/v4'
import firebase from './../../app/plugins/firebase'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('store/message.js', () => {
  let store

  beforeEach(() => {
    store = new Vuex.Store(cloneDeep(message))
  })

  describe('メッセージ送信', () => {

    beforeAll(async () => {
      const db = firebase.firestore()
      // DBの送信テスト用ルームのメッセージ数を0件にする
      //
      // DBの取得テスト用ルームのメッセージ数を5件にする
      const batch = db.batch()
      for (let index = 0; index < 5; index++) {
        const messageId = v4()
        const message = { text: `MESSAGE_${index}` }
        batch.set(db.collection('rooms').doc('ROOM_FOR_FETCH_TEST').collection('messages').doc(messageId), message)
      }
      await batch.commit()
    })
    
    test('ユーザーが送信ボタンを押した時、サーバへの送信成功を待たずに、フロント側でメッセージ(送信中)が追加されていること', () => {
      expect(store.getters['list'].size).toBe(0)

      const messageId = v4()
      store.dispatch('addMessage', {
        messageId,
        message: {
          text: 'ADD_MESSAGE'
        }
      })
      expect(store.getters['list'].get(messageId).text).toBe('ADD_MESSAGE')
    })
  
    test('サーバへの送信が成功した時、送信中だったメッセージが送信完了に変わっていること', async () => {
      // 送信中のメッセージがすでにストアに存在している状態にする
      const messageId = v4()
      const message = {
        text: 'UPDATE_STATUS'
      }
      store.dispatch('addMessage', { messageId, message })
      expect(store.getters['list'].get(messageId).text).toBe('UPDATE_STATUS')

      // サーバへのメッセージ送信を実行する
      await store.dispatch('sendMessage', { roomId: 'ROOM_FOR_SEND_TEST', messageId, message })

      // 最初のメッセージのステータスが送信済みに変わっていること
      expect(store.getters['list'].get(messageId).status).toBe('sent')
    })

    test('ルームIDが与えると、DBのメッセージ履歴がストアに展開されること', () => {
      expect(store.getters['list'].size).toBe(0)

      const roomId = 'ROOM_FOR_FETCH_TEST'
      store.dispatch('fetchMessages', roomId)

      expect(store.getters['list'].size).toBe(5)
    })

  })
})
