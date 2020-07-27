import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: '',
    products: [
      {
        id: 1,
        name: '猴頭菇套餐',
        src: 'https://picsum.photos/200/200/?random=1',
        price: 340,
        description: '好吃的套餐'
      },
      {
        id: 2,
        name: '猴頭菇套餐2',
        src: 'https://picsum.photos/200/200/?random=2',
        price: 3400,
        description: '好吃的套餐'
      },
      {
        id: 3,
        name: '猴頭菇套餐3',
        src: 'https://picsum.photos/200/200/?random=3',
        price: 34000,
        description: '好吃的套餐'
      }
    ],
    StoreCart: []
  },
  getters: {
    user (state) {
      return state.user
    },
    products (state) {
      return state.products
    }
  },
  mutations: {
    login (state, data) {
      state.user = data
    },
    logout (state, data) {
      state.user = ''
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
