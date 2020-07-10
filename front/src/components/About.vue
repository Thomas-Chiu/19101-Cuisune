<template lang="pug">
  .container
    .row
      .col-12
        h2 ABOUT
      .col-12
        .carousel-text
          b-carousel#carousel-fade(
            fade
            )
            b-carousel-slide(
              caption="19101 cuisine"
              img-blank
              )
              p 健康是一生的事情，<br>吃飯是天天的事情。
            b-carousel-slide(
              caption='關於啖飯'
              img-blank
              )
              p 猴頭菇跟臭豆腐是招牌，然後<br>剛好有不少的食材是有機的。

</template>

<script>
export default {
  name: 'About'
}
</script>
