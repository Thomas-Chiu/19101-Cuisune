<template lang="pug">
  #product
    //- 新增商品
    card
      p-button.btn-confirm(v-if="toggleAdd" type="success" style='margin-left: 10px;' @click.native="handleConfirm") 確認
      p-button.btn-add-cancel(v-if="toggleAdd" type="danger" style='margin-left: 10px;' @click.native="handleAddCancel") 取消
      p-button.btn-add(v-else type="warning" @click.native="handleAdd") 新增商品
        //- template(v-if="toggleAdd")
        //-   b-alert(variant="warning" show ) 帳號不可重複 / 帳密最少 4 個字，最多 20 個 / 信箱格式要正確
        //-   b-row
        //-     fg-input.col(v-model="addModel.name" placeholder="姓名")
        //-     fg-input.col(v-model="addModel.account" placeholder="帳號")
        //-     fg-input.col(v-model="addModel.password" placeholder="密碼")
        //-     fg-input.col(v-model="addModel.email" placeholder="信箱")
        //-     b-form-radio-group(:options="options" v-model="addModel.admin")

    //- 猴頭菇套餐
    card(:title="cardTitles[0]")
      b-card(no-body v-for="(item, index) in setMeals" :key="index")
        b-row(no-gutters)
          b-col(md="4")
            b-card-img(fluid :src="item.img")
          b-col(md="8")
            b-card-body(v-if="!item.edit")
              h4 {{ item.name }}
              p NT {{ item.price }}
              p {{item.description}}
              .btn-default
                p-button(type='info' icon @click.native="handleEdit(item)")
                  i.ti-pencil-alt
                p-button(style='margin-left: 10px;' type='danger' icon @click.native="handleDelete(item)")
                  i.ti-close
            b-card-body(v-else)
              fg-input(v-model="model.name")
              fg-input(v-model="model.price")
              b-textarea(v-model="model.description" rows="5")
              .btn-edit
                p-button(@click.native="handleUpdate(item)" outline) update
                p-button(@click.native="handleCancel(item)" outline) cancel
    //- 火鍋類
    card(:title="cardTitles[1]")
      b-card(no-body v-for="(item, index) in hotPots" :key="index")
        b-row(no-gutters)
          b-col(md="4")
            b-card-img(fluid :src="item.img")
          b-col(md="8")
            b-card-body(v-if="!item.edit")
              h4 {{ item.name }}
              p NT {{ item.price }}
              p {{item.description}}
              .btn-default
                p-button(type='info' icon @click.native="handleEdit(item)")
                  i.ti-pencil-alt
                p-button(style='margin-left: 10px;' type='danger' icon @click.native="handleDelete(item)")
                  i.ti-close
            b-card-body(v-else)
              fg-input(v-model="model.name")
              fg-input(v-model="model.price")
              b-textarea(v-model="model.description" rows="5")
              .btn-edit
                p-button(@click.native="handleUpdate(item)" outline) update
                p-button(@click.native="handleCancel(item)" outline) cancel
    //- 飯類
    card(:title="cardTitles[2]")
      b-card(no-body v-for="(item, index) in rices" :key="index")
        b-row(no-gutters)
          b-col(md="4")
            b-card-img(fluid :src="item.img")
          b-col(md="8")
            b-card-body(v-if="!item.edit")
              h4 {{ item.name }}
              p NT {{ item.price }}
              p {{item.description}}
              .btn-default
                p-button(type='info' icon @click.native="handleEdit(item)")
                  i.ti-pencil-alt
                p-button(style='margin-left: 10px;' type='danger' icon @click.native="handleDelete(item)")
                  i.ti-close
            b-card-body(v-else)
              fg-input(v-model="model.name")
              fg-input(v-model="model.price")
              b-textarea(v-model="model.description" rows="5")
              .btn-edit
                p-button(@click.native="handleUpdate(item)" outline) update
                p-button(@click.native="handleCancel(item)" outline) cancel
    //- 麵類
    card(:title="cardTitles[3]")
      b-card(no-body v-for="(item, index) in noodles" :key="index")
        b-row(no-gutters)
          b-col(md="4")
            b-card-img(fluid :src="item.img")
          b-col(md="8")
            b-card-body(v-if="!item.edit")
              h4 {{ item.name }}
              p NT {{ item.price }}
              p {{item.description}}
              .btn-default
                p-button(type='info' icon @click.native="handleEdit(item)")
                  i.ti-pencil-alt
                p-button(style='margin-left: 10px;' type='danger' icon @click.native="handleDelete(item)")
                  i.ti-close
            b-card-body(v-else)
              fg-input(v-model="model.name")
              fg-input(v-model="model.price")
              b-textarea(v-model="model.description" rows="5")
              .btn-edit
                p-button(@click.native="handleUpdate(item)" outline) update
                p-button(@click.native="handleCancel(item)" outline) cancel
    //- 其他
    card(:title="cardTitles[4]")
      b-card(no-body v-for="(item, index) in others" :key="index")
        b-row(no-gutters)
          b-col(md="4")
            b-card-img(fluid :src="item.img")
          b-col(md="8")
            b-card-body(v-if="!item.edit")
              h4 {{ item.name }}
              p NT {{ item.price }}
              p {{item.description}}
              .btn-default
                p-button(type='info' icon @click.native="handleEdit(item)")
                  i.ti-pencil-alt
                p-button(style='margin-left: 10px;' type='danger' icon @click.native="handleDelete(item)")
                  i.ti-close
            b-card-body(v-else)
              fg-input(v-model="model.name")
              fg-input(v-model="model.price")
              b-textarea(v-model="model.description" rows="5")
              .btn-edit
                p-button(@click.native="handleUpdate(item)" outline) update
                p-button(@click.native="handleCancel(item)" outline) cancel
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
      toggleAdd: false
    }
  },
  methods: {
    handleAdd () { // 新增
      this.toggleAdd = true
    },
    handleAddCancel () { // 取消新增
      // this.addModel.name = ''
      // this.addModel.account = ''
      // this.addModel.password = ''
      // this.addModel.email = ''
      // this.addModel.admin = false
      this.toggleAdd = false
    },
    handleConfirm () { // 確認
      this.toggleAdd = false
      this.axios.post(process.env.VUE_APP_APIURL + '/signup', {
        name: this.addModel.name,
        account: this.addModel.account,
        password: this.addModel.password,
        email: this.addModel.email,
        admin: this.addModel.admin
      })
        .then(res => {
          const data = res.data
          if (data.success) {
            this.$swal({
              toast: true,
              showConfirmButton: false,
              icon: 'success',
              title: '新增成功',
              position: 'top-end',
              timer: 2000,
              timerProgressBar: true
            })
            setTimeout(() => {
              location.reload()
            }, 2000)
          } else {
            alert('請檢查資料格式')
          }
        })
        .catch(err => {
          alert(err.message)
          console.log(err)
        })
    },
    handleEdit (item) { // 編輯
      this.model.name = item.name
      this.model.price = item.price
      this.model.description = item.description
      item.edit = true
    },
    handleDelete (item) { // 刪除
      const warning = confirm('確定要刪除？')
      if (!warning) return
      event.preventDefault()
      this.axios.delete(process.env.VUE_APP_APIURL + '/product/' + item.id)
        .then(res => {
          this.$swal({
            toast: true,
            showConfirmButton: false,
            icon: 'success',
            title: '刪除成功',
            position: 'top-end',
            timer: 2000,
            timerProgressBar: true
          })
          setTimeout(() => {
            location.reload()
          }, 2000)
        })
        .catch(err => {
          alert(err.message)
          console.log(err)
        })
    },
    handleUpdate (item) { // 更新
      event.preventDefault()
      this.axios.patch(process.env.VUE_APP_APIURL + '/product/' + item.id, {
        name: this.model.name,
        price: this.model.price,
        description: this.model.description
      })
        .then(res => {
          this.$swal({
            toast: true,
            showConfirmButton: false,
            icon: 'success',
            title: '更新成功',
            position: 'top-end',
            timer: 2000,
            timerProgressBar: true
          })
          setTimeout(() => {
            location.reload()
          }, 2000)
        }).catch(err => {
          alert(err.message)
        })
      item.edit = false
    },
    handleCancel (item) { // 取消
      item.edit = false
    }
  },
  mounted () {
    this.axios.get(process.env.VUE_APP_APIURL + '/product')
      .then(res => {
        const result = res.data.result
        result.map(d => {
          const push = {
            id: d.id,
            name: d.name,
            price: d.price,
            description: d.description,
            img: d.img,
            edit: false
          }
          if (d.name.includes('猴頭菇套餐')) {
            this.setMeals.push(push)
          } if (d.name.includes('火鍋')) {
            this.hotPots.push(push)
          } if (d.name.includes('飯')) {
            this.rices.push(push)
          } if (d.name.includes('麵')) {
            this.noodles.push(push)
          } else {
            if (
              !d.name.includes('猴頭菇套餐') &&
              !d.name.includes('火鍋') &&
              !d.name.includes('飯') &&
              !d.name.includes('麵')
            ) {
              this.others.push(push)
            }
          }
        })
        console.log(result)
        console.log(this.setMeals)
      }).catch(err => {
        alert(err.message + ' 伺服器錯誤')
      })
  }
}
</script>
<style>
</style>
