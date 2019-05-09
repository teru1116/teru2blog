import firebase from './../plugins/firebase'

const db = firebase.firestore()

const defaultState = () => {
  return {
    categories: [],
    articles: []
  }
}

const state = defaultState()

const getters = {
  //
}

const mutations = {
  setArticles (state, payload) {
    state.articles = payload
  },

  setCategories (state, payload) {
    state.categories = payload
  },

  clearState (state) {
    state = Object.assign(state, defaultState())
  }
}

const actions = {
  async fetchAllCategory ({ commit }) {
    let results = []
    const snapshot = await db.collection('articleCategories').get()
    snapshot.forEach(doc => {
      results.push(doc.id)
    })
    commit('setCategories', results)
  },

  async fetchArticles ({ commit }, categoryName) {
    let results = []
    const snapshot = await db.collection('articles').where('categories', 'array-contains', categoryName).orderBy('createdDate', 'desc').limit(10).get()
    snapshot.forEach(doc => {
      results.push(Object.assign({ id: doc.id }, doc.data()))
    })
    commit('setArticles', results)
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
