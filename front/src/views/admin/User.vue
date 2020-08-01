<template lang="pug">
  #user
    card
      form
        p-button.btn-confirm(v-if="toggleAdd" type="success" style='margin-left: 10px;' @click.native="handleConfirm") 確認
        p-button.btn-add-cancel(v-if="toggleAdd" type="danger" style='margin-left: 10px;' @click.native="handleAddCancel") 取消
        p-button.btn-add(v-else type="warning" @click.native="handleAdd") 新增帳號
        template(v-if="toggleAdd")
          b-alert(variant="warning" show ) 帳號不可重複 / 帳密最少 4 個字，最多 20 個 / 信箱格式要正確
          b-row
            fg-input.col(v-model="addModel.name" placeholder="姓名")
            fg-input.col(v-model="addModel.account" placeholder="帳號")
            fg-input.col(v-model="addModel.password" placeholder="密碼")
            fg-input.col(v-model="addModel.email" placeholder="信箱")
            b-form-radio-group(:options="options" v-model="addModel.admin")

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
              fg-input(v-if="row.edit" v-model="model.name" placeholder="點我編輯")
            td {{row.account}}
              fg-input(v-if="row.edit" v-model="model.account" placeholder="點我編輯")
            td {{row.password}}
              fg-input(v-if="row.edit" disabled)
            td {{row.email}}
              fg-input(v-if="row.edit" v-model="model.email" placeholder="點我編輯")
            td {{row.admin}}
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
  name: 'User',
  components: { PaperTable },
  data () {
    return {
      tableColumns: ['ID', '姓名', '帳號', '密碼', '信箱', '管理員', '編輯 / 刪除'],
      tableData: [], // slot-scope='{row}'
      model: [
        {
          name: '',
          account: '',
          email: '',
          edit: false
        }
      ],
      toggleAdd: false,
      addModel: {
        name: '',
        account: '',
        password: '',
        email: '',
        admin: false
      },
      options: [
        { text: '使用者', value: false },
        { text: '管理者', value: true }
      ]
    }
  },
  methods: {
    handleAdd () { // 新增
      this.toggleAdd = true
    },
    handleAddCancel () { // 取消新增
      this.toggleAdd = false
    },
    handleConfirm () { // 確認
      this.toggleAdd = false
      this.axios.post(process.env.VUE_APP_APIURL + '/signup', {
        name: this.addModel.name,
        account: this.addModel.account,
        password: this.addModel.password,
        email: this.addModel.email,
        admin: this.addModel.admin
      })
        .then(res => {
          console.log(res)
          const data = res.data
          if (data.success) {
            this.$swal({
              toast: true,
              showConfirmButton: false,
              icon: 'success',
              title: '新增成功',
              position: 'top-end',
              timer: 2000,
              timerProgressBar: true
            })
            setTimeout(() => {
              location.reload()
            }, 2000)
          } else {
            alert('OHNO')
          }
        })
        .catch(err => {
          alert(err.message)
          console.log(err)
        })
    },
    handleEdit (row) { // 編輯
      row.edit = true
    },
    handleDelete (row) { // 刪除
      event.preventDefault()
      this.axios.delete(process.env.VUE_APP_APIURL + '/user/' + row.id)
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
          setTimeout(() => {
            location.reload()
          }, 2000)
        })
        .catch(err => {
          alert(err.message)
          console.log(err)
        })
    },
    handleUpdate (row) { // 更新
      event.preventDefault()
      this.axios.patch(process.env.VUE_APP_APIURL + '/user', {
        id: row.id,
        name: this.model.name,
        account: this.model.account,
        email: this.model.email
      })
        .then(res => {
          location.reload()
        }).catch(err => {
          alert(err.message)
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
    this.axios.get(process.env.VUE_APP_APIURL + '/user')
      .then(res => {
        let ID = 0 // 自定義ID 排序
        this.tableData = res.data.result.map(d => {
          let yes = ''
          if (d.admin) yes = '✔'
          else yes = ''
          ID++
          return {
            id: d.id,
            ID,
            name: d.name,
            account: d.account,
            password: d.password,
            email: d.email,
            admin: yes,
            edit: false
          }
        })
      }).catch(err => {
        alert(err.message + ' 伺服器錯誤')
      })
  }
}
</script>
<style>
</style>
