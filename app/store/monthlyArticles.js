import firebase from '@@/app/plugins/firebase'
const db = firebase.firestore()

const state = () => {
  return []
}

const actions = {
  async fetchMonthlyArticles ({ commit }, { year, month }) {
    commit('clearState')
    const start = new Date(`${year}-${month}`)
    const end = new Date(new Date(`${year}-${month + 1}`) - 1)
    const snapshot = await db.collection('articles').where('createdDate', '>', start).where('createdDate', '<', end).get()
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
