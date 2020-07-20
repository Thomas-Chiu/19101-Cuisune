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
import Navbar from '../components/home/Navbar.vue'
import Carousel from '../components/home/Carousel.vue'
import About from '../components/home/About.vue'
import Event from '../components/home/Event.vue'
import Ingredient from '../components/home/Ingredient.vue'
import Contact from '../components/home/Contact.vue'
import Overview from '../components/home/Overview.vue'
import SubBrand from '../components/home/SubBrand.vue'
import Footer from '../components/home/Footer.vue'

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
