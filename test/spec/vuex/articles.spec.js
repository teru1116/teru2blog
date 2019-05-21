import Vuex from 'vuex'
import { createLocalVue } from '@vue/test-utils'
import cloneDeep from 'clone-deep'
// store
import articles from '@@/app/store/articles'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Vuex: articles', () => {
  let store

  beforeAll(() => {
    store = new Vuex.Store(cloneDeep(articles))
  })
  
  beforeEach(() => {})
  
  test('articlesの件数が0件の状態で、記事リスト取得を呼び出すと、articlesの件数が3件以上になっていること', async () => {
    expect(store.state.length).toBe(0)
    await store.dispatch('fetchArticles')
    expect(store.state.length).toBeGreaterThanOrEqual(3)
  })
  
  test('articlesがストアに読み込まれている時、1番目の記事よりも2番目の記事のほうが投稿日時が古いこと', () => {
    expect(store.state[0].createdDate.seconds).toBeGreaterThan(store.state[1].createdDate.seconds)
  })
  
  test('articlesがストアに読み込まれている時、1番目の記事にタイトル、本文、投稿日時、カテゴリが含まれていること', () => {
    const article = store.state[0]
    expect(article.title.length).toBeGreaterThanOrEqual(1)
    expect(article.contentHTML.length).toBeGreaterThanOrEqual(1)
    expect(article.createdDate.seconds).toBeLessThan(new Date().getTime())
    expect(article.categories.length).toBeGreaterThanOrEqual(1)
  })
  
  afterEach(() => {})
  
  afterAll(() => {})
})
