<template lang="pug">
  #orderitem
    card(v-for="(item, index) in orderItems" :key="index")
      h4 顧客：{{ item.name }}
        span {{ item.gender }}
      b-table(:items="item.items" hover )
        //- template(v-solt:cell(Id)="data") {{ data + "YA" }}

      h4.text-center 數量：{{ item.totalCount }}
        span(style="margin-left: 30px;") 總計：{{ item.totalPrice }}
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
  mounted () {
    this.axios.get(process.env.VUE_APP_APIURL + '/order')
      .then(res => {
        // console.log(res)
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
            items: d.items.map(i => {
              return {
                name: i.name,
                count: i.count,
                price: i.price
              }
            }),
            memo: d.memo,
            totalCount: d.totalCount,
            totalPrice: d.totalPrice,
            edit: false
          }
        })
        console.log(this.orderItems)
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>
