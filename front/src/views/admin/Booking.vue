<template lang="pug">
  #booking
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
            td(v-if="!row.edit") {{row.people}}
            td(v-else)
              fg-input(v-model="model.people")
            td(v-if="!row.edit") {{row.date}}
            td(v-else)
              fg-input(v-model="model.date")
            td(v-if="!row.edit") {{row.time}}
            td(v-else)
              fg-input(v-model="model.time")
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
      tableColumns: ['ID', '姓名', '性別', '電話', '人數', '日期', '時間', '編輯 / 刪除'],
      tableData: [], // slot-scope='{row}'
      model: [
        {
          name: '',
          gender: '',
          mobile: '',
          people: '',
          date: '',
          time: ''
        }
      ]
    }
  },
  methods: {
    handleEdit (row) { // 編輯
      this.model.name = row.name
      this.model.gender = row.gender
      this.model.mobile = row.mobile
      this.model.people = row.people
      this.model.date = row.date
      this.model.time = row.time
      row.edit = true
    },
    handleDelete (row) { // 刪除
      const warning = confirm('確定要刪除？')
      if (!warning) return
      event.preventDefault()
      this.axios.delete(process.env.VUE_APP_APIURL + '/booking/' + row.id)
        .then(res => {
          this.$swal({
            toast: true,
            showConfirmButton: false,
            icon: 'success',
            title: '刪除成功',
            position: 'top-end',
            timer: 2000,
            timerProgressBar: true
          })
          // this.tableData.splice(row, 1)
          setTimeout(() => {
            location.reload()
          }, 2000)
        })
        .catch(err => {
          alert(err.message)
        })
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
          this.$swal({
            toast: true,
            showConfirmButton: false,
            icon: 'success',
            title: '更新成功',
            position: 'top-end',
            timer: 2000,
            timerProgressBar: true
          })
          setTimeout(() => {
            location.reload()
          }, 2000)
        }).catch(err => {
          alert('請按照格式，日期: yyyy-mm-dd，時間: hr:min')
          console.log(err.message)
        })
      row.edit = false
    },
    handleCancel (row) { // 取消
      row.edit = false
    },
    toggleSort (event) { // 排序功能.sort() 還沒做
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
