<template lang="pug">
  #items
    b-navbar(toggleable="md" type="dark" variant="dark" fixed="top")
      b-navbar-brand
        router-link(to="/")
          img(:src="img[0].src" width="32" height="32")
      b-navbar-toggle(target="collapse")
      b-collapse#collapse(is-nav)
        b-navbar-nav.m-auto
          b-nav-item-dropdown(text="猴頭菇套餐")
            b-dropdown-item(href="#") 390 套餐
            b-dropdown-item(href="#") 450 套餐
            b-dropdown-item(href="#") 680 套餐
          b-nav-item-dropdown(text="火鍋套餐")
            b-dropdown-item(href="#") 臭豆腐泡菜鍋
            b-dropdown-item(href="#") 有機豆漿鍋
            b-dropdown-item(href="#") 麻油藥膳鍋
            b-dropdown-item(href="#") 猴頭菇泡菜白豆腐鍋
            b-dropdown-item(href="#") 泰式酸辣鍋
          b-nav-item-dropdown(text="飯類套餐")
            b-dropdown-item(href="#") 石鍋拌飯
            b-dropdown-item(href="#") 猴頭菇丼飯
          b-nav-item-dropdown(text="義大利麵套餐")
            b-dropdown-item(href="#") 清炒義大利麵
            b-dropdown-item(href="#") 粉紅醬義大利麵
          b-nav-item-dropdown(text="單點系列")
            b-dropdown-item(href="#") 乾麵
            b-dropdown-item(href="#") 湯麵
            b-dropdown-item(href="#") 小菜
            b-dropdown-item(href="#") 飲料
            b-dropdown-item(href="#") 包與饅頭
    //- 商品 card
    b-row
      b-col(
        md="6" lg="4"
        v-for="(product,index) in products"
        :key="index"
        )
        b-badge(variant="dark") {{ product.id }}
        b-card(
        :title="product.name"
        :sub-title="product.description"
        :img-src="product.src"
        img-left
        )
          strong NT: {{ product.price }}
          hr
          b-btn.rounded-circle -
          b-btn.rounded-circle +
          b-input(readonly :value="product.id")

</template>

<script>
export default {
  name: 'Items',
  data () {
    return {
      img: [
        {
          src: './images/logo/logo_mushroom.png'
        }
      ]
    }
  },
  // props: ['name', 'id', 'src', 'price'],
  computed: {
    products () {
      return this.$store.getters.products
    }
  },
  methods: {
    addItem (id) {
      this.$store.dispatch('addItem', id)
    }
  },
  mounted () {
    this.axios.get(process.env.VUE_APP_APIURL + '/product')
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>
