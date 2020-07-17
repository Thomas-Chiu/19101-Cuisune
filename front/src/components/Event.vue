<template lang="pug">
  .container-fluid
    h2 EVENTS
    .container
      b-card(no-body)
        b-row(no-gutters)
          b-col(md="4")
            b-card-body(title="News")
              b-tabs(pills vertical)
                b-tab(title="活動一" active)
                  b-card-text 內容一
                b-tab(title="活動二")
                  b-card-text 內容二
                b-tab(title="活動三")
                  b-card-text 內容三
          b-col(md="4")
            b-card-img(src="https://picsum.photos/400/400/?random=1" alt='活動照片')
          b-col(md="4")
            b-card-body(title="Details")
              b-card-text
                | 這邊放活動內容的文案這邊放活動內容的文案這邊放活動內容的文案這邊放活動內容的文案這邊放活動內容的文案這邊放活動內容的文案這邊放活動內容的文案這邊放活動內容的文案這邊放活動內容的文案
        b-row.btn-function(no-gutters)
          b-col(md="6")
            b-button(block) BOOK A TABLE
          b-col(md="6")
            b-button(block to="/Menu") ORDER A DISH

</template>

<script>
export default {
  name: 'Event'
}
</script>
