<template>
  <div class="content">
    <div class="container-fluid">
        <transition name="fade" mode="out-in">
          <!-- your content here -->
        <vue-page-transition  name="fade-in-left">
          <router-view></router-view>
        </vue-page-transition>
        </transition>
    </div>
  </div>
</template>
<script>
export default {}
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}

.fade-enter,
  .fade-leave-to
  /* .fade-leave-active in <2.1.8 */

{
  opacity: 0;
}
</style>
