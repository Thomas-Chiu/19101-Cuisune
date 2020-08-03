import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store/index.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '19101 cuisine',
      signin: false
    }
  },
  {
    path: '*',
    name: 'PageNotFound',
    component: () => import(/* webpackChunkName: "PageNotFound" */ '../views/PageNotFound.vue'),
    meta: {
      title: '19101 cuisine | 404'
    }
  },
  {
    path: '/menu',
    name: 'Menu',
    component: () => import(/* webpackChunkName: "Menu" */ '../views/Menu.vue'),
    meta: {
      title: '19101 cuisine | Menu',
      signin: false
    }
  },
  {
    path: '/signin',
    name: 'Signin',
    component: () => import(/* webpackChunkName: "Signin" */ '../views/Signin.vue'),
    meta: {
      title: '19101 cuisine | Signin',
      signin: false
    }
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import(/* webpackChunkName: "Signup" */ '../views/Signup.vue'),
    meta: {
      title: '19101 cuisine | Signup',
      signin: false
    }
  },
  {
    path: '/adminboard',
    name: 'Adminboard',
    component: () => import(/* webpackChunkName: "Adminboard" */ '@/dashboard/DashboardLayout.vue'),
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: '首頁',
        component: () => import(/* webpackChunkName: "Dashboard" */ '@/views/admin/Dashboard.vue'),
        meta: {
          title: '首頁',
          signin: true
        }
      },
      {
        path: '/user',
        name: '會員管理',
        component: () => import(/* webpackChunkName: "User" */ '@/views/admin/User.vue'),
        meta: {
          title: '會員管理',
          signin: true
        }
      },
      {
        path: '/product',
        name: '商品管理',
        component: () => import(/* webpackChunkName: "Product" */ '@/views/admin/Product.vue'),
        meta: {
          title: '商品管理',
          signin: true
        }
      },
      {
        path: '/order',
        name: '點餐管理',
        component: () => import(/* webpackChunkName: "Order" */ '@/views/admin/Order.vue'),
        meta: {
          title: '點餐管理',
          signin: true
        }
      },
      {
        path: '/booking',
        name: '訂位管理',
        component: () => import(/* webpackChunkName: "Booking" */ '@/views/admin/Booking.vue'),
        meta: {
          title: '訂位管理',
          signin: true
        }
      }
    ]
  }
]

const router = new VueRouter({
  routes,
  linkActiveClass: 'active' // 套後台版面加的
})

router.beforeEach((to, from, next) => {
  if (to.meta.signin && !store.state.admin) {
    next('/')
    alert('請登入管理者帳號')
  } else {
    next()
  }
})

router.afterEach((to, from) => {
  document.title = to.meta.title
})

export default router
