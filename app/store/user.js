const state = () => ({
  uid: ''
})

const mutations = {
  updateUser (state, payload) {
    state.uid = payload.user.uid
  }
}

const actions = {
  updateUser ({ commit }, userCredential) {
    commit('updateUser', userCredential)
  }
}

export default {
  state,
  mutations,
  actions
}
