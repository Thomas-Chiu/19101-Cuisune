<template lang="pug">
  #app
    b-container(fluid)
      vue-page-transition(name="fade-in-right")
        router-view
</template>

<script>
export default {
  name: 'App'
}
</script>
