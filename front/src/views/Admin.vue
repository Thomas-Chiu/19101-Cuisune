<template lang="pug">
  #admin
    .wrapper
      .section.page-header.header-filter
        form.container(method="post")
          .md-layout
            .md-layout-item.md-size-33.md-small-size-66.md-xsmall-size-100.md-medium-size-40.mx-auto
              h4.card-title(slot='title') Admin Login
              //- md-button.md-just-icon.md-simple.md-white(slot='buttons' href='javascript:void(0)')
              //-   i.fab.fa-facebook-square
              //- md-button.md-just-icon.md-simple.md-white(slot='buttons' href='javascript:void(0)')
              //-   i.fab.fa-twitter
              //- md-button.md-just-icon.md-simple.md-white(slot='buttons' href='javascript:void(0)')
              //-   i.fab.fa-google-plus-g
              p.description(slot='description')
              md-field.md-form-group(slot='inputs')
                md-icon face
                label Account
                md-input(v-model='account')
              //- md-field.md-form-group(slot='inputs')
              //-   md-icon email
              //-   label Email
              //-   md-input(v-model='email' type='email')
              md-field.md-form-group(slot='inputs')
                md-icon lock_outline
                label Password
                md-input(v-model='password' type='password')
              footer.md-simple.md-lg(slot='footer')
                md-button(type="submit") 忘記密碼
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
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/material-kit.scss"
</style>
