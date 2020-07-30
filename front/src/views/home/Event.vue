<template lang="pug">
  .container-fluid
    h2 EVENTS
    .container
      b-card(no-body)
        b-row(no-gutters)
          b-col(md="4")
            b-card-body(title="News")
              b-tabs(pills vertical)
                b-tab(title="活動一" active)
                  b-card-text 內容一
                b-tab(title="活動二")
                  b-card-text 內容二
                b-tab(title="活動三")
                  b-card-text 內容三
          b-col(md="4")
            b-card-img(src="https://picsum.photos/400/400/?random=1" alt='活動照片')
          b-col(md="4")
            b-card-body(title="Details")
              b-card-text
                | 這邊放活動內容的文案這邊放活動內容的文案這邊放活動內容的文案這邊放活動內容的文案這邊放活動內容的文案這邊放活動內容的文案這邊放活動內容的文案這邊放活動內容的文案這邊放活動內容的文案
        b-row.btn-function(no-gutters)
          b-col(md="6")
            b-button(
              block
              v-b-modal.booking
            ) BOOK A TABLE
          b-col(md="6")
            router-link(to="/menu")
              b-button(block) ORDER A DISH
          //- Modal
          b-modal#booking(
            centered
            title="線上訂位"
            hide-footer
          )
            b-form.text-center.px-5(@submit="submit")
              b-form-row.justify-content-center
                b-form-group.date
                  b-calendar(
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
              b-button(type="reset") 取消
              b-button(type="submit") 送出
              pre {{this.booking}}

</template>

<script>
import { BIcon, BIconWatch, BIconPhone, BIconPeople } from 'bootstrap-vue'

export default {
  name: 'Event',
  components: {
    BIcon,
    BIconWatch,
    BIconPhone,
    BIconPeople
  },
  data () {
    return {
      booking: {
        date: '',
        time: '',
        name: '',
        gender: '',
        mobile: '',
        people: ''
      },
      gender: [
        { text: '先生', value: '先生' },
        { text: '小姐', value: '小姐' }
      ],
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
      ]
    }
  },
  methods: {
    submit (event) {
      event.preventDefault()
      this.axios.post(process.env.VUE_APP_APIURL + '/booking', {
        name: this.booking.name,
        gender: this.booking.gender,
        mobile: this.booking.mobile,
        people: this.booking.people,
        date: this.booking.date,
        time: this.booking.time
      }).then(res => {
        this.$swal({
          icon: 'success',
          title: '訂位成功'
        }).catch(err => {
          this.$swal({
            icon: 'error',
            title: err.message
          })
        })
      })
    }
  }
}
</script>
