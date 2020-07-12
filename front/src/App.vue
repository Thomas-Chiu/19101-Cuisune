<template lang="pug">
  #app
    section#entrance
      Navbar
      Carousel
    section#about
      About
    section#event
      Event
    section#menu
      Menu
    section#contact
    section#footer
</template>

<script>
import Navbar from './components/Navbar.vue'
import Carousel from './components/Carousel.vue'
import About from './components/About.vue'
import Event from './components/Event.vue'
import Menu from './components/Menu.vue'

export default {
  name: 'App',
  components: { Carousel, Navbar, About, Event, Menu }
}
</script>
