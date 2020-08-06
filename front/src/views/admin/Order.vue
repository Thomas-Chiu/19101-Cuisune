<template lang="pug">
  #order
    card
      form
        b-row
          b-col(cols="12")
            b-alert(variant="warning" show) 編輯格式提醒 / 外帶欄位：輸入內用或外帶 / 日期：yyyy-mm-dd / 時間：hr:min / 備註 30 字內
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
              fg-input(v-model="model.togo" placeholder="請輸入 內用 / 外帶")
            td(v-if="!row.edit") {{row.orderDate}}
            td(v-else)
              fg-input(v-model="model.orderDate")
            td(v-if="!row.edit") {{row.pickupTime}}
            td(v-else)
              fg-input(v-model="model.pickupTime")
            td(v-else)
              fg-input(v-model="model.pickupTime")
            td(v-if="!row.edit") {{row.memo}}
            td(v-else)
              b-textarea(v-model="model.memo" rows="4")
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
      model: [
        {
          name: '',
          gender: '',
          mobile: '',
          togo: '',
          orderDate: '',
          pickupTime: '',
          memo: ''
        }
      ]
    }
  },
  methods: {
    handleEdit (row) { // 編輯
      this.model.name = row.name
      this.model.gender = row.gender
      this.model.mobile = row.mobile
      this.model.togo = row.togo
      this.model.orderDate = row.orderDate
      this.model.pickupTime = row.pickupTime
      this.model.memo = row.memo
      row.edit = true
    },
    handleDelete (row) { // 刪除
      event.preventDefault()
      const warning = confirm('確定要刪除？')
      if (!warning) return
      this.axios.delete(process.env.VUE_APP_APIURL + '/order/' + row.id)
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
      this.axios.patch(process.env.VUE_APP_APIURL + '/order/' + row.id, {
        name: this.model.name,
        gender: this.model.gender,
        mobile: this.model.mobile,
        togo: this.model.togo,
        orderDate: this.model.orderDate,
        pickupTime: this.model.pickupTime,
        memo: this.model.memo
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
    this.axios.get(process.env.VUE_APP_APIURL + '/order')
      .then(res => {
        console.log(res)
        let ID = 0
        this.tableData = res.data.result.map(d => {
          let yes = ''
          if (d.togo === '外帶') yes = '✔'
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
            items: d.items,
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
