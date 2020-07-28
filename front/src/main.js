import '@babel/polyfill'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import './plugins/bootstrap-vue'
import './components/index.js'
import App from './App.vue'
import router from './router/router'
import store from './store'
import style from './scss/style.scss'
import PaperDashboard from './plugins/paperDashboard.js'
import Vue from 'vue'
import VueCardCarousel from 'vue-card-carousel'
import VueMaterial from 'vue-material'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueSweetalert2 from 'vue-sweetalert2'
import Photoswipe from 'vue-pswipe'
import 'bootstrap/dist/css/bootstrap.css'
import 'mutationobserver-shim'
import 'vue-material/dist/vue-material.min.css'

import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { faYoutube, faFacebookSquare, faInstagram } from '@fortawesome/free-brands-svg-icons'
library.add(faUser, faUserPlus, faYoutube, faFacebookSquare, faInstagram)

Vue.use(style)
Vue.use(VueCardCarousel)
Vue.use(VueMaterial)
Vue.use(PaperDashboard)
Vue.use(VueAxios, axios)
Vue.use(VueSweetalert2)
Vue.use(Photoswipe)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
