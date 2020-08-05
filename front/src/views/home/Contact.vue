<template lang="pug">
  .container-fluid
    h2 啖飯位置
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
            p 聯絡我們
          .msg-form
            b-form-group#input-group-1
              b-form-input#input-1(v-model='form.name' type="text" placeholder='Name')
            b-form-group#input-group-2
              b-form-input#input-2(v-model='form.phone' type="tel"  placeholder='Phone Number')
            b-form-group#input-group-3
              b-form-input#input-3(v-model='form.email' type='email' placeholder='Email Addrss')
            b-form-group#input-group-4
              b-form-textarea#input-group-4(v-model='form.text' rows="5" placeholder='Message')
            b-button.mailtoui(
              variant="link"
              :href="mailtoHref"
              ) SEND MESSAGE
      //- google map
      b-col(md="6")
        iframe(src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3615.9866893806225!2d121.20373291537818!3d25.00056824578403!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x34682147a4a70705%3A0xdee9b6a98ba13d58!2z5ZWW6aOvIDE5MTAxIGN1aXNpbmU!5e0!3m2!1sen!2stw!4v1594689041038!5m2!1sen!2stw' width='800' height='600' frameborder='0' style='border:0;' allowfullscreen)
</template>

<script>
import { BIcon, BIconGeo, BIconChat, BIconClock, BIconPhone } from 'bootstrap-vue'
import MailtoUI from 'mailtoui/dist/mailtoui-min.js'

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
      mailtoEmail: '19101cuisine@gmail.com'
    }
  },
  computed: {
    mailtoHref: function () {
      // The %20 represents space character
      return 'mailto:' + this.mailtoEmail + '?subject=Message%20from%20' + this.form.name + '%20電話: ' + this.form.phone + '%20信箱: ' + this.form.email + '&body=' + this.form.text
    }
  },
  mounted () {
    MailtoUI.run(
      {
        title: '選擇您的 email 帳戶',
        buttonText1: 'Gmail',
        buttonText2: 'Outlook',
        buttonText3: 'Yahoo',
        buttonText4: 'Windows 郵件',
        disableOnMobile: false
      }
    )
  }
}
</script>
