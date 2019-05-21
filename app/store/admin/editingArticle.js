import v4 from 'uuid/v4'
import firebase from '@@/app/plugins/firebase'
const db = firebase.firestore()

const state = () => ({
  id: '',
  title: '',
  contentHTML: '',
  iCatchImageDataURL: '',
  createdDate: null,
  isPublished: false,
  isTestData: false,
  categories: [],
  newCategories: [],        // ユーザーが入力した新しいカテゴリ（これからcategioriesに登録する必要があるカテゴリ）
  selectableCategories: []  // カテゴリの選択肢
})

const actions = {
  initializeEditingArticle ({ commit }) {
    const articleId = v4()
    commit('setArticleId', articleId)
  },

  updateTitle ({ commit }, title) {
    commit('updateTitle', title)
  },

  updateContentHTML ({ commit }, contentHTML) {
    commit('updateContentHTML', contentHTML)
  },

  updateICatchImage ({ commit }, dataURL) {
    commit('updateICatchImage', dataURL)
  },

  addCategory ({ commit }, categoryName) {
    commit('addCategory', categoryName)
    commit('addNewCategory', categoryName)
  },

  selectCategory ({ commit, state }, categoryName) {
    const index = state.selectableCategories.indexOf(categoryName)
    commit('removeSelectableCategory', index)
    commit('addCategory', categoryName)
  },

  deselectCategory ({ commit, state }, categoryName) {
    const categoryIndex = state.categories.indexOf(categoryName)
    commit('removeCategory', categoryIndex)

    const newCategoryIndex = state.newCategories.indexOf(categoryName)
    if (newCategoryIndex !== -1) {
      commit('removeNewCategory', newCategoryIndex)
    } else {
      commit('addSelectableCategory', categoryName)
    }
  },

  async fetchExistingCategories ({ commit, state }) {
    commit('clearSelectableCategories')
    const snapshot = await db.collection('articleCategories').get()
    snapshot.forEach(doc => {
      if (!state.categories.includes(doc.id)) {
        commit('addSelectableCategory', doc.id)
      }
    })
  },

  async postArticle ({ state }) {
    const article = Object.assign({}, state)
    delete article.newCategories
    delete article.selectableCategories
    article.createdDate = firebase.firestore.FieldValue.serverTimestamp()
    article.isPublished = true

    const batch = db.batch()
    batch.set(db.collection('articles').doc(article.id), article)
    state.newCategories.forEach(categoryName => {
      batch.set(db.collection('articleCategories').doc(categoryName), {})
    })
    await batch.commit()
  },

  async saveArticle ({ state }) {
    const article = state
    delete article.newCategories
    delete article.selectableCategories
    article.createdDate = firebase.firestore.FieldValue.serverTimestamp()
    article.isPublished = false
    await db.collection('articles').doc(article.id).set(article)
  },

  async fetchArticle ({ commit }, articleId) {
    const doc = await db.collection('articles').doc(articleId).get()
    const article = Object.assign({ id: doc.id }, doc.data())
    commit('setArticle', article)
  }
}

const mutations = {
  setArticleId (state, articleId) {
    state.id = articleId
  },
  
  updateTitle (state, title) {
    state.title = title
  },

  updateContentHTML (state, contentHTML) {
    state.contentHTML = contentHTML
  },

  updateICatchImage (state, dataURL) {
    state.iCatchImageDataURL = dataURL
  },

  addCategory (state, category) {
    state.categories.push(category)
  },

  addNewCategory (state, category) {
    state.newCategories.push(category)
  },

  addSelectableCategory (state, category) {
    state.selectableCategories.push(category)
  },

  removeCategory (state, index) {
    state.categories.splice(index, 1)
  },

  removeNewCategory (state, index) {
    state.newCategories.splice(index, 1)
  },

  removeSelectableCategory (state, index) {
    state.selectableCategories.splice(index, 1)
  },

  clearSelectableCategories (state) {
    state.selectableCategories.splice(0, state.selectableCategories.length)
  },

  setArticle (state, article) {
    state = Object.assign(state, article)
  }
}

export default {
  state,
  actions,
  mutations
}
