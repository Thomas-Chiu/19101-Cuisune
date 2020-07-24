<template lang="pug">
  #home
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
import Navbar from './home/Navbar.vue'
import Carousel from './home/Carousel.vue'
import About from './home/About.vue'
import Event from './home/Event.vue'
import Ingredient from './home/Ingredient.vue'
import Contact from './home/Contact.vue'
import Overview from './home/Overview.vue'
import SubBrand from './home/SubBrand.vue'
import Footer from './home/Footer.vue'

export default {
  name: 'Home',
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
