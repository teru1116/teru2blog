import firebase from './../../plugins/firebase'
import v4 from 'uuid/v4'

const db = firebase.firestore()

const defaultState = () => {
  return {
    // 記事リスト
    articles: [],
    // 編集やプレビューしている記事のデータ
    displayingArticle: {
      id: '',
      title: '',
      contentHTML: '',
      icatchImageDataURL: '',
      selectedCategories: [],
      // mock
      registeredCategories: ['技術', 'アジャイル', 'スクラム', '開発委託', 'プロジェクト'],
      // 新たにDBに登録する必要のあるカテゴリ
      unregisteredCategories: [],
      createdDate: new Date()
    }
  }
}

const state = defaultState()

const getters = {
  articles: state => state.articles,
  article: state => state.displayingArticle
}

const mutations = {
  setArticles (state, payload) {
    state.articles = payload
  },

  setDisplayingArticle (state, payload) {
    state.displayingArticle = payload
  },

  refleshArticleId (state) {
    state.displayingArticle.id = v4()
  },

  updateTitle (state, payload) {
    state.displayingArticle.title = payload
  },

  updateContentHTML (state, payload) {
    state.displayingArticle.contentHTML = payload
  },

  updateIcatchImageDataURL (state, payload) {
    state.displayingArticle.icatchImageDataURL = payload
  },

  addSelectedCategory (state, payload) {
    state.displayingArticle.selectedCategories.push(payload)
  },

  addRegisteredCategories (state, payload) {
    state.displayingArticle.registeredCategories.push(payload)
  },

  addUnregisteredCategories (state, payload) {
    state.displayingArticle.unregisteredCategories.push(payload)
  },

  removeSelectedCategory (state, payload) {
    state.displayingArticle.selectedCategories.splice(payload, 1)
  },

  removeRegisteredCategories (state, payload) {
    state.displayingArticle.registeredCategories.splice(payload, 1)
  },

  removeUnregisteredCategories (state, payload) {
    state.displayingArticle.unregisteredCategories.splice(payload, 1)
  },

  updateUnregisteredCategories (state, payload) {
    state.displayingArticle.unregisteredCategories = payload
  },

  clearDisplayingArticle (state) {
    state.displayingArticle = defaultState().displayingArticle
  },
  
  clearState (state) {
    state = Object.assign(state, defaultState())
  }
}

const actions = {
  async fetchAllArticles ({ commit }) {
    let results = []
    const snapshot = await db.collection('articles').where('isTestData', '==', true).limit(20).get()
    snapshot.forEach(doc => {
      results.push(Object.assign({ id: doc.id }, doc.data()))
    })
    commit('setArticles', results)
  },

  async fetchArticle ({ commit }, articleId) {
    const doc = await db.collection('articles').doc(articleId).get()
    const article = Object.assign({ id: doc.id }, doc.data())
    commit('setDisplayingArticle', article)
    return
  },

  refleshArticleId ({ commit }) {
    commit('refleshArticleId')
  },

  updateTitle ({ commit }, title) {
    commit('updateTitle', title)
  },

  updateContentHTML ({ commit }, contentHTML) {
    commit('updateContentHTML', contentHTML)
  },

  updateIcatchImageDataURL ({ commit }, dataURL) {
    commit('updateIcatchImageDataURL', dataURL)
  },

  addCategory ({ commit }, categoryName) {
    commit('addSelectedCategory', categoryName)
    commit('addUnregisteredCategories', categoryName)
  },

  selectCategory ({ commit, state }, categoryName) {
    const index = state.displayingArticle.registeredCategories.indexOf(categoryName)
    commit('removeRegisteredCategories', index)
    commit('addSelectedCategory', categoryName)
  },

  deselectCategory ({ commit, state }, categoryName) {
    const selectedIndex = state.displayingArticle.selectedCategories.indexOf(categoryName)
    commit('removeSelectedCategory', selectedIndex)

    const unregisteredIndex = state.displayingArticle.unregisteredCategories.indexOf(categoryName)
    if (unregisteredIndex !== -1) {
      commit('removeUnregisteredCategories', unregisteredIndex)
    } else {
      commit('addRegisteredCategories', categoryName)
    }
  },

  updateUnregisteredCategories ({ commit }, unregisteredCategories) {
    commit('updateUnregisteredCategories', unregisteredCategories)
  },

  async postArticle ({ commit, state }, { isTestData }) {
    const article = state.displayingArticle
    const batch = db.batch()
    batch.set(db.collection('articles').doc(article.id), {
      title: article.title,
      contentHTML: article.contentHTML,      
      icatchImageDataURL: article.icatchImageDataURL,
      categories: article.selectedCategories,
      createdDate: article.createdDate,
      isPublished: true,
      isTestData
    })
    state.displayingArticle.unregisteredCategories.forEach(categoryName => {
      batch.set(db.collection('articleCategories').doc(categoryName))
    })
    await batch.commit()
    commit('clearDisplayingArticle')
    return
  },

  async saveArticle ({ commit, state }, { isTestData }) {
    const article = state.displayingArticle
    await db.collection('articles').doc(article.id).set({
      title: article.title,
      contentHTML: article.contentHTML,      
      icatchImageDataURL: article.icatchImageDataURL,
      categories: article.selectedCategories,
      unregisteredCategories: article.unregisteredCategories,
      createdDate: article.createdDate,
      isPublished: false,
      isTestData
    })
    commit('clearDisplayingArticle')
    return
  },

  onExitArticle ({ commit }) {
    commit('clearDisplayingArticle')
  },

  clearState ({ commit }) {
    commit('clearState')
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
