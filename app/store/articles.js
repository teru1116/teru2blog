import firebase from '@@/app/plugins/firebase'
const db = firebase.firestore()

const state = () => {
  return []
}

const actions = {
  async fetchArticles ({ commit }) {
    commit('clearState')
    const snapshot = await db.collection('articles').get()
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
