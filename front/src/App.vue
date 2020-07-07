<template lang="pug">
  #app
    section#nav
      b-navbar(toggleable="md")
        b-navbar-toggle.ml-auto(target="collapse")
        b-collapse(id="collapse" is-nav)
          b-navbar-nav.ml-auto
            b-nav-item Sign in
              font-awesome-icon(:icon="['far', 'user']")
            b-nav-item Sign up
              font-awesome-icon(:icon="['fas', 'user-plus']")
    carousel
</template>

<script>
import carousel from './components/Carousel.vue'

export default {
  name: 'App',
  components: { carousel }
}
</script>
