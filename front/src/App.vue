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
      Overview
    section#contact
      Contact
    section#fatFooter
      SubBrand
      Footer
</template>

<script>
import Navbar from './components/Navbar.vue'
import Carousel from './components/Carousel.vue'
import About from './components/About.vue'
import Event from './components/Event.vue'
import Ingredient from './components/Ingredient.vue'
import Contact from './components/Contact.vue'
import Overview from './components/Overview.vue'
import SubBrand from './components/SubBrand.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    Carousel,
    Navbar,
    About,
    Event,
    Ingredient,
    Contact,
    Overview,
    SubBrand,
    Footer
  }
}
</script>
