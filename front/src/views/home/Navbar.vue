<template lang="pug">
  //- b-navbar#nav(toggleable="md")
  b-navbar#nav
    b-navbar-toggle.ml-auto(target="collapse")
    b-collapse(id="collapse" is-nav)
      b-navbar-nav.ml-auto
        b-nav-item(
          v-b-toggle.signIn
          ) Sign in
          font-awesome-icon(:icon="['far', 'user']")
        b-nav-item(
          v-b-toggle.signUp
        ) Sign up
          font-awesome-icon(:icon="['fas', 'user-plus']")
        //- sidebar
        b-sidebar#signIn(
          title="Sign In"
          bg-variant="dark"
          backdrop
          right
          )
          b-form
            b-input
            hr
            router-link(to="/admin")
              b-btn admin
        b-sidebar#signUp(
          title="Sign Up"
          bg-variant="dark"
          backdrop
          right
          )

</template>

<script>
export default {
  name: 'Navbar'
}
</script>
