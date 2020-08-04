<template lang="pug">
  #product
    //- 新增商品
    card
      p-button.btn-confirm(v-if="toggleAdd" type="success" style='margin-left: 10px;' @click.native="handleConfirm") 確認
      p-button.btn-add-cancel(v-if="toggleAdd" type="danger" style='margin-left: 10px;' @click.native="handleAddCancel") 取消
      p-button.btn-add(v-else type="warning" @click.native="handleAdd") 新增商品
      b-row(v-if="toggleAdd")
        b-col(cols="12")
          b-alert(variant="warning" show) 圖檔限制 5 MB 以下 / 可不上傳圖檔 / 金額不能為 0 / 商品說明最多 200 字
        b-col(md="4")
          b-file(
            v-model="addModel.img"
            placeholder="選擇檔案或拖曳至此"
            drop-placeholder="將檔案拖曳至此"
            browse-text="瀏覽"
            accept="image/*"
          )
        b-col(md="8")
          fg-input(v-model="addModel.name" placeholder="商品名稱")
          fg-input(v-model="addModel.price" placeholder="商品金額")
          b-textarea(v-model="addModel.description" placeholder="商品說明")
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
    //- 單點類
    card(:title="cardTitles[4]")
      b-card(no-body v-for="(item, index) in aLaCartes" :key="index")
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
    //- 預購類
    card(:title="cardTitles[5]")
      b-card(no-body v-for="(item, index) in preOrders" :key="index")
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
      cardTitles: ['猴頭菇套餐', '火鍋類', '飯類', '麵類', '單點類', '預購類'],
      setMeals: [],
      hotPots: [],
      rices: [],
      noodles: [],
      aLaCartes: [],
      preOrders: [],
      model: [
        {
          name: '',
          price: '',
          description: ''
        }
      ],
      addModel: [
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
      this.addModel.name = ''
      this.addModel.price = ''
      this.addModel.description = ''
      this.addModel.img = null
      this.toggleAdd = true
    },
    handleAddCancel () { // 取消新增
      console.log(this.addModel)
      this.toggleAdd = false
    },
    handleConfirm () { // 確認
      event.preventDefault()
      if (this.addModel.img !== null) { // 有圖商品
        if (this.addModel.price <= 0 ||
          this.addModel.img.size >= 1024 * 1024 * 5 ||
          !this.addModel.img.type.includes('image')) alert('檔案格式不符')
        else {
          const fd = new FormData()
          fd.append('img', this.addModel.img)
          fd.append('name', this.addModel.name)
          fd.append('price', this.addModel.price)
          fd.append('description', this.addModel.description)
          this.axios.post(process.env.VUE_APP_APIURL + '/imgproduct', fd, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
            .then(res => {
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
            })
            .catch(err => {
              alert(err.message)
              console.log(err)
            })
        }
      } else { // 無圖商品
        if (this.addModel.price <= 0) alert('檔案格式不符')
        else {
          this.axios.post(process.env.VUE_APP_APIURL + '/product', {
            name: this.addModel.name,
            price: this.addModel.price,
            description: this.addModel.description,
            img: 'http://220.128.133.15/s1090105/19101-cuisine/1596459193608.png' // 尚無照片網址
          })
            .then(res => {
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
            })
            .catch(err => {
              alert(err.message)
              console.log(err)
            })
        }
      }
      this.toggleAdd = false
    },
    handleEdit (item) { // 編輯
      this.model.name = item.name
      this.model.price = item.price
      this.model.description = item.description
      item.edit = true
    },
    handleDelete (item) { // 刪除
      event.preventDefault()
      const warning = confirm('確定要刪除？')
      if (!warning) return
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
          } if (d.name.includes('預購')) {
            this.preOrders.push(push)
          } if (
            !d.name.includes('猴頭菇套餐') &&
            !d.name.includes('火鍋') &&
            !d.name.includes('飯') &&
            !d.name.includes('麵') &&
            !d.name.includes('預購')
          ) {
            this.aLaCartes.push(push)
          }
        })
      }).catch(err => {
        alert(err.message + ' 伺服器錯誤')
      })
  }
}
</script>
