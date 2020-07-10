<template lang="pug">
  #app
    section#entrance
      navbar
      carousel
    section#about
      about
    section#event
      event
    section#menu
    section#contact
    section#footer
</template>

<script>
import navbar from './components/Navbar.vue'
import carousel from './components/Carousel.vue'
import about from './components/About.vue'
import event from './components/Event.vue'

export default {
  name: 'App',
  components: { carousel, navbar, about, event }
}
</script>
