import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import '@/assets/scss/material-kit.scss'
// import globalDirectives from './globalDirectives'
// import globalMixins from './globalMixins'
// import VueLazyload from 'vue-lazyload'
// import VueCarousel from 'vue-carousel'

export default {
  install (Vue) {
    Vue.use(VueMaterial)
    // Vue.use(globalDirectives)
    // Vue.use(globalMixins)
    // Vue.use(VueCarousel)
    // Vue.use(VueLazyload, {
    //   observer: true,
    //   // optional
    //   observerOptions: {
    //     rootMargin: '0px',
    //     threshold: 0.1
    //   }
    // })
  }
}
