<template lang="pug">
  #signup
    .wrapper
      .section.page-header.header-filter
        b-form.container(@submit="submit")
          .md-layout
            .md-layout-item.md-size-33.md-small-size-66.md-xsmall-size-100.md-medium-size-40.mx-auto
              b-alert(show) 帳號、密碼最少 4 個字，最多 20 個 / 信箱格式要正確
              h4.card-title(slot='title') 會員註冊
                small.card-sub-title Sign up
              p.description(slot='description')
                md-field.md-form-group(slot='inputs')
                  md-icon account_circle
                  label 帳號
                  md-input(
                    v-model='account'
                    type="text"
                    required
                    )
                md-field.md-form-group(slot='inputs')
                  md-icon lock_outline
                  label 密碼
                  md-input(
                    v-model='password'
                    type='password'
                    required
                    )
                md-field.md-form-group(slot='inputs')
                  md-icon face
                  label 姓名
                  md-input(
                    v-model='name'
                    type='text'
                    required
                    )
                md-field.md-form-group(slot='inputs')
                  md-icon mail_outline
                  label Email
                  md-input(
                    v-model='email'
                    type='email'
                    required
                    )
                footer.md-simple.md-lg(slot='footer')
                  md-button(type="reset") 取消
                  md-button(type="submit") 送出
</template>

<script>
import { LoginCard } from '../components/LoginCard.vue'

export default {
  name: 'Signup',
  components: {
    LoginCard
  },
  data () {
    return {
      account: '',
      password: '',
      name: '',
      email: ''
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
      this.axios.post(process.env.VUE_APP_APIURL + '/signup', {
        account: this.account,
        password: this.password,
        name: this.name,
        email: this.email,
        admin: false
      })
        .then(res => {
          console.log(res)
          const data = res.data
          if (data.success) {
            this.$swal({
              toast: true,
              showConfirmButton: false,
              icon: 'success',
              title: '註冊成功',
              position: 'top-end',
              timer: 3000,
              timerProgressBar: true
            })
            setTimeout(() => {
              this.$router.push('/signin')
            }, 3000)
          } else {
            this.$swal({
              toast: true,
              showConfirmButton: false,
              icon: 'error',
              title: '註冊失敗',
              position: 'top-end',
              timer: 3000,
              timerProgressBar: true
            })
            console.log(data)
          }
        })
        .catch(err => { // 登入失敗
          console.log(err)
          alert('帳號已有人使用')
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/material-kit.scss";
</style>
