<template lang="pug">
  #booking
    card
      paper-table(:data='tableData' :columns='tableColumns' type='hover')
        template(slot='columns')
          th(
            v-for="(column, index) in tableColumns"
            :key="index"
            v-model="tableColumns"
            @click="toggleSort"
          ) {{ column }}
        template(slot-scope='{row}')
          td {{row.id}}
          td {{row.name}}
            input(v-if="row.edit")
          td {{row.gender}}
          td {{row.mobile}}
          td {{row.people}}
          td {{row.date}}
          td {{row.time}}
          td.icon-col
            .btn-default(v-if="!row.edit")
              p-button(type='info' icon @click.native='handleEdit(row)')
                i.ti-pencil-alt
              p-button(style='margin-left: 15px;' type='danger' icon @click.native='handleDelete(row)')
                i.ti-close
            .btn-edit(v-else)
              p-button(@click.native='handleUpdate(row)' outline) update
              p-button(@click.native='handleCancel(row)' outline) cancel

</template>

<script>
import { PaperTable } from '@/components'

export default {
  name: 'Booking',
  components: { PaperTable },
  data () {
    return {
      tableColumns: ['Id', '姓名', '性別', '電話', '人數', '日期', '時間', ''],
      tableData: [], // slot-scope='{row}'
      model: [
        {
          id: '',
          name: '',
          gender: '',
          mobile: '',
          people: '',
          date: '',
          time: '',
          edit: false
        }
      ]

    }
  },
  methods: {
    handleEdit (row) { // 編輯
      row.edit = true
      console.log(row.edit)
    },
    handleDelete (row) { // 刪除
      console.log(`You want to delete row with id: ${row.id}`)
    },
    handleUpdate (row) { // 更新
      row.edit = false
      console.log(row.edit)
    },
    handleCancel (row) { // 取消
      row.edit = false
      console.log(row.edit)
    },
    toggleSort (event) { // 排序功能
      console.log(this.tableData)
    }
  },
  mounted () {
    this.axios.get(process.env.VUE_APP_APIURL + '/booking')
      .then(res => {
        let id = 0
        this.tableData = res.data.result.map(d => {
          id++
          return {
            id,
            name: d.name,
            gender: d.gender,
            mobile: d.mobile,
            people: d.people,
            date: d.date,
            time: d.time,
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
