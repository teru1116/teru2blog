const state = () => ({
  list: new Map()
})

const getters = {
  list: (state) => state.list
}

const mutations = {
  addMessage (state, payload) {
    state.list.set(payload.id, payload.message)
  }
}

const actions = {
  addMessage ({ commit }, { id, message }) {
    commit('addMessage', { id, message })
  }
}

module.exports = {
  state,
  getters,
  mutations,
  actions
}
