import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import style from './scss/style.scss'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueCardCarousel from 'vue-card-carousel'

import { faUserPlus, faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { faYoutube } from '@fortawesome/free-brands-svg-icons'
library.add(faUser, faUserPlus, faAngleDown, faYoutube)

Vue.config.productionTip = false
Vue.use(style)
Vue.use(VueCardCarousel)
Vue.component('font-awesome-icon', FontAwesomeIcon)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
