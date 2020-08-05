<template>
  <div class="container-fluid overview">
    <div class="container">
      <div class="wrapper">
        <h2>餐點系列</h2>
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
            <strong>{{ slotProps.headerProp.headerDish }}</strong>
          </template>
          <template v-slot:default="slotProps">
            <img
            v-for="(img, index) in slotProps.bodyProp.imgs"
            :key="index" alt="餐點照片"
            :src="img.src"
            >
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
          headerDish: '義大利麵系列 / 乾拌麵系列',
          imgs: [
            { name: '義麵', src: './images/menu/義麵.jpg' },
            { name: '乾麵', src: './images/menu/乾麵.jpg' }
          ]
        },
        {
          id: 2,
          headerDish: '猴頭菇丼飯 / 猴頭菇炒飯',
          // footerDish: '乾拌麵系列',
          imgs: [
            { name: '丼飯', src: './images/menu/丼飯.jpg' },
            { name: '炒飯', src: './images/menu/炒飯.jpg' }
          ]
        },
        {
          id: 3,
          headerDish: '猴頭菇漢堡包 / 韓式石鍋拌飯',
          imgs: [
            { name: '漢堡', src: './images/menu/漢堡.jpg' },
            { name: '石鍋', src: './images/menu/石鍋.jpg' }
          ]
        },
        {
          id: 4,
          headerDish: '臭豆腐泡菜火鍋 / 臭豆腐泡菜湯麵',
          imgs: [
            { name: '臭豆腐火鍋', src: './images/menu/臭豆腐火鍋.jpg' },
            { name: '臭豆腐湯麵', src: './images/menu/臭豆腐湯麵.jpg' }
          ]
        },
        {
          id: 5,
          headerDish: '白豆腐泡菜火鍋 / 有機豆漿火鍋',
          imgs: [
            { name: '白豆腐火鍋', src: './images/menu/白豆腐火鍋.jpg' },
            { name: '豆漿火鍋', src: './images/menu/豆漿火鍋.jpg' }
          ]
        },
        {
          id: 6,
          headerDish: '泰式酸辣火鍋 / 泰式酸辣湯麵',
          imgs: [
            { name: '泰式火鍋', src: './images/menu/泰式火鍋.jpg' },
            { name: '泰式湯麵', src: './images/menu/泰式湯麵.jpg' }
          ]
        },
        {
          id: 7,
          headerDish: '麻油藥膳火鍋 / 麻油藥膳湯麵',
          imgs: [
            { name: '麻油火鍋', src: './images/menu/麻油火鍋.jpg' },
            { name: '麻油湯麵', src: './images/menu/麻油湯麵.jpg' }
          ]
        }
      ],
      headerOpt: { isVisible: true, backgroundColor: '#a9afc97e' },
      footerOpt: { isVisible: false, backgroundColor: '#a9afc97e' }
    }
  }
}
</script>
