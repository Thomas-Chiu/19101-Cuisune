<template lang="pug">
  #booking
    card
      form
        paper-table(:data='tableData' :columns='tableColumns' type='hover')
          template(slot='columns')
            th(
              v-for="(column, index) in tableColumns"
              :key="index"
              v-model="tableColumns"
              @click="toggleSort"
            ) {{ column }}
          template(slot-scope='{row}')
            td {{row.ID}}
            td {{row.name}}
              fg-input(v-if="row.edit" v-model="model.name")
            td {{row.gender}}
              fg-input(v-if="row.edit" v-model="model.gender")
            td {{row.mobile}}
              fg-input(v-if="row.edit" v-model="model.mobile")
            td {{row.people}}
              fg-input(v-if="row.edit" v-model="model.people")
            td {{row.date}}
              fg-input(v-if="row.edit" v-model="model.date")
            td {{row.time}}
              fg-input(v-if="row.edit" v-model="model.time")
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
  name: 'Booking',
  components: { PaperTable },
  data () {
    return {
      tableColumns: ['ID', '姓名', '性別', '電話', '人數', '日期', '時間', ''],
      tableData: [], // slot-scope='{row}'
      model: [
        {
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
      event.preventDefault()
      this.axios.delete(process.env.VUE_APP_APIURL + '/booking/' + row.id)
        .then(res => {
          this.$swal({
            toast: true,
            showConfirmButton: false,
            icon: 'success',
            title: '刪除成功',
            position: 'top-end',
            timer: 3000,
            timerProgressBar: true
          })
        })
        .catch(err => {
          alert(err.message)
          console.log(err)
        })
      console.log(row.id)
    },
    handleUpdate (row) { // 更新
      event.preventDefault()
      this.axios.patch(process.env.VUE_APP_APIURL + '/booking', {
        id: row.id,
        name: this.model.name,
        gender: this.model.gender,
        mobile: this.model.mobile,
        people: this.model.people,
        date: this.model.date,
        time: this.model.time
      })
        .then(res => {
          location.reload()
        }).catch(err => {
          alert('請按照格式，日期: yyyy-mm-dd，時間: hr:min')
          console.log(err.message)
        })
      row.edit = false
      console.log(this.model)
    },
    handleCancel (row) { // 取消
      row.edit = false
      console.log(row.edit)
    },
    toggleSort (event) { // 排序功能.sort()
      console.log(this.tableData)
    }
  },
  mounted () {
    this.axios.get(process.env.VUE_APP_APIURL + '/booking')
      .then(res => {
        let ID = 0 // 自定義ID 排序
        this.tableData = res.data.result.map(d => {
          ID++
          return {
            id: d.id, // 這是DB 的id，patch 更新資料需要findbyid
            ID, // 這是表格顯示的ID
            name: d.name,
            gender: d.gender,
            mobile: d.mobile,
            people: d.people,
            date: d.date.substr(0, 10), // substr(起點字元，終點字元)
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
