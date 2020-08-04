<template lang="pug">
  #order
    card
      form
        paper-table(:data='tableData' :columns='tableColumns' type='hover')
          template(v-slot='columns')
            th(
              v-for="(column, index) in tableColumns"
              :key="index"
              v-model="tableColumns"
              @click="toggleSort"
            ) {{ column }}
          template(slot-scope='{row}')
            td {{row.ID}}
            td(v-if="!row.edit") {{row.name}}
            td(v-else)
              fg-input(v-model="model.name")
            td(v-if="!row.edit") {{row.gender}}
            td(v-else)
              fg-input(v-model="model.gender")
            td(v-if="!row.edit") {{row.mobile}}
            td(v-else)
              fg-input(v-model="model.mobile")
            td(v-if="!row.edit") {{row.togo}}
            td(v-else)
              fg-input(v-model="model.togo")
            td(v-if="!row.edit") {{row.orderDate}}
            td(v-else)
              fg-input(v-model="model.orderDate")
            td(v-if="!row.edit") {{row.pickupTime}}
            td(v-else)
              fg-input(v-model="model.pickupTime")
            td(v-if="!row.edit") {{row.memo}}
            td(v-else)
              b-textarea(v-model="model.memo" rows="5")
            td.icon-col
              .btn-default(v-if="!row.edit")
                p-button(type='info' icon @click.native='handleEdit(row)')
                  i.ti-pencil-alt
                p-button(style='margin-left: 10px;' type='danger' icon @click.native='handleDelete(row)')
                  i.ti-close
              .btn-edit(v-else)
                p-button(@click.native='handleUpdate(row)' outline) update
                p-button(@click.native='handleCancel(row)' outline) cancel
</template>

<script>
import { PaperTable } from '@/components'

export default {
  name: 'Order',
  components: { PaperTable },
  data () {
    return {
      tableColumns: ['ID', '姓名', '性別', '電話', '外帶', '取餐日期', '取餐時間', '備註', '編輯 / 刪除'],
      tableData: [], // slot-scope='{row}'
      model: []
    }
  },

  mounted () {
    this.axios.get(process.env.VUE_APP_APIURL + '/order')
      .then(res => {
        console.log(res)
        let ID = 0
        this.tableData = res.data.result.map(d => {
          let yes = ''
          if (d.togo) yes = '✔'
          else yes = ''
          ID++
          return {
            id: d.id,
            ID,
            name: d.name,
            gender: d.gender,
            mobile: d.mobile,
            togo: yes,
            orderDate: d.orderDate.substr(0, 10),
            pickupTime: d.pickupTime,
            memo: d.memo,
            edit: false
          }
        })
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>
<style>
</style>
