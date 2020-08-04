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
        b-btn(pill block v-b-modal.order) Check Out
        //- Modal
        b-modal#order(
          centered
          hide-footer
          title="線上點餐"
          header-bg-variant="info"
          header-text-variant="light"
          body-bg-variant="light"
        )
          b-form.text-center.px-5
            b-row.justify-content-center
              b-form-group.date.col-12
                b-datepicker(
                v-model="order.orderDate"
                hide-header
                locale="zh-tw"
                selected-variant="info"
                today-variant="info"
                placeholder='取餐日期'
                )
                b-form-select(v-model="order.pickupTime" :options="pickupTime" required)
                b-form-select(v-model="order.here" :options="here" required)
              b-input-group.name
                b-form-input(v-model="order.name" placeholder='姓名' required)
                b-input-group-prepend(is-text)
                  b-form-radio-group.gender(v-model="order.gender" :options="gender" required)
              b-input-group.mobile
                b-form-input(v-model="order.mobile" placeholder='電話' required)
                b-input-group-prepend(is-text)
                  b-icon(icon="phone")
              b-input-group.memo
                b-form-textarea(v-model="order.memo" placeholder='餐點備註' rows="5")
              .btn-group
                b-btn(@click="cancel") 取消
                b-btn(@click="submit") 送出

</template>

<script>
import { BIcon, BIconCart4, BIconPhone } from 'bootstrap-vue'
export default {
  name: 'Cart',
  components: {
    BIcon,
    BIconCart4,
    BIconPhone
  },
  data () {
    return {
      order: {
        name: '',
        gender: '',
        mobile: '',
        here: null,
        orderDate: '',
        pickupTime: null,
        items: {
          itemName: '',
          count: null
        },
        memo: ''
      },
      fields: [
        { key: '品項' },
        { key: '數量', sortable: true },
        { key: '價錢', sortable: true },
        { key: '更改' }
      ],
      items: [
        { 品項: '猴頭菇', 數量: '3', 價錢: '390', 更改: 'icon' },
        { 品項: '猴頭菇', 數量: '3', 價錢: '350', 更改: 'icon' },
        { 品項: '猴頭菇', 數量: '3', 價錢: '390', 更改: 'icon' },
        { 品項: '猴頭菇', 數量: '1', 價錢: '390', 更改: 'icon' }
      ],
      gender: [
        { text: '先生', value: '先生' },
        { text: '小姐', value: '小姐' }
      ],
      selected: [null], // b-form-select default value
      here: [
        { text: '取餐方式', value: null },
        { text: '內用 ', value: '內用' },
        { text: '外帶', value: '外帶' }
      ],
      pickupTime: [
        { text: '取餐時間', value: null },
        { text: '12:00', value: '12:00' },
        { text: '12:30', value: '12:30' },
        { text: '13:00', value: '13:00' },
        { text: '13:30', value: '13:30' },
        { text: '14:00', value: '14:00' },
        { text: '14:30', value: '14:30' },
        { text: '15:00', value: '15:00' },
        { text: '15:30', value: '15:30' },
        { text: '16:00', value: '16:00' },
        { text: '16:30', value: '16:30' },
        { text: '17:00', value: '17:00' },
        { text: '17:30', value: '17:30' },
        { text: '18:00', value: '18:00' },
        { text: '18:30', value: '18:30' },
        { text: '19:00', value: '19:00' },
        { text: '19:30', value: '19:30' },
        { text: '20:00', value: '20:00' }
      ]
    }
  },
  computed: {
    get () {
      console.log(this.$store.getters.cartItems)
      return this.$store.getters.cartItems
    }
  },
  methods: {
    submit () {
      event.preventDefault()
      console.log(this.order)
    },
    cancel () {
      event.preventDefault()
      this.order.name = ''
      this.order.gender = ''
      this.order.mobile = ''
      this.order.here = null
      this.order.orderDate = ''
      this.order.pickupTime = null
      this.order.memo = ''
    }
  }
}
</script>
