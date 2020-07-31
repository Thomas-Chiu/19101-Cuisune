<template lang="pug">
  b-navbar#nav
    b-navbar-nav.ml-auto
      b-nav-item(v-b-toggle.list)
        b-icon(icon="list" scale="1.5")
      //- sidebar
      b-sidebar#list(
        bg-variant="dark"
        backdrop
        right
        )
        h2 會員專區
        hr
        router-link(to="/signin")
          b-btn(block)
            b-icon(icon="person-fill" scale="1.25")
            span 登入/註冊
        b-btn(block @click="signout")
          b-icon(icon="power" scale="1.25")
          span 會員登出
</template>

<script>
import { BIcon, BIconList, BIconPersonFill, BIconPower } from 'bootstrap-vue'

export default {
  name: 'Navbar',
  components: {
    BIcon,
    BIconList,
    BIconPersonFill,
    BIconPower
  },
  methods: {
    signout () {
      this.axios.delete(process.env.VUE_APP_APIURL + '/signout')
        .then(res => {
          const data = res.data
          if (data.success) {
            this.$swal({
              toast: true,
              showConfirmButton: false,
              icon: 'success',
              title: '登出成功',
              position: 'top-end',
              timer: 3000,
              timerProgressBar: true
            })
            this.$store.commit('signout')
            this.$router.push('/')
            location.reload()
          } else {
            this.$swal({
              title: data.message
            })
          }
        })
        .catch(err => {
          alert(err.response.data.message)
        })
    }
  }
}
</script>
