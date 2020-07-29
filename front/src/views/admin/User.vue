<template lang="pug">
  #user
    card
      form(@submit.prevent)
        .row
          th.col(v-for="(column,index) in columns" :key="index" ) {{ column }}
        .row
          .col
            fg-input(
              v-for="(user, index) in users"
              :key="index"
              v-if="user.edit"
              type='text'
              v-model='user.name'
              )
            fg-input(
              v-else
              v-model='user.name'
              type='text'
              :disabled='true'
              )
          .col
            fg-input(
              v-for="(user, index) in users"
              :key="index"
              v-if="user.edit"
              type='text'
              v-model='user.account'
              )
            fg-input(
              v-else
              v-model='user.account'
              type='text'
              :disabled='true'
              )
          .col
            fg-input(
              v-for="(user, index) in users"
              :key="index"
              v-if="user.edit"
              type='text'
              v-model='user.password'
              )
            fg-input(
              v-else
              v-model='user.password'
              type='text'
              :disabled='true'
              )
          .col
            fg-input(
              v-for="(user, index) in users"
              :key="index"
              v-if="user.edit"
              type='text'
              v-model='user.email'
              )
            fg-input(
              v-else
              v-model='user.email'
              type='text'
              :disabled='true'
              )
          .col
            fg-input(
              v-for="(user, index) in users"
              :key="index"
              v-if="user.edit"
              type='text'
              v-model='user.admin'
              )
            fg-input(
              v-else
              v-model='user.admin'
              type='text'
              :disabled='true'
              )
        .text-center
          p-button(type='warning' @click.native.prevent='toggleEdit') Edit User
          p-button(type='info' @click.native.prevent='updateProfile') Update Profile
        .clearfix
</template>
<script>
export default {
  data () {
    return {
      users: [],
      columns: ['姓名', '帳號', '密碼', '信箱', '管理員']

    }
  },
  methods: {
    updateProfile () {
      alert('Your data: ')
    },
    toggleEdit () {
      // this.user.edit = true
      alert('yaya')
    }
  },
  mounted () {
    this.axios.get(process.env.VUE_APP_APIURL + '/user')
      .then(res => {
        this.users = res.data.result.map(d => {
          let yes = ''
          if (d.admin) yes = '✔'
          else yes = ''
          return {
            name: d.name,
            account: d.account,
            password: d.password,
            email: d.email,
            admin: yes,
            edit: false
          }
        })
        console.log(this.users)
        // console.log(res)
      }).catch(err => {
        alert(err.message + ' 伺服器錯誤')
      })
  }
}
</script>
<style>
</style>
