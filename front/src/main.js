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
import VueAgile from 'vue-agile'
import MailtoUI from 'mailtoui/dist/mailtoui-min.js'
import VuePageTransition from 'vue-page-transition'
import 'bootstrap/dist/css/bootstrap.css'
import 'mutationobserver-shim'
import 'vue-material/dist/vue-material.min.css'

import { faYoutube, faFacebookSquare, faInstagram } from '@fortawesome/free-brands-svg-icons' // axios 預設傳送認證資訊(req.session.user)

import VConsole from 'vconsole'
library.add(faYoutube, faFacebookSquare, faInstagram)

Vue.use(style)
Vue.use(VueCardCarousel)
Vue.use(VueMaterial)
Vue.use(PaperDashboard)
Vue.use(VueAxios, axios)
Vue.use(VueSweetalert2)
Vue.use(Photoswipe)
Vue.use(VueAgile)
Vue.use(MailtoUI)
Vue.use(VuePageTransition)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false
axios.defaults.withCredentials = true

if (process.env.NODE_ENV !== 'production') {
  /* eslint-disable no-new */
  new VConsole()
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
