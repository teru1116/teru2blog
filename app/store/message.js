const state = () => ({
  list: new Map()
})

const getters = {
  list: (state) => state.list
}

const mutations = {
  addMessage (state, payload) {
    state.list.set(payload.id, payload.message)
  },

  sendMessage (state, payload) {
    const message = state.list.get(payload.id)
    message.status = 'sent'
    state.list.set(payload.id, message)
  }
}

const actions = {
  addMessage ({ commit }, { id, message }) {
    commit('addMessage', { id, message })
  },

  sendMessage ({ commit }, { id, message}) {
    commit('sendMessage', { id, message })
  }
}

module.exports = {
  state,
  getters,
  mutations,
  actions
}
