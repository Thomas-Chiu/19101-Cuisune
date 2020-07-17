import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// import store from '../store/index.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '19101 cuisine'
    }
  },
  {
    path: '/Menu',
    name: 'Menu',
    component: () => import(/* webpackChunkName: "Menu" */ '../views/Menu.vue'),
    meta: {
      title: '19101 cuisine | Menu'
    }

  }
]

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

router.afterEach((to, from) => {
  document.title = to.meta.title
})

export default router
