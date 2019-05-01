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
    const id = v4()
    const message = {
      text: 'TEST_MESSAGE',
      createdDate: new Date(),
      status: 'sending'
    }

    test('ユーザーが送信ボタンを押した時、サーバへの送信成功を待たずに、フロント側でメッセージ(送信中)が追加されていること', () => {
      expect(store.getters['list'].size).toBe(0)
      store.dispatch('addMessage', { id, message })
      expect(store.getters['list'].get(id).text).toBe('TEST_MESSAGE')
    })
  })
})
