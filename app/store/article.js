import v4 from 'uuid/v4'
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
  async fetchArticle ({ dispatch, commit }, articleId) {
    const doc = await db.collection('articles').doc(articleId).get()
    const article = Object.assign({ id: doc.id }, doc.data())
    article.createdDate = doc.data().createdDate.toDate()
    commit('setArticle', article)

    // 記事の読み込み完了を待ってからコメントを読み込む
    dispatch('fetchComments', articleId)
  },

  async fetchComments ({ commit }, articleId) {
    const comments = []
    const snapshot = await db.collection('articles').doc(articleId).collection('comments').orderBy('createdDate').get()
    snapshot.forEach(doc => {
      const comment = Object.assign({ id: doc.id }, doc.data())
      comments.push(comment)
    })
    commit('setComments', comments)
  },

  async postComment ({ commit }, { articleId, comment }) {
    const commentId = v4()
    comment['createdDate'] = firebase.firestore.FieldValue.serverTimestamp()

    try {
      await db.collection('articles').doc(articleId).collection('comments').doc(commentId).set(comment)
      const doc = await db.collection('articles').doc(articleId).collection('comments').doc(commentId).get()
      const newComment = Object.assign({ id: doc.id }, doc.data())
      commit('addComment', newComment)
    } catch (error) {
      throw new Error(error)
    }
  }
}

const mutations = {
  setArticle (state, article) {
    state = Object.assign(state, article)
  },

  setComments (state, comments) {
    state.comments = comments
  },

  addComment (state, comment) {
    state.comments.push(comment)
  }
}

export default {
  state,
  actions,
  mutations
}
