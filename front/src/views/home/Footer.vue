<template lang="pug">
  b-container.footer(fluid)
    b-row
      b-col.left-brand(md="2")
        b-img(:src="imgs[0].src" fluid)
      b-col(md="4")
        .wrapper
          a(href="https://www.facebook.com/%E6%81%8D%E7%B9%86%E6%97%A5%E5%B8%B8-The-Grand-Chilis-Absurdism-Hotel-101260491587415/" target="blank")
            font-awesome-icon(:icon="['fab', 'facebook-square']")
            | 恍繆日常
        .wrapper
          a(href="https://www.instagram.com/chilis_absurdism/" target="blank")
            font-awesome-icon(:icon="['fab', 'instagram']")
            | The Grand Chili's Absurdism Hotel
      b-col.right-brand(md="2")
        b-img(:src="imgs[1].src" fluid)
      b-col(md="4")
        .wrapper
          a(href="https://www.facebook.com/19101cuisine/" target="blank")
            font-awesome-icon(:icon="['fab', 'facebook-square']")
            | 啖飯
        .wrapper
          a(href="https://www.instagram.com/19101_cuisine/" target="blank")
            font-awesome-icon(:icon="['fab', 'instagram']")
            | 19101 cuisine

</template>

<script>
export default {
  name: 'Footer',
  data () {
    return {
      imgs: [
        { src: './images/logo/subbrand.png' },
        { src: './images/logo/brand_vertical_dark.png' }
      ]
    }
  }
}
</script>
