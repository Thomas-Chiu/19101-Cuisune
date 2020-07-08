<template lang="pug">
  .container
    .row
      .col-12
        h2 ABOUT
      .col-12
        .carousel-text
          b-carousel#carousel-fade(
            fade
            style='text-shadow: 0px 0px 2px #000'
            )
            b-carousel-slide(
              caption="19101 cuisine"
              img-blank
              )
              p 健康是一生的事情，吃飯是天天的事情。
            b-carousel-slide(
              caption='關於啖飯'
              img-blank
              )
              p 猴 頭 菇 跟 臭 豆 腐 是 招 牌 ， 然 後 剛 好 有 不 少 的 食 材 是 有 機 的。

</template>

<script>
export default {
  name: 'About'
}
</script>
