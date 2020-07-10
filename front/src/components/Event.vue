<template lang="pug">
  .container-fluid
    h2 EVENTS
    b-card(no-body)
      b-row(no-gutters)
        b-col(md='4')
          b-card-body(title="News")
            b-tabs(pills vertical)
              b-tab(title='Tab 1' active)
                b-card-text Tab contents 1
              b-tab(title='Tab 2')
                b-card-text Tab contents 2
              b-tab(title='Tab 3')
                b-card-text Tab contents 3
        b-col(md='4')
          b-card-img(src='https://picsum.photos/800/600/?image=20' alt='Image')
        b-col(md='4')
          b-card-body(title='Details')
            b-card-text
              | This is a wider card with supporting text as a natural lead-in to additional content. This content is a little bit longer.

</template>

<script>
export default {
  name: 'Event'
}
</script>
