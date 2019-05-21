import Vuex from 'vuex'
import { createLocalVue } from '@vue/test-utils'
import cloneDeep from 'clone-deep'
// store
import monthlyArticles from '@@/app/store/monthlyArticles'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Vuex: monthlyArticles', () => {
  let store

  beforeAll(() => {
    store = new Vuex.Store(cloneDeep(monthlyArticles))
  })
  
  beforeEach(() => {})

  test('アクション"fetchMonthlyArticles"を実行すると、monthlyArticlesが1件以上になっていること', async () => {
    expect(store.state.length).toBe(0)
    const year = 2019
    const month = 5
    await store.dispatch('fetchMonthlyArticles', { year, month })
    expect(store.state.length).toBeGreaterThan(1)
  })

  afterEach(() => {})
  
  afterAll(() => {})
})