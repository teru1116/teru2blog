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
    const snapshot = await db.collection('articles').doc(articleId).collection('comments').orderBy('createdDate').get()
    snapshot.forEach(doc => {
      const comment = Object.assign({ id: doc.id }, doc.data())
      commit('addComment', comment)
    })
  },

  async postComment ({ commit }, { articleId, comment }) {
    const commentId = comment.id
    comment['createdDate'] = firebase.firestore.FieldValue.serverTimestamp()
    await db.collection('articles').doc(articleId).collection('comments').doc(commentId).set(comment)

    const doc = await db.collection('articles').doc(articleId).collection('comments').doc(commentId).get()
    const newComment = Object.assign({ id: doc.id }, doc.data())
    commit('addComment', newComment)
  }
}

const mutations = {
  setArticle (state, article) {
    state = Object.assign(state, article)
  },

  addComment (state, comment) {
    if (!state['comments']) {
      state['comments'] = []
    }
    state['comments'].push(comment)
  }
}

export default {
  state,
  actions,
  mutations
}
