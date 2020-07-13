<template lang="pug">
  #app
    section#entrance
      Navbar
      Carousel
    section#about
      About
    section#event
      Event
    section#ingredient
      Ingredient
    section#contact
    section#footer
</template>

<script>
import Navbar from './components/Navbar.vue'
import Carousel from './components/Carousel.vue'
import About from './components/About.vue'
import Event from './components/Event.vue'
import Ingredient from './components/Ingredient.vue'

export default {
  name: 'App',
  components: { Carousel, Navbar, About, Event, Ingredient }
}
</script>
