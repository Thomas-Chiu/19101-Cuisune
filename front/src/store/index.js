import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: '',
    admin: '',
    cartItems: []
  },
  getters: {
    user (state) {
      return state.user
    },
    admin (state) {
      return state.admin
    },
    cartItems (state) {
      return state.cartItems
    }
  },
  mutations: {
    signin (state, data) {
      state.user = data
    },
    adminSignin (state, data) {
      state.admin = data
    },
    signout (state) {
      state.user = ''
      state.admin = ''
    },
    addCartItems (state, data) {
      state.cartItems = data
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
