<template lang="pug">
  #pageNotFound
    h3 Sorry, can't find the page....
    router-link(to="/")
      b-btn(variant="warning" ) Back to 19101 cuisine
</template>

<script>
export default {
  name: 'PageNotFound'
}
</script>

<style lang="scss" scoped>
  #pageNotFound {
    height: 100vh;
    padding: 10%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
</style>
