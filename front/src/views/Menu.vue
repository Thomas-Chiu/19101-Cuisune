<template lang="pug">
  #menu THIS IS MENU PAGE
    Shopping
    Product(
      v-for="(product,index) in products"
      :key="index"
      :id="product.id"
      :name="product.name"
      :image="product.image"
      :price="product.price"
    )
</template>

<script>
import Product from '../components/menu/Product.vue'
import Shopping from '../components/menu/Shopping.vue'

export default {
  name: 'Menu',
  computed: {
    products () {
      return this.$store.getters.products
    }
  },
  components: {
    Product,
    Shopping
  }
}
</script>
