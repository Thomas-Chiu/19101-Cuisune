<template lang="pug">
  .container-fluid
    h2 CONTACT
    b-row
      b-col(md="6")
        .icon
          b-icon(icon="geo" scale="1.5")
          p 桃園市中壢區領航南路一段162號
        .icon
          b-icon(icon="clock" scale="1.5")
          p 上午11:30 - 下午8:30 （週三公休）
        .icon
          b-icon(icon="phone" scale="1.5")
          p 03－427 3085
        .icon
          b-icon(icon="chat" scale="1.5" flip-h)
          p MESSAGE
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
  }
}
</script>
