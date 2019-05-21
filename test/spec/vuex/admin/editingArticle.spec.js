import Vuex from 'vuex'
import { createLocalVue } from '@vue/test-utils'
import cloneDeep from 'clone-deep'
// store
import editingArticle from '@@/app/store/admin/editingArticle'
// firebase
import firebase from '@@/app/plugins/firebase'
const db = firebase.firestore()

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Vuex: admin/editingArticle', () => {
  let store

  beforeAll(() => {
    store = new Vuex.Store(cloneDeep(editingArticle))
    store.dispatch('initializeEditingArticle')
  })
  
  beforeEach(() => {})

  test('アクション"updateTitle"を実行すると、titleが更新されていること', () => {
    store.dispatch('updateTitle', 'TITLE')
    expect(store.state.title).toBe('TITLE')
  })

  test('アクション"updateContentHTML"を実行すると、contentHTMLが更新されていること', () => {
    store.dispatch('updateContentHTML', '<p>CONTENT</p>')
    expect(store.state.contentHTML).toBe('<p>CONTENT</p>')
  })

  test('アクション"updateICatchImage"を実行すると、iCatchImageが更新されていること', () => {
    store.dispatch('updateICatchImage', 'data:text/plain;base64,SGVsbG8sIFdvcmxkIQ%3D%3D')
    expect(store.state.iCatchImageDataURL).toBe('data:text/plain;base64,SGVsbG8sIFdvcmxkIQ%3D%3D')
  })
    
  test('アクション"addCategory"を実行すると、categoriesが1つ増えていること', () => {
    store.dispatch('addCategory', 'CATEGORY')
    expect(store.state.categories).toContain('CATEGORY')
  })

  test('アクション"removeCategory"を実行すると、categoriesが1つ減っていること', () => {
    store.dispatch('removeCategory', 'CATEGORY')
    expect(store.state.categories).not.toContain('CATEGORY')
  })

  test('投稿を実行すると、公開記事としてDBに登録されていること', async () => {
    let doc = await db.collection('articles').doc(store.state.id).get()
    expect(doc.exists).toBeFalsy()

    await store.dispatch('postArticle')
    
    doc = await db.collection('articles').doc(store.state.id).get()
    expect(doc.data().isPublished).toBeTruthy()

    // 追加したデータの削除
    await db.collection('articles').doc(store.state.id).delete()
  })

  test('下書き保存を実行すると、非公開記事としてDBに登録されていること', async () => {
    let doc = await db.collection('articles').doc(store.state.id).get()
    expect(doc.exists).toBeFalsy()

    await store.dispatch('saveArticle')
    
    doc = await db.collection('articles').doc(store.state.id).get()
    expect(doc.data().isPublished).toBeFalsy()

    // 追加したデータの削除
    await db.collection('articles').doc(store.state.id).delete()
  })

  test('アクション"fetchArticle"を実行すると、DBに登録済みの記事がストアに展開されること', async () => {
    const articleId = 'TEST_ARTICLE'
    await store.dispatch('fetchArticle', articleId)
    expect(store.state.id).toBe('TEST_ARTICLE')
    expect(store.state.title).toBe('TITLE')
    expect(store.state.contentHTML).toBe('<p>CONTENT</p>')
    expect(store.state.categories).toEqual(['技術', 'セキュリティ'])
  })
  
  afterEach(() => {})
  
  afterAll(() => {})
})