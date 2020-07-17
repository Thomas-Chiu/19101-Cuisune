<template>
  <div class="container-fluid overview">
    <div class="container">
      <div class="wrapper">
        <h2>OVERVIEW</h2>
        <hr>
        <VueCardCarousel
          class="vcc"
          startIndex="0"
          hideBackdrop
          :items="listOfTodos"
          :header-options="headerOpt"
          :body-options="bodyOpt"
          :footer-options="footerOpt"
        >
          <template v-slot:header="slotProps">
            <strong>{{ slotProps.headerProp.headerDish }}</strong>
          </template>
          <template v-slot:default="slotProps">
            <img
            v-for="(img, index) in slotProps.bodyProp.imgs"
            :key="index" alt="餐點照片"
            :src="img.src"
            >
          </template>
          <template v-slot:footer="slotProps">
            <strong>{{ slotProps.footerProp.footerDish }}</strong>
          </template>
        </VueCardCarousel>
      </div>
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
      listOfTodos: [
        {
          id: 1,
          headerDish: '猴頭菇炒飯',
          footerDish: '乾拌麵系列',
          imgs: [
            { name: '炒飯', src: './images/炒飯.png' },
            { name: '炒飯', src: './images/乾麵.png' }
          ]
        },
        {
          id: 2,
          headerDish: '390 套餐',
          footerDish: '450 套餐',
          imgs: [
            { name: '炒飯', src: './images/390.png' },
            { name: '炒飯', src: './images/450.png' }
          ]
        }, { id: 3 }, { id: 4 }, { id: 5 }
      ],
      headerOpt: { isVisible: true, backgroundColor: '#a9afc97e' },
      footerOpt: { isVisible: true, backgroundColor: '#a9afc97e' }
    }
  }
}
</script>
