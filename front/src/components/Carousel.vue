<template lang="pug">
  #carousel.container-fluid
    .row
      .col-12
        b-carousel#carousel-1(
          v-model='slide'
          :interval='4000'
          @sliding-start='onSlideStart'
          @sliding-end='onSlideEnd'
          background='#ababab'
          style='text-shadow: 1px 1px 2px #333;'
          )
          //- Text slides with image
          b-carousel-slide(caption='First slide' text='我是圖片文字' img-src="https://picsum.photos/1024/768/?random=1")
          //- Slides with custom text
          b-carousel-slide(img-src='https://picsum.photos/1024/768/?image=54')
            h1 Hello world!
          //- Slides with image only
          b-carousel-slide(img-src='https://picsum.photos/1024/768/?image=58')
          //- Slides with img slot
          //-  Note the classes .d-block and .img-fluid to prevent browser default image alignment
          b-carousel-slide
            template(v-slot:img)
              img(
                class="d-block img-fluid w-100"
                src="https://picsum.photos/1024/768/?image=55"
                alt="image slot"
              )
      .col-12
        b-carousel#carousel-1(
          v-model='slide'
          :interval='4000'
          @sliding-start='onSlideStart'
          @sliding-end='onSlideEnd'
          background='#ababab'
          style='text-shadow: 1px 1px 2px #333;'
          )
          //- Text slides with image
          b-carousel-slide(caption='First slide' text='我是圖片文字' img-src="https://picsum.photos/1024/768/?random=1")
          //- Slides with custom text
          b-carousel-slide(img-src='https://picsum.photos/1024/768/?image=54')
            h1 Hello world!
          //- Slides with image only
          b-carousel-slide(img-src='https://picsum.photos/1024/768/?image=58')
          //- Slides with img slot
          //-  Note the classes .d-block and .img-fluid to prevent browser default image alignment
          b-carousel-slide
            template(v-slot:img)
              img(
                class="d-block img-fluid w-100"
                src="https://picsum.photos/1024/768/?image=55"
                alt="image slot"
              )
      .logo LOGO
      p.icon
        b-icon(icon="arrow-down" scale="2" animation="cylon-vertical")
</template>

<script>
import { BIcon, BIconArrowDown } from 'bootstrap-vue'

export default {
  name: 'Carousel',
  components: {
    BIcon,
    BIconArrowDown
  },
  data () {
    return {
      slide: 0,
      sliding: null
    }
  },
  methods: {
    onSlideStart (slide) {
      this.sliding = true
    },
    onSlideEnd (slide) {
      this.sliding = false
    }
  }
}
</script>
