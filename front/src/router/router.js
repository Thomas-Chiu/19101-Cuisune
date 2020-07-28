import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store/index.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/album',
    name: 'Album',
    component: () => import(/* webpackChunkName: "album" */ '../views/Album.vue'),
    meta: {
      login: true
    }
  },
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
    path: '/admin',
    name: 'Admin',
    component: () => import(/* webpackChunkName: "Admin" */ '../views/Admin.vue'),
    meta: {
      title: '19101 cuisine | Admin',
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
        name: 'Dashboard',
        component: () => import(/* webpackChunkName: "Dashboard" */ '@/views/admin/Dashboard.vue'),
        meta: {
          title: 'Admin | Board',
          signin: true
        }
      },
      {
        path: '/stats',
        name: 'Stats',
        component: () => import(/* webpackChunkName: "Stats" */ '@/views/admin/UserProfile.vue'),
        meta: {
          title: 'Admin | Stats',
          signin: true
        }
      },
      {
        path: '/notifications',
        name: 'Notifications',
        component: () => import(/* webpackChunkName: "Notifications" */ '@/views/admin/Notifications.vue'),
        meta: {
          title: 'Admin | Notifications',
          signin: true
        }
      },
      {
        path: '/table-list',
        name: 'Table-list',
        component: () => import(/* webpackChunkName: "Table-list" */ '@/views/admin/TableList.vue'),
        meta: {
          title: 'Admin | Table-list',
          signin: true
        }
      },
      {
        path: '/typography',
        name: 'Typography',
        component: () => import(/* webpackChunkName: "Typography" */ '@/views/admin/Typography.vue'),
        meta: {
          title: 'Admin | Typography',
          signin: true
        }
      },
      {
        path: '/icons',
        name: 'Icons',
        component: () => import(/* webpackChunkName: "Icons" */ '@/views/admin/Icons.vue'),
        meta: {
          title: 'Admin | Icons',
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
