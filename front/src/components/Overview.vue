<template>
  <div class="container-fluid overview">
    <div class="wrapper">
      <h2>OVERVIEW</h2>
      <hr>
      <VueCardCarousel
        class="vcc"
        startIndex="2"
        hideBackdrop
        :items="listOfTodos"
        :header-options="headerOpt"
        :footer-options="footerOpt"
      >
        <template v-slot:header="slotProps">
          <strong>我是菜名: {{ slotProps.headerProp.id }}</strong>
        </template>
        <template v-slot:default="slotProps">
          <img v-for="(img, index) in imgs" :key="index" src="" alt="餐點照片">
          <div v-for="n in 5" :key="n">
            {{ slotProps.bodyProp.cMainId }}. Hello from the Parent.
          </div>
        </template>
        <template v-slot:footer="slotProps">
          <strong>Id: {{ slotProps.footerProp.id }}</strong>
        </template>
      </VueCardCarousel>
    </div>
  </div>
</template>

<script>
import { VueCardCarousel } from 'vue-card-carousel'

export default {
  components: {
    VueCardCarousel
  },
  data () {
    return {
      imgs: [
        {
          title: '',
          src: ''
        },
        {
          title: '',
          src: ''
        },
        {
          title: '',
          src: ''
        },
        {
          title: '',
          src: ''
        }
      ],
      listOfTodos: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
      headerOpt: { isVisible: true, backgroundColor: '#a9afc97e' },
      footerOpt: { isVisible: true, backgroundColor: '#a9afc97e' }
    }
  }
}
</script>
