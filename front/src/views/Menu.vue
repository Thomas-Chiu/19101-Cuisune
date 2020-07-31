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
