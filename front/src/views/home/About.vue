<template lang="pug">
  .container-fluid
    .row
      .col-12
        h2 關於啖飯
      .col-12.carousel-text
        b-carousel#carousel-fade(no-hover-pause fade)
          b-carousel-slide(
            :interval="5000"
            img-width="0"
            img-height="0"
            img-blank
            )
            h6 健康是一生的事情，<br>吃飯是天天的事情。
          b-carousel-slide(
            :interval="5000"
            img-width="0"
            img-height="0"
            img-blank
            )
            h6 猴頭菇跟臭豆腐是招牌，然後<br>剛好有不少的食材是有機的。
        a.icon(href="https://www.facebook.com/19101cuisine/" target="blank")
          font-awesome-icon(:icon="['fab', 'facebook-square']")
        a.icon(href="https://www.instagram.com/19101_cuisine/" target="blank")
          font-awesome-icon(:icon="['fab', 'instagram']")
        h2 關於影片
          label.accordion-trigger(for="accordion")
            font-awesome-icon(:icon="['fab', 'youtube']")
        p.icon-arrow
          b-icon(icon="arrow-up" scale="2" animation="cylon-vertical")
          br
          h6 CLICK
      .ytvideo
        .vid-switch
          input#accordion(type="checkbox" checked)
          .accordion
            b-card
              b-card-body.vid-head(title="#quiet  #refined #vegetarian")
              b-embed(
              type="iframe"
                aspect="21by9"
                src="https://www.youtube.com/embed/XJ2knN8d5sg"
              )
</template>

<script>
import { BIcon, BIconArrowUp } from 'bootstrap-vue'

export default {
  name: 'About',
  components: {
    BIcon,
    BIconArrowUp
  }
}
</script>
