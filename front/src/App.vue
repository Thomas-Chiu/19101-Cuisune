<template>
  <div id="app">
    <div :class="{'nav-open': $sidebar.showSidebar}">
      <b-container fluid>
        <vue-page-transition name="fade-in-right">
          <router-view></router-view>
        </vue-page-transition>
      </b-container>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
