import Vuex from 'vuex'
import article from './../../app/store/article'
import { createLocalVue } from '@vue/test-utils'
import cloneDeep from 'clone-deep'
import firebase from './../../app/plugins/firebase'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('store/article.js', () => {
  let store
  let db

  beforeAll(async () => {
    store = new Vuex.Store(cloneDeep(article))
    db = firebase.firestore()

    // initialize DB
    // テスト用の記事を予め25件登録しておく
    const batch = db.batch()
    for (let index = 0; index < 25; index++) {
      const article = {
        title: `ARTICLE_${25 - index}`,
        createdDate: new Date(new Date().getTime() - (25 - index) * 24 * 60 * 60 * 1000),
        isTestData: false
      }
      const ref = db.collection('articles').doc()
      batch.set(ref, article)
    }

    batch.commit()
  })

  beforeEach(async () => {
    // clear DB

    // clear Vuex Store
    store.dispatch('clearState')
  })
  
  test('初回リクエストを行うと、記事が10件ストアに保持されていること', async () => {
    expect(store.getters['recentArticles'].length).toBe(0)

    await store.dispatch('fetchRecentArticles')

    expect(store.getters['recentArticles'].length).toBe(10)
  })

  afterAll(async () => {
    // clear DB
    const batch = db.batch()
    const snapshot = await db.collection('articles').where('isTestData', '==', true).get()
    snapshot.forEach(doc => {
      batch.delete(doc.ref)
    })
    await batch.commit()

    // clear Vuex Store
    store.dispatch('clearState')
  })

})
