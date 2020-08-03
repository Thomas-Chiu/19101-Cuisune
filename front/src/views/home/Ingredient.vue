<template lang="pug">
  .container-fluid
    .container
      .wrapper
        h2 FRIENDLINESS
        hr
        b-row
          b-col.friend(md="4")
            h4 友善食材
            p 優先採用天然有機、無毒和大廠認證優良食材，盡其所能控管品質、維護新鮮。
          b-col.friend(md="4")
            h4 友善製作
            p 調製以少油、少鹽、少糖、少磷等作為期許。
          b-col.friend(md="4")
            h4 友善寵物
            p 以不打擾其他客人為原則，提供寵物休憩的空間，使客人、寵物與餐廳有良好的互動。
          b-col.friend(md="4")
            h4 友善分享
            p 歡迎互相粉想私房菜製作，希望能在友善互動的環境下，共享健康人生的方法。
          b-col.friend(md="4")
            h4 友善大地
            p 製作好吃又健康的蔬食，提供客人食用，並期望在食材的挑選和烹調的過程中，達到友善地球的目的。
        h2 INGREDIENTS
        hr
        Photoswipe
          .box-bg
            b-row
              b-col(
                cols="6"
                md="3"
                v-for="(img,index) in imgs"
                :key="index"
                )
                .box
                  b-img(:src="img.src" v-pswp="img" fluid)
</template>

<script>
export default {
  name: 'Ingredient',
  data () {
    return {
      imgs: [
        {
          src: './images/ingredient/臭豆腐.jpg',
          title: '臭豆腐／非基改有機臭豆腐製作（主婦聯盟同廠出品）'
        },
        {
          src: './images/ingredient/蔬果.jpg',
          title: '蔬果／能高有機農場'
        },
        {
          src: './images/ingredient/蔬果2.jpg',
          title: '蔬果／鄉田有機農場和其他有機農場及小農生產'
        },
        {
          src: './images/ingredient/滷豆干.jpg',
          title: '豆製品／豆之味工廠（有機認證）'
        },
        {
          src: './images/ingredient/鮮香蛋.jpg',
          title: '雞蛋／亞植有機農場驗證雞蛋（有機黃豆和玉米飼養）'
        },
        {
          src: './images/ingredient/香菇.jpg',
          title: '香菇／竹山小農（有機認證）'
        },
        {
          src: './images/ingredient/稻鴨米.jpg',
          title: '米／有機稻鴨米（宜蘭三星）'
        },
        {
          src: './images/ingredient/醬油.jpg',
          title: '醬油／西螺瑞春（非基改黑豆釀製而成）'
        },
        {
          src: './images/ingredient/豆瓣辣醬.jpg',
          title: '豆瓣醬、辣醬／豆油伯（非基改）'
        },
        {
          src: './images/ingredient/檸檬汁.jpg',
          title: '有機精油檸檬汁／能高農場有機無籽檸檬'
        },
        {
          src: './images/ingredient/水.jpg',
          title: '水／三道過濾（可生飲）'
        },
        {
          src: './images/ingredient/油.jpg',
          title: '頂級冷壓初榨橄欖油／使用於煎、煮、炒、炸、烤'
        },
        {
          src: './images/ingredient/提味粉.jpg',
          title: '提味粉／香菇與甜菜健康蔬果粉（德國進口綠太陽生物科技）'
        },
        {
          src: './images/ingredient/果膠粉.jpg',
          title: '果膠粉／天然海藻製成（台大化學博士楊海明研發）'
        },
        {
          src: './images/ingredient/椰子粉.jpg',
          title: '椰子粉／含中鏈脂肪酸（50%月桂酸，較短鍊，易吸收）'
        },
        {
          src: './images/ingredient/糖.jpg',
          title: '糖／有機蔗糖與手工紅冰糖（蔗糖）'
        }
      ]
    }
  }
}
</script>
