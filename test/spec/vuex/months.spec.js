import Vuex from 'vuex'
import { createLocalVue } from '@vue/test-utils'
import cloneDeep from 'clone-deep'
// store
import months from '@@/app/store/months'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Vuex: months', () => {
  let store

  beforeAll(() => {
    store = new Vuex.Store(cloneDeep(months))
  })
  
  beforeEach(() => {})

  test('アクション"fetchMonths"を実行すると、monthsが1件以上になっていること', async () => {
    expect(store.state.length).toBe(0)
    await store.dispatch('fetchMonths')
    expect(store.state.length).toBeGreaterThan(1)
  })

  afterEach(() => {})
  
  afterAll(() => {})
})