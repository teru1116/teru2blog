import Vuex from 'vuex'
import message from './../../app/store/message'
import { createLocalVue } from '@vue/test-utils'
import cloneDeep from 'clone-deep'
import v4 from 'uuid/v4'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('store/message.js', () => {
  let store

  beforeEach(() => {
    store = new Vuex.Store(cloneDeep(message))
  })

  describe('メッセージ送信', () => {
    
    test('ユーザーが送信ボタンを押した時、サーバへの送信成功を待たずに、フロント側でメッセージ(送信中)が追加されていること', () => {
      expect(store.getters['list'].size).toBe(0)

      const id = v4()
      store.dispatch('addMessage', {
        id,
        message: {
          text: 'ADD_MESSAGE'
        }
      })
      expect(store.getters['list'].get(id).text).toBe('ADD_MESSAGE')
    })
  
    test('サーバへの送信が成功した時、送信中だったメッセージが送信完了に変わっていること', async () => {
      // 送信中のメッセージがすでにストアに存在している状態にする
      const id = v4()
      const message = {
        text: 'UPDATE_STATUS'
      }
      store.dispatch('addMessage', { id, message })
      expect(store.getters['list'].get(id).text).toBe('UPDATE_STATUS')

      // サーバへのメッセージ送信を実行する
      await store.dispatch('sendMessage', { id, message })

      // 最初のメッセージのステータスが送信済みに変わっていること
      expect(store.getters['list'].get(id).status).toBe('sent')
    })

  })
})
