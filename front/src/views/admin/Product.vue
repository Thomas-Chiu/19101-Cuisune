<template lang="pug">
  #product
    //- 猴頭菇套餐
    card(:title="cardTitles[0]")
      b-card(
            no-body
            v-for="(item, index) in setMeals"
            :key="index"
      )
        b-row(no-gutters )
          b-col(md="6")
            b-card-img(fluid :src="item.img")
          b-col(md="6")
            b-card-body(v-if="!toggleEdit")
              h4 {{ item.name }}
              p NT {{ item.price }}
              p {{item.description}}
              .btn-default
                p-button(type='info' icon @click.native="handleEdit(item)")
                  i.ti-pencil-alt
                p-button(style='margin-left: 10px;' type='danger' icon @click.native="handleDelete(item)")
                  i.ti-close
            b-card-body(v-else)
              fg-input(v-model="model.name" placeholder="更改商品名稱")
              fg-input(v-model="model.price" placeholder="更改商品金額")
              b-textarea(v-model="model.description" rows="5" placeholder="更改商品說明")
              .btn-edit
                p-button(@click.native="handleUpdate(item)" outline) update
                p-button(@click.native="handleCancel(item)" outline) cancel
    //- 火鍋類

    //- 飯類

    //- 麵類

    //- 其他

</template>
<script>
export default {
  name: 'Product',
  data () {
    return {
      cardTitles: ['猴頭菇套餐', '火鍋類', '飯類', '麵類', '其他'],
      setMeals: [],
      hotPots: [],
      rices: [],
      noodles: [],
      others: [],
      model: [
        {
          name: '',
          price: '',
          description: '',
          img: ''
        }
      ],
      toggleEdit: false
    }
  },
  methods: {
    handleEdit (item) {
      this.toggleEdit = true
    },
    handleDelete (item) {
      console.log(item)
    },
    handleUpdate (item) { // 更新
      event.preventDefault()
      this.axios.patch(process.env.VUE_APP_APIURL + '/product', {
        id: item.id,
        name: this.model.name,
        price: this.model.price,
        description: this.model.description,
        img: this.model.img
      })
        .then(res => {
          location.reload()
        }).catch(err => {
          alert(err.message)
        })
      this.toggleEdit = false
      console.log(item)
    },
    handleCancel (item) {
      this.toggleEdit = false
    }
  },
  mounted () {
    this.axios.get(process.env.VUE_APP_APIURL + '/product')
      .then(res => {
        const result = res.data.result
        result.map(d => {
          if (d.name.includes('猴頭菇套餐')) {
            this.setMeals.push(d)
          } if (d.name.includes('火鍋')) {
            this.hotPots.push(d)
          } if (d.name.includes('飯')) {
            this.rices.push(d)
          } if (d.name.includes('麵')) {
            this.noodles.push(d)
          } else {
            if (
              !d.name.includes('猴頭菇套餐') &&
              !d.name.includes('火鍋') &&
              !d.name.includes('飯') &&
              !d.name.includes('麵')
            ) {
              this.others.push(d)
            }
          }
        })
        console.log(this.others)
      }).catch(err => {
        alert(err.message + ' 伺服器錯誤')
      })
  }
}
</script>
<style>
</style>
