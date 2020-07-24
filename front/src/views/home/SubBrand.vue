<template lang="pug">
  b-container.subBrand(fluid)
    b-jumbotron
      template(v-slot:header) 恍繆日常
      template(v-slot:lead) 隱身於啖飯 19101 cuisine 內的店中店
        p 日常的一隅
        p 總堆放了模糊不清的錯誤
        p ·
        p 歡迎將荒謬打包，寄託於恍繆日常
        p We always welcome your check in.
        p
          b-button(variant="link" href="https://www.facebook.com/%E6%81%8D%E7%B9%86%E6%97%A5%E5%B8%B8-The-Grand-Chilis-Absurdism-Hotel-101260491587415/" target="blank") LEARN MORE
</template>

<script>
export default {
  name: 'SubBrand'
}
</script>
