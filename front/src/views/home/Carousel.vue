<template lang="pug">
  b-container#carousel(fluid)
    b-row(style="margin-right: 1.5px;")
      b-col(cols="12" md="6")
        agile.left(:options="options")
          b-img.slide(
            v-for="(img, index) in leftSrc"
            :key="index"
            :src='img'
            style="margin-left: 1px;"
            )
      b-col(cols="12" md="6")
        agile.right(:options="options")
          b-img.slide(
            v-for="(img, index) in rightSrc"
            :key="index"
            :src='img'
            )
      .logo
        img(:src="logoSrc")
</template>

<script>

export default {
  name: 'Carousel',
  data () {
    return {
      logoSrc: './images/logo/logo_mushroom_dark_animated.svg',
      leftSrc: [
        './images/place/place1.jpg',
        './images/place/place2.jpg',
        './images/place/place3.jpg',
        './images/place/place4.jpg',
        './images/place/place5.jpg',
        './images/place/place6.jpg'
      ],
      rightSrc: [
        './images/place/place7.jpg',
        './images/place/place8.jpg',
        './images/place/place9.jpg',
        './images/place/place10.jpg',
        './images/place/place11.jpg',
        './images/place/place12.jpg'
      ],
      options: {
        dots: false,
        fade: true,
        autoplay: true,
        navButtons: false,
        pauseOnHover: false,
        speed: 6000,
        autoplaySpeed: 5000
      }
    }
  },
  methods: {
  }
}
</script>
