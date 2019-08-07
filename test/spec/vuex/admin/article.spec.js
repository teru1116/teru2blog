import Vuex from 'vuex'
import { createLocalVue } from '@vue/test-utils'
import cloneDeep from 'clone-deep'
// store
import article from '@@/app/store/admin/article'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Vuex: admin/article', () => {
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
  
  afterEach(() => {})
  
  afterAll(() => {})
})