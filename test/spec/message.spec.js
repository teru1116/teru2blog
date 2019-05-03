import Vuex from 'vuex'
import message from './../../app/store/message'
import { createLocalVue } from '@vue/test-utils'
import cloneDeep from 'clone-deep'
import v4 from 'uuid/v4'
import firebase from './../../app/plugins/firebase'

const localVue = createLocalVue()
localVue.use(Vuex)

const roomIdForSendTest = 'ROOM_FOR_SEND_TEST'
const roomIdForFetchTest = 'ROOM_FOR_FETCH_TEST'
const roomIdForListenTest = 'ROOM_FOR_LISTEN_TEST'

describe('store/message.js', () => {
  let store
  let db

  beforeAll(async () => {
    store = new Vuex.Store(cloneDeep(message))
    db = firebase.firestore()

    // initialize DB
    const batch = db.batch()

    // DBの取得テスト用ルームのメッセージ数を5件にする
    const fSnapshot = await db.collection('rooms').doc(roomIdForFetchTest).collection('messages').get()
    fSnapshot.forEach(doc => {
      batch.delete(doc.ref)
    })

    for (let index = 0; index < 5; index++) {
      const messageId = v4()
      const message = {
        uid: (index % 2 === 0) ? '12345' : roomIdForFetchTest,
        text: `MESSAGE_${index}`,
        createdDate: firebase.firestore.FieldValue.serverTimestamp()
      }
      batch.set(db.collection('rooms').doc(roomIdForFetchTest).collection('messages').doc(messageId), message)
    }

    await batch.commit()
  })

  beforeEach(async () => {
    // clear DB
    const batch = db.batch()
    
    const sSnapshot = await db.collection('rooms').doc(roomIdForSendTest).collection('messages').get()
    sSnapshot.forEach(doc => {
      batch.delete(doc.ref)
    })

    const lSnapshot = await db.collection('rooms').doc(roomIdForListenTest).collection('messages').get()
    lSnapshot.forEach(doc => {
      batch.delete(doc.ref)
    })

    batch.commit()

    // clear Vuex Store
    store.dispatch('clearState')
  })
  
  test('ユーザーが送信ボタンを押した時、サーバへの送信成功を待たずして、ストアにメッセージ(送信中)が追加されていること', () => {
    expect(store.getters['messages'].length).toBe(0)

    store.dispatch('addSendingMessage', {
      id: v4(),
      text: 'ADD_MESSAGE'
    })

    expect(store.getters['messages'].length).toBe(1)
    expect(store.getters['messages'][0].text).toBe('ADD_MESSAGE')
    expect(store.getters['messages'][0].status).toBe('sending')
  })

  test('ストアに追加したメッセージが送信されていること', async () => {
    expect(store.getters['messages'].length).toBe(0)

    await store.dispatch('addAndSendMessage', {
      roomId: roomIdForSendTest,
      message: {
        id: v4(),
        text: 'SEND_MESSAGE'
      }
    })

    expect(store.getters['messages'].length).toBe(1)
    expect(store.getters['messages'][0].text).toBe('SEND_MESSAGE')
    expect(store.getters['messages'][0].status).toBe('sent')
  })

  test('サーバへの送信が成功した時、メッセージのステータスが送信中から送信完了に変わること', async () => {
    expect(store.getters['messages'].length).toBe(0)

    // 送信中のメッセージがすでにストアに存在している状態にする
    const message = {
      id: v4(),
      text: 'UPDATE_STATUS'
    }
    store.dispatch('addSendingMessage', message)

    expect(store.getters['messages'][0].text).toBe('UPDATE_STATUS')
    expect(store.getters['messages'][0].status).toBe('sending')

    await store.dispatch('sendMessage', { roomId: roomIdForSendTest, message })

    expect(store.getters['messages'][0].text).toBe('UPDATE_STATUS')
    expect(store.getters['messages'][0].status).toBe('sent')
  })

  test('サーバへの送信が成功した時、メッセージに送信時刻がセットされていること', async () => {
    expect(store.getters['messages'].length).toBe(0)

    // 送信中のメッセージがすでにストアに存在している状態にする
    const message = {
      id: v4(),
      text: 'UPDATE_STATUS'
    }
    store.dispatch('addSendingMessage', message)

    expect(store.getters['messages'][0].text).toBe('UPDATE_STATUS')
    expect(store.getters['messages'][0].createdDate).toBeUndefined

    await store.dispatch('sendMessage', { roomId: roomIdForSendTest, message })

    expect(store.getters['messages'][0].createdDate).toBeTruthy()
  })

  test('ルームIDが与えられると、DBのメッセージ履歴がストアに展開されること', async () => {
    expect(store.getters['messages'].length).toBe(0)

    const roomId = roomIdForFetchTest
    await store.dispatch('fetchAllMessages', roomId)

    expect(store.getters['messages'].length).toBe(5)
  })

  test('リッスン開始後、裏からDBにメッセージを追加すると、ストアに反映されていること', async () => {
    expect(store.getters['messages'].length).toBe(0)

    const roomId = roomIdForListenTest
    const messageId = v4()

    store.dispatch('listenAllMessages', roomId)
    await db.collection('rooms').doc(roomId).collection('messages').doc(messageId).set({
      text: 'LISTEN_MESSAGE',
      createdDate: firebase.firestore.FieldValue.serverTimestamp()
    })

    expect(store.getters['messages'].length).toBe(1)
    expect(store.getters['messages'][0].text).toBe('LISTEN_MESSAGE')
  })

  afterAll(async () => {
    // clear DB
    const batch = db.batch()
    
    const sSnapshot = await db.collection('rooms').doc(roomIdForSendTest).collection('messages').get()
    sSnapshot.forEach(doc => {
      batch.delete(doc.ref)
    })

    const fSnapshot = await db.collection('rooms').doc(roomIdForFetchTest).collection('messages').get()
    fSnapshot.forEach(doc => {
      batch.delete(doc.ref)
    })

    const lSnapshot = await db.collection('rooms').doc(roomIdForListenTest).collection('messages').get()
    lSnapshot.forEach(doc => {
      batch.delete(doc.ref)
    })

    await batch.commit()

    // clear Vuex Store
    store.dispatch('clearState')
  })

})
