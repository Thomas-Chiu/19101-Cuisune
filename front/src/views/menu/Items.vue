<template lang="pug">
  #items
    b-navbar(toggleable="md" type="dark" variant="dark" fixed="top")
      b-navbar-brand
        router-link(to="/")
          img(:src="logoImg" width="28" height="28" style="margin-left: 10px")
      b-navbar-toggle(target="collapse")
      b-collapse#collapse(is-nav)
        b-navbar-nav.m-auto
          b-nav-item(href="#setMeals") 猴頭菇套餐
          b-nav-item(href="#hotPots") 火鍋套餐
          b-nav-item(href="#rices") 飯類套餐
          b-nav-item(href="#noodles") 麵類套餐
          b-nav-item(href="#aLaCartes") 單點系列
          b-nav-item(href="#preOrders") 預購系列
    //- 商品 card
    //- 猴頭菇套餐
    b-row#setMeals
      h3.col-12 {{cardTitles[0]}}
      b-col(md="6" lg="4" v-for="(item,index) in setMeals" :key="index")
        b-card
          b-row.item-body-row
            b-col.item-body
              Photoswipe
                b-img(fluid :src="item.img" v-pswp="item.img")
            b-col.item-body
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
    b-row#hotPots
      h3.col-12 {{cardTitles[1]}}
      b-col(md="6" lg="4" v-for="(item,index) in hotPots" :key="index")
        b-card
          b-row.item-body-row
            b-col.item-body
              Photoswipe
                b-img(fluid :src="item.img" v-pswp="item.img")
            b-col.item-body
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
    //- 飯類套餐
    b-row#rices
      h3.col-12 {{cardTitles[2]}}
      b-col(md="6" lg="4" v-for="(item,index) in rices" :key="index")
        b-card
          b-row.item-body-row
            b-col
              Photoswipe
                b-img(fluid :src="item.img" v-pswp="item.img")
            b-col
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
    //- 麵類套餐
    b-row#noodles
      h3.col-12 {{cardTitles[3]}}
      b-col(md="6" lg="4" v-for="(item,index) in noodles" :key="index")
        b-card
          b-row.item-body-row
            b-col
              Photoswipe
                b-img(fluid :src="item.img" v-pswp="item.img")
            b-col
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
    //- 單點系列
    b-row#aLaCartes
      h3.col-12 {{cardTitles[4]}}
      b-col(md="6" lg="4" v-for="(item,index) in aLaCartes" :key="index")
        b-card
          b-row.item-body-row
            b-col
              Photoswipe
                b-img(fluid :src="item.img" v-pswp="item.img")
            b-col
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
    //- 預購系列
    b-row#preOrders
      h3.col-12 {{cardTitles[5]}}
      b-col(md="6" lg="4" v-for="(item,index) in preOrders" :key="index")
        b-card
          b-row.item-body-row
            b-col.item-body
              Photoswipe
                b-img(fluid :src="item.img" v-pswp="item.img")
            b-col.item-body
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
      cardTitles: ['猴頭菇套餐', '火鍋套餐', '飯類套餐', '麵類套餐', '單點系列', '預購系列'],
      setMeals: [],
      hotPots: [],
      rices: [],
      noodles: [],
      aLaCartes: [],
      preOrders: [],
      toCartItems: []
    }
  },
  methods: {
    add (item) { // +1
      item.count++
      for (const toCartItem of this.toCartItems) { // 購物車有該商品時
        if (toCartItem.name.includes(item.name)) {
          toCartItem.count++
          toCartItem.price += item.price
          return
        }
      }
      this.toCartItems.push({ // 購物車無該商品
        name: item.name,
        count: item.count,
        price: item.price
      })
      this.$store.commit('addCartItems', this.toCartItems)
    },
    deduct (item) { // -1
      if (item.count === 0) this.toCartItems.splice(item, 1)
      else item.count--

      for (const toCartItem of this.toCartItems) {
        if (toCartItem.count === 0) {
          this.toCartItems.splice(item, 1)
          return
        } if (toCartItem.name.includes(item.name)) {
          toCartItem.count--
          toCartItem.price -= item.price
        }
      }
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
  }
}
</script>
