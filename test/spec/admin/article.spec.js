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
  let testArticleCount

  beforeAll(async () => {
    store = new Vuex.Store(cloneDeep(article))
    db = firebase.firestore()
    testArticleCount = 25

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
    const articleId = v4()
    const isTestData = true
    store.dispatch('updateTitle', 'TITLE_1')
    store.dispatch('updateContentHTML', '<p>CONTENT_1</p>')
    store.dispatch('selectCategory', 'CATEGORY_1')
    await store.dispatch('postArticle', { articleId, isTestData })

    const doc = await db.collection('articles').doc(articleId).get()
    const article = doc.data()
    expect(article.isPublished).toBeTruthy()
    expect(article.title).toBe('TITLE_1')
    expect(article.contentHTML).toBe('<p>CONTENT_1</p>')
    expect(article.categories).toContain('CATEGORY_1')
  })

  test('記事を下書き保存すると、DBに下書きで登録されていること', async () => {
    const articleId = v4()
    const isTestData = true
    store.dispatch('updateTitle', 'TITLE_2')
    store.dispatch('updateContentHTML', '<p>CONTENT_2</p>')
    store.dispatch('selectCategory', 'CATEGORY_2')
    await store.dispatch('saveArticle', { articleId, isTestData })

    const doc = await db.collection('articles').doc(articleId).get()
    const article = doc.data()
    expect(article.isPublished).toBeFalsy()
    expect(article.title).toBe('TITLE_2')
    expect(article.contentHTML).toBe('<p>CONTENT_2</p>')
    expect(article.categories).toContain('CATEGORY_2')
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
