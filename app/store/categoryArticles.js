import firebase from '@@/app/plugins/firebase'
const db = firebase.firestore()

const state = () => {
  return []
}

const actions = {
  async fetchCategoryArticles ({ commit }, categoryName) {
    commit('clearState')
    const snapshot = await db.collection('articles').where('categories', 'array-contains', categoryName).orderBy('createdDate', 'desc').limit(10).get()
    snapshot.forEach(doc => {
      const article = Object.assign({ id: doc.id }, doc.data())
      commit('addArticles', article)
    })
  }
}

const mutations = {
  addArticles (state, article) {
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
