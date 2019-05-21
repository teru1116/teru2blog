import Vuex from 'vuex'
import { createLocalVue } from '@vue/test-utils'
import cloneDeep from 'clone-deep'
// store
import article from '@@/app/store/article'
// Firebase
import firebase from '@@/app/plugins/firebase'
const db = firebase.firestore()

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Vuex: article', () => {
  let store

  beforeAll(() => {
    store = new Vuex.Store(cloneDeep(article))
  })
  
  beforeEach(() => {})

  test('取得した記事が、タイトル/本文/投稿日/カテゴリを持っていること', async () => {
    expect(store.state).toBeNull
    const articleId = 'TEST_ARTICLE'
    await store.dispatch('fetchArticle', articleId)
    expect(store.state.title).toBe('TITLE')
    expect(store.state.contentHTML).toBe('<p>CONTENT</p>')
    expect(store.state.createdDate.seconds).toBeLessThan(new Date().getTime())
    expect(store.state.categories.length).toBe(2)
  })

  test('取得した記事が、コメントを持っていること', async () => {
    const articleId = 'TEST_ARTICLE'
    await store.dispatch('fetchComments', articleId)
    expect(store.state.comments.length).toBe(3)
    expect(store.state.comments[0].contentHTML).toBe('<p>COMMENT</p>')
  })

  test('コメントを投稿すると、記事のコメント数が1件増えていること', async () => {
    expect(store.state.comments.length).toBe(3)
    const articleId = 'TEST_ARTICLE'
    const comment = { id: 'TEST_COMMENT', uid: 'TEST_USER', username: 'TEST_USER_NAME', contentHTML: '<p>COMMENT</p>' }
    await store.dispatch('postComment', { articleId, comment })
    expect(store.state.comments.length).toBe(4)
    expect(store.state.comments[3].contentHTML).toBe('<p>COMMENT</p>')
  })
  
  afterEach(() => {})
  
  afterAll(async () => {
    // テストの過程で追加したデータの削除
    await db.collection('articles').doc('TEST_ARTICLE').collection('comments').doc('TEST_COMMENT').delete()
  })
})