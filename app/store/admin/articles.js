import firebase from '@@/app/plugins/firebase'
const db = firebase.firestore()

const perPage = 10

const state = () => {
  return []
}

const actions = {
  async fetchArticles ({ commit }) {
    commit('clearState')
    const snapshot = await db.collection('articles').orderBy('createdDate', 'desc').limit(perPage).get()
    snapshot.forEach(doc => {
      const article = Object.assign({ id: doc.id }, doc.data())
      commit('addArticle', article)
    })
  }
}

const mutations = {
  addArticle (state, article) {
    state.push(article)
  },

  clearState (state) {
    state.splice(0, state.length)
  }
}

export default {
  state,
  actions,
  mutations
}
