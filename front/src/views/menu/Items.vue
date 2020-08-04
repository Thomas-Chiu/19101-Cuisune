<template lang="pug">
  #items
    b-navbar(toggleable="md" type="dark" variant="dark" fixed="top")
      b-navbar-brand
        router-link(to="/")
          img(:src="logoImg" width="32" height="32")
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
    //- 猴頭菇套餐
    b-row#setMeals
      h3.col-12 {{cardTitles[0]}}
      b-col(lg="6" xl="4" v-for="(item,index) in setMeals" :key="index")
        b-card
          b-row
            b-col.item-body(cols="12" md="6")
              Photoswipe
                b-img(fluid :src="item.img" v-pswp="item.img")
            b-col.item-body(cols="12" md="6")
              b-card-body
                h4 {{ item.name }}
                p NT {{ item.price }}
                p {{item.description}}
                .btn-default
                  p-button(@click.native="deduct(item)")
                    i.ti-minus
                  p-button.btn-count(disabled) {{item.count}}
                  p-button(@click.native="add(item)")
                    i.ti-plus
    //- 火鍋套餐
    b-row#setMeals
      h3.col-12 {{cardTitles[1]}}
      b-col(lg="6" xl="4" v-for="(item,index) in hotPots" :key="index")
        b-card
          b-row
            b-col.item-body(cols="12" md="6")
              Photoswipe
                b-img(fluid :src="item.img" v-pswp="item.img")
            b-col.item-body(cols="12" md="6")
              b-card-body
                h4 {{ item.name }}
                p NT {{ item.price }}
                p {{item.description}}
                .btn-default
                  p-button(@click.native="deduct(item)")
                    i.ti-minus
                  p-button.btn-count(disabled) {{item.count}}
                  p-button(@click.native="add(item)")
                    i.ti-plus
</template>

<script>
export default {
  name: 'Items',
  data () {
    return {
      logoImg: './images/logo/logo_mushroom.png',
      cardTitles: ['猴頭菇套餐', '火鍋類', '飯類', '麵類', '單點類', '預購類'],
      setMeals: [],
      hotPots: [],
      rices: [],
      noodles: [],
      aLaCartes: [],
      preOrders: [],
      toCartItems: []
    }
  },
  computed: {
  },
  methods: {
    add (item) { // +1
      item.count++
      for (const toCartItem of this.toCartItems) { // 購物車有該商品時
        if (toCartItem.name.includes(item.name)) {
          toCartItem.count++
          toCartItem.price += item.price
          console.log(this.toCartItems)
          return
        }
      }
      this.toCartItems.push({ // 購物車無該商品
        name: item.name,
        count: item.count,
        price: item.price,
        edit: false
      })
      this.$store.commit('addCartItems', this.toCartItems)
      console.log(this.toCartItems)
    },
    deduct (item) { // -1
      if (item.count <= 0) item.count = 0
      else item.count--

      for (const toCartItem of this.toCartItems) {
        if (toCartItem.count < 1) {
          this.toCartItems.splice(item, 1)
          return
        } if (toCartItem.name.includes(item.name)) {
          toCartItem.count--
          toCartItem.price -= item.price
        }
      }
      console.log(this.toCartItems)
    }
  },
  mounted () {
    this.axios.get(process.env.VUE_APP_APIURL + '/product')
      .then(res => {
        const result = res.data.result
        result.map(d => {
          const push = {
            name: d.name,
            price: d.price,
            description: d.description,
            img: d.img,
            count: 0
          }
          if (d.name.includes('猴頭菇套餐')) {
            this.setMeals.push(push)
          } if (d.name.includes('火鍋')) {
            this.hotPots.push(push)
          } if (d.name.includes('飯')) {
            this.rices.push(push)
          } if (d.name.includes('麵')) {
            this.noodles.push(push)
          } if (d.name.includes('預購')) {
            this.preOrders.push(push)
          } if (
            !d.name.includes('猴頭菇套餐') &&
            !d.name.includes('火鍋') &&
            !d.name.includes('飯') &&
            !d.name.includes('麵') &&
            !d.name.includes('預購')
          ) {
            this.aLaCartes.push(push)
          }
        })
      }).catch(err => {
        alert(err.message + ' 伺服器錯誤')
      })
    // console.log(this.setMeals)
    // console.log(this.hotPots)
    // console.log(this.rices)
    // console.log(this.noodles)
    // console.log(this.preOrders)
    // console.log(this.aLaCartes)
  }
}
</script>
