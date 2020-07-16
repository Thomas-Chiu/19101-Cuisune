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
        <template>
          <img src="https://scontent.ftpe7-4.fna.fbcdn.net/v/t1.0-9/p960x960/97053182_705931250152240_7873890409053683712_o.jpg?_nc_cat=107&_nc_sid=8024bb&_nc_oc=AQlefAOmNSO0ppx8qPyXrUXMTLAk0fLGGcbES4NTc9xQISj5a40-8TTel7_jLYATBlE&_nc_ht=scontent.ftpe7-4.fna&_nc_tp=6&oh=54db421725a30abc905392db3cb35dab&oe=5F31A623" alt="餐點照片">
          <!-- img 相對路徑 build 出來有問題 -->
          <img src="../../../materials/menu/乾麵.png" alt="">
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
      listOfTodos: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }],
      headerOpt: { isVisible: true, backgroundColor: '#a9afc97e' },
      footerOpt: { isVisible: false, backgroundColor: '#a9afc97e' }
    }
  }
}
</script>
