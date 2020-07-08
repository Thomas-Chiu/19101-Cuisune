<template lang="pug">
  #app
    section#entrance
      navbar
      carousel
</template>

<script>
import navbar from './components/Navbar.vue'
import carousel from './components/Carousel.vue'

export default {
  name: 'App',
  components: { carousel, navbar }
}
</script>
