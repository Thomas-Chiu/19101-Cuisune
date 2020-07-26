import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
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
    products (state) {
      return state.products
    },
    StoreCart (state) {
      return state.StoreCart
    }
  },
  mutations: {
    ADD_Item (state, id) {
      state.StoreCart.push(id)
    },

    REMOVE_Item (state, index) {
      state.StoreCart.splice(index, 1)
    }
  },
  actions: {
    addItem (context, id) {
      context.commit('ADD_Item', id)
    },

    removeItem (context, index) {
      context.commit('REMOVE_Item', index)
    }
  },
  modules: {
  }
})
