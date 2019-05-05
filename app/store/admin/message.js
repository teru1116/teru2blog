import firebase from './../../plugins/firebase'

const db = firebase.firestore()

const defaultState = () => {
  return {
    messages: [],
  }
}

const state = defaultState()

const getters = {
  rooms: state => state.messages
}

const mutations = {
  clearState (state) {
    state = Object.assign(state, defaultState())
  }
}

const actions = {
  clearState ({ commit }) {
    commit('clearState')
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
