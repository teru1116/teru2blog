import Vuex from 'vuex'
import room from '@/app/store/admin/room'
import { createLocalVue } from '@vue/test-utils'
import cloneDeep from 'clone-deep'
import firebase from '@/app/plugins/firebase'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('store/admin/room', () => {
  let store
  let db

  beforeAll(async () => {
    store = new Vuex.Store(cloneDeep(room))
    db = firebase.firestore()

    // initialize DB
    // テスト用のルームを予め30件登録しておく
    const batch = db.batch()
    for (let index = 30; index > 0; index--) {
      const lastMessageText = `MESSAGE_${30 - index}`
      const createdDate = new Date(new Date().getTime() - index * 24 * 60 * 60 * 1000)
      const room = {
        lastMessageText: lastMessageText,
        createdDate: createdDate,
        lastMessageText: createdDate,
        isTestData: true
      }
      const ref = db.collection('rooms').doc()
      batch.set(ref, room)
    }

    await batch.commit()
  })

  beforeEach(async () => {
    // clear DB

    // clear Vuex Store
    store.dispatch('clearState')
  })
  
  test('ルームが30件ストアに読み込まれていること', async () => {
    expect(store.getters['rooms'].length).toBe(0)

    await store.dispatch('fetchAllRooms')

    expect(store.getters['rooms'].length).toBe(30)
  })

  afterAll(async () => {
    // clear DB
    const batch = db.batch()
    const snapshot = await db.collection('rooms').where('isTestData', '==', true).get()
    snapshot.forEach(doc => {
      batch.delete(doc.ref)
    })
    await batch.commit()

    // clear Vuex Store
    store.dispatch('clearState')
  })

})
