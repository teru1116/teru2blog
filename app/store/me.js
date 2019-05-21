const state = () => ({
  uid: ''
})

const mutations = {
  setMe (state, payload) {
    state.uid = payload.user.uid
  }
}

const actions = {
  setMe ({ commit }, userCredential) {
    commit('setMe', userCredential)
  }
}

export default {
  state,
  mutations,
  actions
}
