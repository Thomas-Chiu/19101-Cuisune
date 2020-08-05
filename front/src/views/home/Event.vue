<template lang="pug">
  .container-fluid
    h2 EVENTS
    .container
      b-card(no-body img-src="https://scontent.ftpe8-4.fna.fbcdn.net/v/t1.0-9/p720x720/90231215_670908086987890_3646898701454016512_o.jpg?_nc_cat=104&_nc_sid=8024bb&_nc_ohc=f9wmxrusoMYAX-RIhOp&_nc_ht=scontent.ftpe8-4.fna&_nc_tp=6&oh=9f6d9252b99c7297b89e1c51a899d35e&oe=5F50122D")
      b-row.btn-function(no-gutters)
        b-col(md="6")
          b-btn(
            block
            v-b-modal.booking
          ) 我要訂位
        b-col(md="6")
          router-link(to="/menu")
            b-btn(block) 我要點餐
        b-row(no-gutters)
          b-col(cols="12")
          //- b-img( src="https://scontent.ftpe8-4.fna.fbcdn.net/v/t1.0-9/p720x720/90231215_670908086987890_3646898701454016512_o.jpg?_nc_cat=104&_nc_sid=8024bb&_nc_ohc=f9wmxrusoMYAX-RIhOp&_nc_ht=scontent.ftpe8-4.fna&_nc_tp=6&oh=9f6d9252b99c7297b89e1c51a899d35e&oe=5F50122D")

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
      ]
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
