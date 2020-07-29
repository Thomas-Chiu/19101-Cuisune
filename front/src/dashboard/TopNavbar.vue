<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <div class="container-fluid">
      <a class="navbar-brand">{{routeName}}</a>
      <button
        class="navbar-toggler navbar-burger"
        type="button"
        @click="toggleSidebar"
      >
        <span class="navbar-toggler-bar"></span>
        <span class="navbar-toggler-bar"></span>
        <span class="navbar-toggler-bar"></span>
      </button>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a href="#" class="nav-link mr-4">
              <i class="ti-settings"></i>
              <p @click="signout"> sign out</p>
            </a>
          </li>
        </ul>
      </div>
    </div></nav>
</template>
<script>
export default {
  computed: {
    routeName () {
      const { name } = this.$route
      return this.capitalizeFirstLetter(name)
    }
  },
  data () {
    return {
      activeNotifications: false
    }
  },
  methods: {
    capitalizeFirstLetter (string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    },
    toggleNotificationDropDown () {
      this.activeNotifications = !this.activeNotifications
    },
    closeDropDown () {
      this.activeNotifications = false
    },
    toggleSidebar () {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar)
      console.log(this.$sidebar)
    },
    hideSidebar () {
      this.$sidebar.displaySidebar(false)
    },
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
<style>
</style>
