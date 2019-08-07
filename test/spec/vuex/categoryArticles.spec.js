import Vuex from 'vuex'
import { createLocalVue } from '@vue/test-utils'
import cloneDeep from 'clone-deep'
// store
import categoryArticles from '@@/app/store/categoryArticles'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Vuex: categoryArticles', () => {
  let store

  beforeAll(() => {
    store = new Vuex.Store(cloneDeep(categoryArticles))
  })
  
  beforeEach(() => {})

  test('アクション"fetchCategoryArticles"を実行すると、categoryArticlesが1件以上になっていること', async () => {
    expect(store.state.length).toBe(0)
    const categoryName = '技術'
    await store.dispatch('fetchCategoryArticles', categoryName)
    expect(store.state.length).toBeGreaterThanOrEqual(1)
  })

  afterEach(() => {})
  
  afterAll(() => {})
})
