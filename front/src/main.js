import '@babel/polyfill'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store'
import style from './scss/style.scss'
import PaperDashboard from './plugins/paperDashboard.js'
import VueCardCarousel from 'vue-card-carousel'
import VueMaterial from 'vue-material'
import './components/index.js'
import './plugins/bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'mutationobserver-shim'
import 'vue-material/dist/vue-material.min.css'

import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { faYoutube, faFacebookSquare, faInstagram } from '@fortawesome/free-brands-svg-icons'
library.add(faUser, faUserPlus, faYoutube, faFacebookSquare, faInstagram)

Vue.config.productionTip = false
Vue.use(style)
Vue.use(VueCardCarousel)
Vue.use(VueMaterial)
Vue.use(PaperDashboard)
Vue.component('font-awesome-icon', FontAwesomeIcon)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
