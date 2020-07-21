import dotenv from 'dotenv'
import mongoose from 'mongoose'
import beautifyUnique from 'mongoose-beautiful-unique-validation'
import validator from 'validator' // 驗證套件

dotenv.config()

const Schema = mongoose.Schema
mongoose.connect(process.env.DBURL)
mongoose.plugin(beautifyUnique)

const userSchema = new Schema(
  {
    account: {
      type: String,
      minlength: [4, '帳號必須四個字以上'],
      maxlength: [20, '帳號不超過二十字'],
      unique: '帳號已使用',
      required: [true, '請輸入帳號']
    },
    password: {
      type: String,
      required: [true, '請輸入密碼']
    },
    email: {
      type: String,
      required: [true, '請輸入信箱'],
      validate: {
        validator (value) {
          return validator.isEmail(value)
        },
        message: '信箱格式錯誤'
      }
    }
  }, {
    versionKey: false
  }
)

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, '請輸入菜名']
    },
    amount: {
      type: Number,
      required: [true, '請輸入數量']
    },
    price: {
      type: Number,
      required: [true, '請輸入價錢']
    },
    description: {
      type: String,
      maxlength: [200, '圖文說明 200 字以下']
    },
    sauce: {
      type: String
    },
    drink: {
      type: String
    },
    mainCourse: {
      type: String
    },
    noodle: {
      type: String
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
      required: [true, '請輸入訂購人姓名']
    },
    gender: {
      type: Boolean
    },
    mobile: {
      type: Number,
      required: [true, '請輸入電話號碼']
    },
    here: {
      type: Boolean,
      required: [true, '請選擇內用或外帶']
    },
    pickupTime: {
      type: String
    },
    memo: {
      type: String
    }
  }, {
    versionKey: false
  }
)

const fileSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, '請輸入檔案名稱']
    },
    description: {
      type: String,
      maxlength: [100, '圖文說明 100 字以下']
    }
  }
)

const users = mongoose.model(process.env.COLLECTION_USERS, userSchema)
const products = mongoose.model(process.env.COLLECTION_PRODUCTS, productSchema)
const orders = mongoose.model(process.env.COLLECTION_ORDERS, orderSchema)
const files = mongoose.model(process.env.COLLECTION_FILES, fileSchema)
const connection = mongoose.connection

export default {
  users,
  products,
  orders,
  files,
  connection
}
