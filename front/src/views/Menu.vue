<template lang="pug">
  #menu
    Product
    Cart

</template>

<script>
import Product from './menu/Product.vue'
import Cart from './menu/Cart.vue'

export default {
  name: 'Menu',
  components: {
    Product,
    Cart
  }
}
</script>
