<template lang="pug">
  #orderitem
    card(v-for="(item, index) in orderItems" :key="index")
      h4(@click="sum") {{ item.name }}
        span {{ item.gender }}的訂單
      b-table(:items="item.items" hover )
      h4.text-center 數量：{{ totalCount }}
        span 總計：{{ totalPrice }}
</template>

<script>
export default {
  name: 'OrderItem',
  data () {
    return {
      orderItems: [],
      totalPrice: '',
      totalCount: ''
    }
  },
  methods: {
    sum (item) { // 總數量和金額尚未解決
      let totalPrice = 0
      let totalCount = 0
      for (const item of this.orderItems) {
        totalPrice += item.price
        totalCount += item.count
      }
      this.totalPrice = totalPrice
      this.totalCount = totalCount
      console.log(this.totalPrice)
      console.log(this.totalCount)
    }
  },
  mounted () {
    this.axios.get(process.env.VUE_APP_APIURL + '/order')
      .then(res => {
        console.log(res)
        let ID = 0
        this.orderItems = res.data.result.map(d => {
          ID++
          return {
            id: d.id,
            ID,
            name: d.name,
            gender: d.gender,
            orderDate: d.orderDate.substr(0, 10),
            pickupTime: d.pickupTime,
            items: d.items,
            memo: d.memo,
            edit: false
          }
        })
        console.log(this.orderItems)
      })
      .catch(err => {
        console.log(err)
      })
    this.sum(this.item)
  }
}
</script>
