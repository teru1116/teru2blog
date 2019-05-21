import Vuex from 'vuex'
import { createLocalVue } from '@vue/test-utils'
import cloneDeep from 'clone-deep'
// store
import categories from '@@/app/store/categories'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Vuex: categories', () => {
  let store

  beforeAll(() => {
    store = new Vuex.Store(cloneDeep(categories))
  })
  
  beforeEach(() => {})

  test('アクション"fetchCategories"を実行すると、categoriesが3件以上になっていること', async () => {
    expect(store.state.length).toBe(0)
    await store.dispatch('fetchCategories')
    expect(store.state.length).toBeGreaterThanOrEqual(3)
  })

  afterEach(() => {})
  
  afterAll(() => {})
})