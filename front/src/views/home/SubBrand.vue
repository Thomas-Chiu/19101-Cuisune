<template lang="pug">
  b-container.subBrand(fluid)
    b-jumbotron
      template(v-slot:header) 恍繆日常
      template(v-slot:lead)
        p 隱身於啖飯 19101 cuisine 內的店中店
        p 日常的一隅
        p 總堆放了模糊不清的錯誤
        br
        p 歡迎將荒謬打包，寄託於恍繆日常
        p We always welcome your check in.
        br
        small 14:00 後限量供應下午茶鹹食餐點
        br
        small 烘焙實驗室全天候供應甜點麵包
        p
          b-button(variant="link" href="https://www.facebook.com/%E6%81%8D%E7%B9%86%E6%97%A5%E5%B8%B8-The-Grand-Chilis-Absurdism-Hotel-101260491587415/" target="blank") LEARN MORE
</template>

<script>
export default {
  name: 'SubBrand'
}
</script>

<style lang="scss">
  .subBrand {
    h1 {
      font-family: "GenYoMinTW";
      letter-spacing: 20px;
    }

    p:nth-child(1) {
      margin: 0 !important;
      margin-bottom: 56px !important;
      font-weight: bold;
      color: rgba(245, 245, 245, 0.75);
    }

    p:nth-child(6) {
      font-family: 'Pinyon Script', cursive;
      letter-spacing: 5px !important;
      margin-top: 20px !important;
    }

    small {
      color: rgba(255, 255, 255, 0.75);
    }
  }
</style>
