<template lang="pug">
  .container-fluid
    h2 CONTACT
    b-row
      b-col(md="6")
        .wrapper
          .icon
            b-icon(icon="geo")
            p 桃園市中壢區領航南路一段162號
          .icon
            b-icon(icon="clock")
            p 上午11:30 - 下午8:30 （週三公休）
          .icon
            b-icon(icon="phone")
            p 03－427 3085
          .icon
            b-icon(icon="chat" flip-h)
            p MESSAGE US
          .msg-form
            b-form(@submit='onSubmit' @reset='onReset' v-if='show')
              b-form-group#input-group-1
                b-form-input#input-1(v-model='form.name' type="text" required placeholder='Name')
              b-form-group#input-group-2
                b-form-input#input-2(v-model='form.phone' type="tel" required placeholder='Phone Number')
              b-form-group#input-group-3
                b-form-input#input-3(v-model='form.email' type='email' required placeholder='Email Addrss')
              b-form-group#input-group-4
                b-form-textarea#input-group-4(v-model='form.text' rows="5" required placeholder='Message')
              b-button(type='submit' variant="link") SEND MESSAGE
              //- b-button(type='reset' variant='danger') Reset

      b-col(md="6")
        iframe(src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3615.9866893806225!2d121.20373291537818!3d25.00056824578403!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x34682147a4a70705%3A0xdee9b6a98ba13d58!2z5ZWW6aOvIDE5MTAxIGN1aXNpbmU!5e0!3m2!1sen!2stw!4v1594689041038!5m2!1sen!2stw' width='800' height='600' frameborder='0' style='border:0;' allowfullscreen)
</template>

<script>
import { BIcon, BIconGeo, BIconChat, BIconClock, BIconPhone } from 'bootstrap-vue'

export default {
  name: 'Contact',
  components: {
    BIcon,
    BIconGeo,
    BIconChat,
    BIconClock,
    BIconPhone
  },
  data () {
    return {
      form: {
        name: '',
        phone: '',
        email: '',
        text: ''
      },
      show: true
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      alert(JSON.stringify(this.form))
    },
    onReset (evt) {
      evt.preventDefault()
      // Reset our form values
      this.form.name = ''
      this.form.phone = ''
      this.form.email = ''
      this.form.text = ''
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}
</script>
