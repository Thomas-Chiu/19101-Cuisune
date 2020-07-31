<template lang="pug">
  #product
    card(:title='table1.title')
      paper-table(type='hover' :data='table1.data' :columns='table1.columns')

</template>
<script>
import { PaperTable } from '@/components'
const tableColumns = ['Id', '名稱', '價格', '簡介']
const products = []

export default {
  name: 'Product',
  components: {
    PaperTable
  },
  data () {
    return {
      table1: {
        title: '猴頭菇套餐',
        columns: tableColumns,
        products: products
      }
    }
  },
  methods: {

  },
  mounted () {
    this.axios.get(process.env.VUE_APP_APIURL + '/product')
      .then(res => {
        console.log(res)
      }).catch(err => {
        alert(err.message + ' 伺服器錯誤')
      })
  }
}
</script>
<style>
</style>
