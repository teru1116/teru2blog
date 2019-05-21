import firebase from '@@/app/plugins/firebase'
const db = firebase.firestore()

const state = () => {
  return []
}

const actions = {
  async fetchMonths ({ commit }) {
    commit('clearState')
    const snapshot = await db.collection('articleMonths').get()
    snapshot.forEach(doc => {
      commit('addMonth', doc.id)
    })
  }
}

const mutations = {
  addMonth (state, month) {
    state.push(month)
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
