<template lang="pug">
  #admin
    .wrapper
      .section.page-header.header-filter
        b-form.container(@submit="submit")
          .md-layout
            .md-layout-item.md-size-33.md-small-size-66.md-xsmall-size-100.md-medium-size-40.mx-auto
              h4.card-title(slot='title') Admin Login
              p.description(slot='description')
              md-field.md-form-group(slot='inputs')
                md-icon face
                label Account
                md-input(
                  v-model='account'
                  type="text"
                  )
              md-field.md-form-group(slot='inputs')
                md-icon lock_outline
                label Password
                md-input(
                  v-model='password'
                  type='password'
                  )
              footer.md-simple.md-lg(slot='footer')
                md-button(type="reset") 取消
                md-button(type="submit") 登入

</template>

<script>
import { LoginCard } from '@/components/LoginCard.vue'

export default {
  name: 'Admin',
  components: {
    LoginCard
  },
  data () {
    return {
      account: '',
      password: ''
    }
  },
  methods: {
    submit (event) {
      event.preventDefault()
      if (this.account.length < 4 || this.account.length > 20) { // 前台先驗證
        this.$swal({
          toast: true,
          showConfirmButton: false,
          icon: 'error',
          title: '帳號格式不符',
          position: 'top-end',
          timer: 3000,
          timerProgressBar: true
        })
        return
      } if (this.password.length < 4 || this.password.length > 20) {
        this.$swal({
          toast: true,
          showConfirmButton: false,
          icon: 'error',
          title: '密碼格式不符',
          position: 'top-end',
          timer: 3000,
          timerProgressBar: true
        })
        return
      }
      this.axios.post(process.env.VUE_APP_APIURL + '/signin', {
        account: this.account,
        password: this.password
      })
        .then(res => {
          const data = res.data
          if (data.result[0].admin) { // admin 欄位為true 才可登入後台
            this.$swal({
              toast: true,
              showConfirmButton: false,
              icon: 'success',
              title: '登入成功',
              position: 'top-end',
              timer: 3000,
              timerProgressBar: true
            })
            this.$store.commit('login', this.account) // 呼叫vuex 的登入
            this.$router.push('/adminboard')
          } else {
            this.$swal({
              toast: true,
              showConfirmButton: false,
              icon: 'error',
              title: '登入失敗',
              position: 'top-end',
              timer: 3000,
              timerProgressBar: true
            })
          }
        })
        .catch(err => {
          this.$swal({
            title: err.response.data.message
          })
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/material-kit.scss";
</style>
