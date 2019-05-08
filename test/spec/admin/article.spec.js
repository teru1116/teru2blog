import Vuex from 'vuex'
import article from './../../../app/store/admin/article'
import { createLocalVue } from '@vue/test-utils'
import cloneDeep from 'clone-deep'
import firebase from './../../../app/plugins/firebase'
import v4 from 'uuid/v4'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('store/admin/article', () => {
  let store
  let db

  beforeAll(async () => {
    store = new Vuex.Store(cloneDeep(article))
    db = firebase.firestore()
    const testArticleCount = 25

    // initialize DB
    // テスト用の記事を予め登録しておく
    const batch = db.batch()
    for (let index = 0; index < testArticleCount; index++) {
      const article = {
        title: `ARTICLE_${testArticleCount - index}`,
        createdDate: new Date(new Date().getTime() - (testArticleCount - index) * 24 * 60 * 60 * 1000),
        isTestData: true
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
  
  test('初回リクエストを行うと、記事が20件ストアに保持されていること', async () => {
    expect(store.getters['articles'].length).toBe(0)

    await store.dispatch('fetchAllArticles')

    expect(store.getters['articles'].length).toBe(20)
  })

  test('記事を投稿すると、DBに登録されていること', async () => {
    const beforeSnapshot = await db.collection('articles').where('isTestData', '==', true).get()
    expect(beforeSnapshot.size).toBe(testArticleCount)

    const articleId = v4()
    store.dispatch('updateTitle', 'TITLE')
    store.dispatch('updateContentHTML', '<p>CONTENT</p>')
    store.dispatch('selectCategory', 'CATEGORY')
    await store.dispatch('postArticle', articleId)

    const doc = await db.collection('articles').doc(articleId).get()
    const article = doc.data()
    expect(article.isPublished).toBeTruthy()
    expect(article.title).toBe('TITLE')
    expect(article.contentHTML).toBe('<p>CONTENT</p>')
    expect(article.categories).toContain('CATEGORY')
  })

  test('記事を下書き保存すると、DBに下書きで登録されていること', () => {
    const snapshot = await db.collection('articles').where('isTestData', '==', true).get()
    expect(snapshot.size).toBe(testArticleCount)

    const articleId = v4()
    store.dispatch('updateTitle', 'TITLE')
    store.dispatch('updateContentHTML', '<p>CONTENT</p>')
    store.dispatch('selectCategory', 'CATEGORY')
    await store.dispatch('saveArticle', articleId)

    const doc = await db.collection('articles').doc(articleId).get()
    const article = doc.data()
    expect(article.isPublished).toBeFalsy()
    expect(article.title).toBe('TITLE')
    expect(article.contentHTML).toBe('<p>CONTENT</p>')
    expect(article.categories).toContain('CATEGORY')
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
