import firebase from './../../plugins/firebase'

const db = firebase.firestore()

const defaultState = () => {
  return {
    articles: [],
    selectedArticle: {}
  }
}

const state = defaultState()

const getters = {
  articles: state => state.articles,
  article: state => state.selectedArticle
}

const mutations = {
  setArticles (state, payload) {
    state.articles = payload
  },

  setArticle (state, payload) {
    state.selectedArticle = payload
  },

  clearSelectedArticle (state) {
    state.selectedArticle = {}
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
    commit('setArticle', article)
    return
  },

  onExitArticle ({ commit }) {
    commit('clearSelectedArticle')
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
