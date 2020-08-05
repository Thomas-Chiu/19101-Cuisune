<template lang="pug">
  .container-fluid
    h2 線上預約
      a.menu-file(:href="menuFile" target="blank")
        b-icon(icon="file-earmark-text" animation="fade" style="margin-right: 5px;")
        span 看菜單
    .container
      b-card(:img-src="imgSrc")
        b-row.btn-function(no-gutters)
          b-col(md="6")
            b-btn.btn-left(
              block
              v-b-modal.booking
            ) 我要訂位
          b-col(md="6")
            router-link(to="/menu")
              b-btn.btn-right(block) 我要點餐

          //- Modal
          b-modal#booking(
            centered
            hide-footer
            title="線上訂位"
            header-bg-variant="info"
            header-text-variant="light"
            body-bg-variant="light"
          )
            b-form.text-center.px-5(@submit="submit")
              b-form-row.justify-content-center
                b-form-group.date
                  b-calendar(
                  hide-header
                  locale="zh-tw"
                  selected-variant="info"
                  today-variant="info"
                  v-model="booking.date"
                  )
              b-input-group.name
                b-form-input(v-model="booking.name" placeholder='姓名' required)
                b-input-group-prepend(is-text)
                  b-form-radio-group.gender(:options="gender" v-model="booking.gender" required)
              b-input-group.mobile
                b-input-group-prepend(is-text)
                  b-icon(icon="phone")
                b-form-input(v-model="booking.mobile" placeholder='電話' required)
              b-input-group.people
                b-input-group-prepend(is-text)
                  b-icon(icon="people")
                b-form-select(v-model="booking.people" :options="people" required)
              b-input-group.time
                b-input-group-prepend(is-text)
                  b-icon(icon="watch")
                b-form-select(v-model="booking.time" :options="time" required)
              .btn-group
                b-btn(type="reset" @click="cancel") 取消
                b-btn(type="submit") 送出
</template>

<script>
import { BIcon, BIconWatch, BIconPhone, BIconPeople, BIconFileEarmarkText } from 'bootstrap-vue'

export default {
  name: 'Event',
  components: {
    BIcon,
    BIconWatch,
    BIconPhone,
    BIconPeople,
    BIconFileEarmarkText
  },
  data () {
    return {
      booking: {
        date: '',
        name: '',
        gender: '',
        mobile: '',
        people: null,
        time: null
      },
      gender: [
        { text: '先生', value: '先生' },
        { text: '小姐', value: '小姐' }
      ],
      selected: [null], // b-form-select default value
      people: [
        { text: '訂位人數', value: null },
        { text: '1', value: 1 },
        { text: '2', value: 2 },
        { text: '3', value: 3 },
        { text: '4', value: 4 },
        { text: '5', value: 5 },
        { text: '6', value: 6 },
        { text: '7', value: 7 },
        { text: '8', value: 8 },
        { text: '9', value: 9 },
        { text: '10', value: 10 }
      ],
      time: [
        { text: '訂位時間', value: null },
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
      ],
      imgSrc: './images/logo/brand_horizontal.png',
      menuFile: './19101 menu.pdf'
    }
  },
  methods: {
    submit (event) {
      event.preventDefault()
      const warning = confirm(`
      請確認訂位資訊
      
        姓名：${this.booking.name} ${this.booking.gender}
        電話：${this.booking.mobile}
        人數：${this.booking.people}
        日期：${this.booking.date}
        時間：${this.booking.time}
      `)
      if (!warning) return
      this.axios.post(process.env.VUE_APP_APIURL + '/booking', {
        name: this.booking.name,
        gender: this.booking.gender,
        mobile: this.booking.mobile,
        people: this.booking.people,
        date: this.booking.date,
        time: this.booking.time
      })
        .then(res => {
          this.$swal({
            icon: 'success',
            title: '訂位成功'
          })
          setTimeout(() => {
            location.reload()
          }, 2000)
        })
        .catch(err => {
          this.$swal({
            icon: 'error',
            title: '點餐失敗'
          })
          console.log(err.message)
        })
    },
    cancel (event) {
      event.preventDefault()
      this.booking.date = ''
      this.booking.name = ''
      this.booking.gender = ''
      this.booking.mobile = ''
      this.booking.people = null
      this.booking.time = null
    }
  }
}
</script>
