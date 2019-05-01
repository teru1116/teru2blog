import Vuex from 'vuex'
import message from './../../app/store/message'
import { createLocalVue } from '@vue/test-utils'
import cloneDeep from 'clone-deep'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('store/message.js', () => {
  let store

  beforeEach(() => {
    store = new Vuex.Store(cloneDeep(message))
  })

  describe('actions', () => {
    test('ユーザーが送信ボタンを押した時、サーバへの送信成功を待たずに、フロント側でメッセージ(送信中)が追加されている', () => {
      expect(store.getters['list'].size).toBe(0)

      store.dispatch('addMessage', {
        text: 'This is a message for test.',
        createdDate: new Date(),
        status: 'sending'
      })

      expect(store.getters['list'].size).toBe(1)
    })
  })
})
