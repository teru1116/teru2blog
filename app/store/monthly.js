import firebase from './../plugins/firebase'

const db = firebase.firestore()

const defaultState = () => {
  return {
    months: [],
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

  setMonths (state, payload) {
    state.months = payload
  },

  clearState (state) {
    state = Object.assign(state, defaultState())
  }
}

const actions = {
  async fetchAllMonth ({ commit }) {
    let results = []
    const snapshot = await db.collection('articleMonths').get()
    snapshot.forEach(doc => {
      results.push(doc.id)
    })
    commit('setMonths', results)
  },

  async fetchArticles ({ commit }, { year, month }) {
    let results = []
    const start = new Date(`${year}-${month}`)
    const end = new Date(new Date(`${year}-${month + 1}`) - 1)
    const snapshot = await db.collection('articles').where('createdDate', '>', start).where('createdDate', '<', end).get()
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
