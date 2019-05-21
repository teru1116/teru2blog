import firebase from '@@/app/plugins/firebase'
const db = firebase.firestore()

const state = () => {
  return []
}

const actions = {
  async fetchCategories ({ commit }) {
    commit('clearState')
    const snapshot = await db.collection('articleCategories').get()
    snapshot.forEach(doc => {
      commit('addCategory', doc.id)
    })
  }
}

const mutations = {
  addCategory (state, categoryName) {
    state.push(categoryName)
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
