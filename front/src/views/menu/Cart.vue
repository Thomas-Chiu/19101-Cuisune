<template lang="pug">
  #cart
    b-btn.icon-cart(variant="link" v-b-toggle.list)
      b-icon(icon="cart4")
    b-sidebar#list(
      right
      width="500px"
      )
      b-card.mt-3(
        title="Your Order"
        bg-variant="transparent"
      )
        h6.text-right Items: {{ 0 }}
        hr
        b-table(
          striped
          hover
          fixed
          borderless
          :fields="fields"
          :items="items"
        )
        p.text-center Total: {{ 0 }}
        b-btn(pill block) Check Out
</template>

<script>
import { BIcon, BIconCart4 } from 'bootstrap-vue'
export default {
  name: 'Cart',
  components: {
    BIcon,
    BIconCart4
  },
  data () {
    return {
      fields: [
        { key: '品項' },
        { key: '數量' },
        { key: '價錢', sortable: true },
        { key: '更改' }
      ],
      items: [
        { 品項: '猴頭菇', 數量: '3', 價錢: '390', 更改: 'icon' },
        { 品項: '猴頭菇', 數量: '3', 價錢: '390', 更改: 'icon' },
        { 品項: '猴頭菇', 數量: '3', 價錢: '390', 更改: 'icon' },
        { 品項: '猴頭菇', 數量: '3', 價錢: '390', 更改: 'icon' }
      ]
    }
  }
}
</script>
