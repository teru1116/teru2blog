import firebase from '@@/app/plugins/firebase'
const db = firebase.firestore()

const state = () => ({
  title: '',
  contentHTML: '',
  categories: [],
  createdDate: null,
  isPublished: false,
  isTestData: false,
  comments: []
})

const actions = {
  async fetchArticle ({ commit }, articleId) {
    const doc = await db.collection('articles').doc(articleId).get()
    const article = Object.assign({ id: doc.id }, doc.data())
    article.createdDate = doc.data().createdDate.toDate()
    commit('setArticle', article)
  },

  async fetchComments ({ commit }, articleId) {
    commit('clearState')
    const snapshot = await db.collection('articles').doc(articleId).collection('comments').orderBy('createdDate').get()
    snapshot.forEach(doc => {
      const comment = Object.assign({ id: doc.id }, doc.data())
      commit('addComment', comment)
    })
  },

  async deleteArticle ({ commit }, articleId) {
    try {
      await db.collection('articles').doc(articleId).delete()
      commit('clearState')
    } catch (e) {
      throw new Error(e)
    }
  },

  onExitArticle ({ commit }) {
    commit('clearState')
  }
}

const mutations = {
  setArticle (state, article) {
    Object.assign(state, article)
  },

  addComment (state, comment) {
    if (!state['comments']) {
      state['comments'] = []
    }
    state['comments'].push(comment)
  },

  clearState (state) {
    state = Object.assign(state, {
      title: '',
      contentHTML: '',
      categories: [],
      createdDate: null,
      isPublished: false,
      isTestData: false,
      comments: []
    })
  }
}

export default {
  state,
  actions,
  mutations
}
