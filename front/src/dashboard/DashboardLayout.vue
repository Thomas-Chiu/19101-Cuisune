<template>
  <div class="wrapper">
    <side-bar>
      <template slot="links">
        <sidebar-link to="/dashboard" name="首頁" icon="ti-home"/>
        <sidebar-link to="/stats" name="會員管理" icon="ti-user"/>
        <sidebar-link to="/table-list" name="商品管理" icon="ti-marker-alt"/>
        <sidebar-link to="/typography" name="點餐管理" icon="ti-view-list-alt"/>
        <sidebar-link to="/icons" name="訂位管理" icon="ti-book"/>
      </template>
      <mobile-menu>
        <li class="nav-item">
          <a class="nav-link">
            <i class="ti-settings"></i>
            <p>登出</p>
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
    }
  }
}
</script>

<style lang="scss" >
/* 把原本(main.js 引用)paperDashboard.js 引用的core css 改在這裡引用，才不影響到首頁的排版 */
@import "../assets/scss/paper-dashboard.scss";
@import "../assets/css/themify-icons.css";
</style>
