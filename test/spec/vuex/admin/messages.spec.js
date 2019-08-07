import Vuex from 'vuex'
import { createLocalVue } from '@vue/test-utils'
import cloneDeep from 'clone-deep'
// store
import messages from '@@/app/store/admin/messages'
// Firebase
import firebase from '@@/app/plugins/firebase'
const db = firebase.firestore()

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Vuex: admin/messages', () => {
  let store

  beforeAll(() => {
    store = new Vuex.Store(cloneDeep(messages))
  })
  
  beforeEach(() => {})
  
  test('アクション"sendMessage"を実行すると、messagesの件数が4件になっていること', async () => {
    expect(store.state.length).toBe(0)
    const roomId = 'TEST_ROOM'
    const message = { id: '12345', uid: '67890', text: 'ADDED_MESSAGE' }
    await store.dispatch('sendMessage', { roomId, message })
    expect(store.state.length).toBe(1)
  })
  
  afterEach(() => {})
  
  afterAll(async () => {
    // テストの過程で追加したデータの削除
    const snapshot = await db.collection('rooms').doc('TEST_ROOM').collection('messages').orderBy('createdDate', 'desc').limit(1).get()
    const ref = snapshot.docs[0].ref
    ref.delete()
  })
})