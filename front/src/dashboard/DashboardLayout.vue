<template>
  <div id="admin" class="wrapper">
    <side-bar>
      <template slot="links">
        <sidebar-link to="/user" name="會員管理" icon="ti-user"/>
        <sidebar-link to="/product" name="商品管理" icon="ti-marker-alt"/>
        <sidebar-link to="/orderitem" name="點餐項目" icon="ti-shopping-cart"/>
        <sidebar-link to="/order" name="點餐管理" icon="ti-view-list-alt"/>
        <sidebar-link to="/booking" name="訂位管理" icon="ti-book"/>
      </template>
      <mobile-menu>
        <li class="nav-item">
          <a class="nav-link">
            <i class="ti-settings"></i>
            <p @click="signout">sign out</p>
          </a>
        </li>
        <li class="divider"></li>
      </mobile-menu>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click.native="toggleSidebar">

      </dashboard-content>

    </div>
  </div>
</template>

<script>
import TopNavbar from './TopNavbar.vue'
import DashboardContent from './Content.vue'
import MobileMenu from './MobileMenu.vue'

export default {
  components: {
    TopNavbar,
    DashboardContent,
    MobileMenu
  },
  methods: {
    toggleSidebar () {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false)
      }
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
          alert(err.message)
        })
    }

  }
}
</script>

<style lang="scss" >
/* 把原本(main.js 引用)paperDashboard.js 引用的core css 改在這裡引用，才不影響到首頁的排版 */
@import "../assets/scss/paper-dashboard.scss";
@import "../assets/css/themify-icons.css";

#admin {
  .nav-item {
    &:hover{
      cursor: pointer;
    }
  }
}
</style>
