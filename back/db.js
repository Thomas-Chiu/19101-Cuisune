import dotenv from 'dotenv'
import mongoose from 'mongoose'
import beautifyUnique from 'mongoose-beautiful-unique-validation'
import validator from 'validator' // 驗證套件
import idPlugin from 'mongoose-id' // 將 _id 欄位顯示為 id 的套件

dotenv.config()

const Schema = mongoose.Schema
mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false)
mongoose.connect(process.env.DBURL, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.plugin(beautifyUnique) // 自訂unique message 套件
mongoose.plugin(idPlugin) // res 的 _id 改成 id

const userSchema = new Schema( // 定義資料表欄位
  {
    name: { // 欄位名稱
      type: String,
      required: [true, '使用者名稱必填'],
      minlength: [2, '使用者名稱最少 2 個字'],
      maxlength: [20, '使用者名稱最多 20 個字'],
      trim: true
    },
    account: {
      type: String,
      minlength: [4, '帳號必須四個字以上'],
      maxlength: [20, '帳號不超過二十字'],
      unique: '帳號已使用',
      required: [true, '請輸入帳號'],
      trim: true
    },
    password: {
      type: String,
      required: [true, '請輸入密碼'],
      minlength: [4, '密碼必須四個字以上'],
      trim: true
    },
    email: {
      type: String,
      required: [true, '請輸入信箱'],
      trim: true,
      validate: {
        validator (value) { // 使用驗證套件檢查是不是 email
          return validator.isEmail(value)
        },
        message: '信箱格式錯誤'
      }
    },
    admin: {
      type: Boolean,
      required: [true, '請輸入權限 0 or 1']
    }
  }, {
    versionKey: false // 拿掉自動產生的 "__v" (不記錄資料修改次數)
  }
)

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, '請輸入菜名'],
      trim: true
    },
    description: {
      type: String,
      maxlength: [200, '圖文說明 200 字以下']
    },
    price: {
      type: Number,
      required: [true, '請輸入價錢'],
      min: 1
    },
    img: {
      type: String
    }
  }, {
    versionKey: false
  }
)

const orderSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, '請輸入訂購人姓名'],
      trim: true
    },
    gender: {
      type: String,
      required: [true, '請選擇性別']
    },
    mobile: {
      type: String,
      required: [true, '請輸入電話號碼']
    },
    togo: {
      type: String,
      required: [true, '請選擇內用或外帶']
    },
    orderDate: {
      type: Date,
      required: [true, '請選擇取餐日期']
    },
    pickupTime: {
      type: String,
      required: [true, '請選擇取餐時間']
    },
    items: {
      type: Array,
      required: [true, '請選擇餐點和數量'],
      min: 1,
      max: 100
    },
    memo: {
      type: String,
      maxlength: [30, '備註 30 字以內']
    }
  }, {
    versionKey: false
  }
)

const bookingSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, '請輸入訂位人姓名']
    },
    gender: {
      type: String,
      required: [true, '請選擇性別']
    },
    date: {
      type: Date,
      required: [true, '請選擇訂位日期']
    },
    time: {
      type: String,
      required: [true, '請選擇訂位時間']
    },
    people: {
      type: Number,
      required: [true, '請選擇訂位人數']
    },
    mobile: {
      type: String,
      required: [true, '請輸入電話號碼']
    }
  }, {
    versionKey: false
  }
)

const users = mongoose.model(process.env.COLLECTION_USERS, userSchema)
const products = mongoose.model(process.env.COLLECTION_PRODUCTS, productSchema)
const orders = mongoose.model(process.env.COLLECTION_ORDERS, orderSchema)
const bookings = mongoose.model(process.env.COLLECTION_BOOKINGS, bookingSchema)
const connection = mongoose.connection

export default {
  users,
  products,
  orders,
  bookings,
  connection
}
