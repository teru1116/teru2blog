export const state = () => ({
  uid: ''
})

export const mutations = {
  updateUser (state, payload) {
    state.uid = payload.uid
  }
}

export const actions = {
  updateUser ({ commit }, user) {
    commit('updateUser', user)
  }
}
