<template lang="pug">
  b-container(fluid)
    b-img(fluid src="https://scontent.ftpe7-2.fna.fbcdn.net/v/t1.0-9/101179645_127636508949813_4694772946747523072_o.jpg?_nc_cat=109&_nc_sid=dd9801&_nc_oc=AQn4PIqHlyZjbAuZFJyiOoMRrr3R25H9Vn0ui3gSh1XO9G3WeXdZvJA1VHK6nWLJuK0&_nc_ht=scontent.ftpe7-2.fna&oh=8caf08741c2a819d3c1718078a6deb38&oe=5F32CC23")
    b-jumbotron
    template(v-slot:header) 荒謬日常
    template(v-slot:lead)
    hr.my-4
    p It uses utility classes for typography and spacing to space content out within the larger container.

</template>

<script>
export default {
  name: 'SubBrand'
}
</script>
