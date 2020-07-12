<template lang="pug">
  .container-fluid
    .row
      .col-12
        h2 ABOUT
      .col-12.carousel-text
        b-carousel#carousel-fade(fade)
          b-carousel-slide(
            :interval="3000"
            img-width="0"
            img-height="0"
            caption="19101 cuisine"
            img-blank
            )
            p 健康是一生的事情，<br>吃飯是天天的事情。
          b-carousel-slide(
            :interval="3000"
            img-width="0"
            img-height="0"
            caption='關於啖飯'
            img-blank
            )
            p 猴頭菇跟臭豆腐是招牌，然後<br>剛好有不少的食材是有機的。
        h2 VIDEO
          label.accordion-trigger(for="accordion")
            font-awesome-icon(:icon="['fab', 'youtube']")
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
export default {
  name: 'About'
}
</script>
