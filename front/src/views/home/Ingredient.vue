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
          b-row
            b-col(v-for="(img,index) in imgs" :key="index")
              //- .box(v-for="n in 3")
              img(:src="img.src" v-pswp="img" :title="title")
</template>

<script>
export default {
  name: 'Ingredient',
  data () {
    return {
      imgs: [
        {
          src: './images/logo/logo_mushroom.png',
          title: 'YA'
          // size: '1600x1600'
        }
      ]
    }
  }
}
</script>
