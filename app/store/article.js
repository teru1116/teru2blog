import firebase from './../plugins/firebase'

const db = firebase.firestore()

const defaultState = () => {
  return {
    // 新着順にソートされた記事のArray
    recentArticles: [],
  }
}

const state = defaultState()

const getters = {
  recentArticles: state => state.recentArticles
}

const mutations = {
  pushRecentArticles (state, payload) {
    state.recentArticles = payload
  },

  clearState (state) {
    state = Object.assign(state, defaultState())
  }
}

const actions = {
  async fetchRecentArticles ({ commit }) {
    let results = []
    const snapshot = await db.collection('articles').orderBy('createdDate', 'desc').limit(10).get()
    snapshot.forEach(doc => {
      results.push(Object.assign({ id: doc.id }, doc.data()))
    })
    commit('pushRecentArticles', results)
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
