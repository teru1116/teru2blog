import v4 from 'uuid/v4'

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
  addMessage ({ commit }, message) {
    const id = v4()
    commit('addMessage', { id, message })
  }
}

module.exports = {
  state,
  getters,
  mutations,
  actions
}
