<template lang="pug">
  #menu
    Items
    Cart

</template>

<script>
import Items from './menu/Items.vue'
import Cart from './menu/Cart.vue'

export default {
  name: 'Menu',
  components: {
    Items,
    Cart
  }
}
</script>

<style scoped lang="scss">
@import "../assets/css/themify-icons.css";

</style>
