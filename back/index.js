import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import md5 from 'md5'
// 處理上傳的檔案
import multer from 'multer'
import FTPStorage from 'multer-ftp' // 將上傳的檔案丟到FTP
import path from 'path' // path 為node.js 內建套件，可處理路徑資訊
// import fs from 'fs' // fs 為node.js 內建套件，可處理檔案系統
import dotenv from 'dotenv'
import connectMongo from 'connect-mongo'
import session from 'express-session'

import db from './db.js'

dotenv.config()

// 套件設定區 ---------------------------------------------------------------------------
const MongoStore = connectMongo(session)
const app = express()

app.use(bodyParser.json())

app.use(cors({ // cors 跨網域設定
  origin (origin, callback) { // 直接開網頁，不是ajax 時，origin 是undefined
    if (origin === undefined) {
      callback(null, true)
    } else {
      if (process.env.ALLOW_CORS === 'true') { // 上傳FTP 時，dot.env 不知為何將bool 視為字串，因此判斷式的bool 改成字串
        callback(null, true) // 若開發環境，允許
      } else if (origin.includes('github')) {
        callback(null, true) // 非開發環境，但從github 過來，允許
      } else {
        callback(new Error('Not Allowed'), false) // 非開發環境也非github 過來，拒絕
      }
    }
  },
  credentials: true
}))

app.use(session({ // express-session 設定
  secret: '19101',
  store: new MongoStore({ // 將session 存進mongoDB
    mongooseConnection: db.connection, // 使用mongoose 的資料庫連接
    collection: process.env.COLLECTION_SESSION // 設定存入的collection
  }),
  cookie: { // session 有效期間
    maxAge: 1000 * 60 * 30 // 1000ms * 60s * 30m = 30分鐘
  },
  saveUninitialized: false, // 保存未修改的session
  rolling: true, // 重設過期時間
  resave: true
}))

let storage // 宣告stroage 變數，根據.env 環境決定storage 存放的位置
if (process.env.FTP === 'false') {
  storage = multer.diskStorage({ // 將上傳檔案放本機
    destination (req, file, cb) {
      cb(null, 'images/') // 傳到images 資料夾
    },
    filename (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname))
    }
  })
} else {
  storage = new FTPStorage({ // 將上傳檔案放FTP
    basepath: '/19101-cuisine/', // 設定根路徑
    ftp: { // FTP 設定 (寫在.env 裡)
      host: process.env.FTP_HOST,
      secure: false,
      user: process.env.FTP_USER,
      password: process.env.FTP_PASSWORD
    },
    destination (req, file, options, cb) {
      cb(null, options.basepath + Date.now() + path.extname(file.originalname))
    }
  })
}

const upload = multer({ // multer 設定
  storage,
  fileFilter (req, file, cb) {
    if (!file.mimetype.includes('image')) { // 觸發multer 錯誤，不接受檔案
      cb(new multer.MulterError('LIMIT_FORMAT'), false) // LIMIT_FORMAT 是自訂的錯誤CODE，跟內建的錯誤CODE 格式統一
    } else {
      cb(null, true)
    }
  },
  limits: {
    fileSize: (1024 * 1024) * 5 // 5MB上限
  }
})

// 監聽server 區 ---------------------------------------------------------------------------
app.listen(process.env.PORT, () => {
  console.log('網頁伺服器已開啟')
  console.log('http://localhost:3000')
})

// API Post 新增區 --------------------------------------------------------------------------------
app.post('/signin', async (req, res) => { // 登入驗證
  if (!req.headers['content-type'].includes('application/json')) {
    res.status(400).send({ success: false, message: '請用json 格式' })
    return
  }
  try {
    const result = await db.users.find(
      {
        account: req.body.account,
        password: md5(req.body.password)
      }
    )
    if (result.length > 0) { // result.find 是陣列
      req.session.user = result[0].account
      res.status(200).send({ success: true, result })
    } else {
      res.status(404).send({ success: false, message: '帳號密碼錯誤' })
    }
  } catch (err) {
    if (err.name === 'ValidationError') { // 資料驗證錯誤
      const key = Object.keys(err.errors)[0]
      const message = err.errors[key].message
      res.status(400).send({ success: false, message })
    } else res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
})

app.post('/signup', async (req, res) => { // 新增帳戶
  if (!req.headers['content-type'].includes('application/json')) {
    res.status(400).send({ success: false, message: '請用json 格式' })
    return
  } if (
    req.body.name === undefined ||
    req.body.account === undefined ||
    req.body.password === undefined ||
    req.body.email === undefined ||
    req.body.admin === undefined
  ) {
    res.status(400).send({ success: false, message: '資料欄位不正確' })
    return
  }
  try {
    const result = await db.users.create(
      {
        name: req.body.name,
        account: req.body.account,
        password: md5(req.body.password),
        email: req.body.email,
        admin: req.body.admin
      }
    )
    res.status(200).send({ success: true, result })
  } catch (err) {
    if (err.name === 'ValidationError') { // 資料驗證錯誤
      const key = Object.keys(err.errors)[0]
      const msg = err.errors[key].message
      res.status(400).send({ success: false, msg })
    } else res.status(500).send({ success: false, msg: '伺服器錯誤' })
  }
})

app.post('/order', async (req, res) => { // 新增點餐
  if (!req.headers['content-type'].includes('application/json')) {
    res.status(400).send({ success: false, message: '請用json 格式' })
    return
  }
  if (
    req.body.name === undefined ||
    req.body.male === undefined ||
    req.body.mobile === undefined ||
    // req.body.amount < 1 ||
    // req.body.amount > 100 ||
    req.body.here === undefined ||
    req.body.pickupTime === undefined ||
    req.body.items === undefined ||
    req.body.memo === undefined
  ) {
    res.status(400).send({ success: false, message: '資料欄位不正確' })
    return
  }
  for (const i in req.body.items) { // 點餐數量 1~100
    if (
      req.body.items[i].amount < 1 ||
      req.body.items[i].amount > 100
    ) {
      res.status(400).send({ success: false, amount: '點餐數量最少 1，最多 100' })
      return
    }
  }
  try {
    const result = await db.orders.create(
      {
        name: req.body.name,
        male: req.body.male,
        mobile: req.body.mobile,
        // amount: req.body.amount,
        here: req.body.here,
        pickupTime: req.body.pickupTime,
        items: req.body.items,
        memo: req.body.memo
      }
    )
    res.status(200).send({ success: true, result })
  } catch (err) {
    res.status(400).send({ success: false, message: err.message })
  }
})

app.post('/product', async (req, res) => { // 新增文字商品
  if (!req.headers['content-type'].includes('application/json')) {
    res.status(400).send({ success: false, message: '請用json 格式' })
    return
  } if (
    req.body.name === undefined ||
    req.body.price === undefined ||
    req.body.description === undefined
  ) {
    res.status(400).send({ success: false, message: '資料欄位不正確' })
    return
  }
  try {
    const result = await db.products.create(req.body)
    res.status(200).send({ success: true, result })
  } catch (err) {
    res.status(400).send({ success: false, message: err.message })
  }
})

app.post('/imgproduct', async (req, res) => { // 新增圖片商品 (form-data)
  // if (req.session.user === undefined) { // 沒有登入
  //   res.status(401).send({ success: false, message: '未登入' })
  //   return
  // }
  if (!req.headers['content-type'].includes('multipart/form-data')) { // 上傳檔案格式要用form-data
    res.status(400).send({ success: false, message: '請用form-data 格式' })
    return
  }
  upload.single('img')(req, res, async err => {
    if (err instanceof multer.MulterError) { // 處理錯誤 Error handling
      let message = ''
      if (err.code === 'LIMIT_FILE_SIZE') message = '檔案太大'
      else message = '檔案格式不符'
      res.status(400).send({ success: false, message })
    } else if (err) {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    } else {
      try {
        let imgname = ''
        if (process.env.FTP === 'true') { // FTP 上傳時
          imgname = path.basename(req.file.path) // basename() 是 node.js 回傳檔名的內建函式
        } else { // 本機上傳時
          imgname = req.file.filename
        }
        const result = await db.products.create(
          {
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            img: 'http://' + process.env.FTP_HOST + '/' + process.env.FTP_USER + '/19101-cuisine/' + imgname
          }
        )
        res.status(200).send({ success: true, result })
      } catch (err) {
        if (err.name === 'ValidationError') { // 資料格式錯誤
          const key = Object.keys(err.errors)[0]
          const message = err.errors[key].message
          res.status(400).send({ success: false, message })
          console.log('YA')
        } else { // 伺服器錯誤
          console.log(err)
          res.status(500).send({ success: false, message: '伺服器錯誤' })
        }
      }
    }
  })
})

app.post('/booking', async (req, res) => { // 新增訂位
  if (!req.headers['content-type'].includes('application/json')) {
    res.status(400).send({ success: false, message: '請用json 格式' })
    return
  } if (
    req.body.name === undefined ||
    req.body.gender === undefined ||
    req.body.date === undefined ||
    req.body.time === undefined ||
    req.body.people === undefined ||
    req.body.mobile === undefined
  ) {
    res.status(400).send({ success: false, message: '資料欄位不正確', date: 'yyyy-mm-dd', time: '24小時制' })
    return
  }
  try {
    const result = await db.bookings.create(req.body)
    res.status(200).send({ success: true, result })
  } catch (err) {
    res.status(400).send({ success: false, message: err.message })
  }
})

// API Patch 修改區 --------------------------------------------------------------------------------
app.patch('/user', async (req, res) => { // 修改帳戶
  if (!req.headers['content-type'].includes('application/json')) {
    res.status(400).send({ success: false, message: '請用json 格式' })
    return
  }
  try { // 預設用id 搜尋，修改成req.body
    let result = await db.users.findByIdAndUpdate(req.body.id, req.body, { new: true })
    if (result === null) {
      res.status(404).send({ success: false, message: '找不到資料修改' })
      return
    }
    if (req.body.password) { // 修改密碼時，用md5 加密
      result = await db.users.findByIdAndUpdate(req.body.id, { password: md5(req.body.password) }, { new: true })
      res.status(200).send({ success: true, result })
    } else res.status(200).send({ success: true, result })
  } catch (err) {
    if (err.name === 'CastError') res.status(404).send({ success: false, message: err.message }) // 不是mongodb 格式
    else res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
})

app.patch('/order', async (req, res) => { // (id)修改點餐
  if (!req.headers['content-type'].includes('application/json')) {
    res.status(400).send({ success: false, message: '請用json 格式' })
    return
  }
  if (!req.body.id) { // 沒輸入條件
    res.status(400).send({ success: false, message: '請輸入id' })
    return
  }
  try {
    const result = await db.orders.findByIdAndUpdate(req.body.id, req.body, { new: true })
    if (result === null) res.status(404).send({ success: false, message: '找不到資料修改' })
    else res.status(200).send({ success: true, result })
  } catch (err) {
    if (err.name === 'CastError') res.status(404).send({ success: false, message: err.message }) // 不是mongodb 格式
    else res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
})

app.patch('/product', async (req, res) => { // (name/ id)修改商品
  if (!req.headers['content-type'].includes('application/json')) {
    res.status(400).send({ success: false, message: '請用json 格式' })
    return
  }
  if (req.body.price < 1) { // 商品金額不為0
    res.status(400).send({ success: false, message: '商品金額不為 0' })
    return
  }
  if (!req.body.name && !req.body.id) { // 沒輸入條件
    res.status(400).send({ success: false, message: '請輸入id 或 name' })
    return
  }
  try { // 預設用name 搜尋修改
    let result = await db.products.findOneAndUpdate(req.body.name, req.body, { new: true })
    if (req.body.id) { // 有id 時才用id 搜尋
      result = await db.products.findByIdAndUpdate(req.body.id, req.body, { new: true })
      res.status(200).send({ success: true, result })
    } else res.status(200).send({ success: true, result })
  } catch (err) {
    if (err.name === 'CastError') res.status(404).send({ success: false, message: err.message }) // 不是mongodb 格式
    else res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
})

app.patch('/booking', async (req, res) => { // (id)修改訂位
  if (!req.headers['content-type'].includes('application/json')) {
    res.status(400).send({ success: false, message: '請用json 格式' })
    return
  }
  if (!req.body.id) { // 沒輸入條件
    res.status(400).send({ success: false, message: '請輸入id' })
    return
  }
  try {
    const result = await db.bookings.findByIdAndUpdate(req.body.id, req.body, { new: true })
    if (result === null) res.status(404).send({ success: false, message: '找不到資料修改' })
    else res.status(200).send({ success: true, result })
  } catch (err) {
    if (err.name === 'CastError') res.status(404).send({ success: false, message: err.message }) // 不是mongodb 格式
    else res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
})

// API Delete 刪除區 --------------------------------------------------------------------------------
app.delete('/signout', async (req, res) => { // 登出刪除session
  req.session.destroy((err) => {
    if (err) res.status(500).send({ success: false, message: '伺服器錯誤' })
    else res.clearCookie().status(200).send({ success: true, message: '登出成功' })
  })
})

app.delete('/user', async (req, res) => { // 刪除帳戶
  if (!req.headers['content-type'].includes('application/json')) {
    res.status(400).send({ success: false, message: '請用json 格式' })
    return
  }
  try {
    const result = await db.users.findOneAndDelete({ _id: req.body.id })
    if (result === null) res.status(404).send({ success: false, message: '找不到帳號刪除' })
    else res.status(200).send({ success: true, result })
  } catch (err) {
    if (err.name === 'CastError') res.status(404).send({ success: false, message: err.message }) // 不是mongodb 格式
    else res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
})

app.delete('/order', async (req, res) => { // (id)刪除點餐
  if (!req.headers['content-type'].includes('application/json')) {
    res.status(400).send({ success: false, message: '請用json 格式' })
    return
  }
  try {
    const result = await db.orders.findByIdAndDelete(req.body.id)
    if (result === null) res.status(404).send({ success: false, message: '找不到訂單刪除' })
    else res.status(200).send({ success: true, result })
  } catch (err) {
    if (err.name === 'CastError') res.status(404).send({ success: false, message: err.message }) // 不是mongodb 格式
    else res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
})

app.delete('/product', async (req, res) => { // (name)刪除商品
  if (!req.headers['content-type'].includes('application/json')) {
    res.status(400).send({ success: false, message: '請用json 格式' })
    return
  }
  try {
    const result = await db.products.findOneAndDelete({ name: req.body.name })
    if (result === null) res.status(404).send({ success: false, message: '找不到商品刪除' })
    else res.send({ success: true, result })
  } catch (err) {
    if (err.name === 'CastError') res.status(404).send({ success: false, message: err.message }) // 不是mongodb 格式
    else res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
})

app.delete('/booking', async (req, res) => { // (id)刪除訂位
  if (!req.headers['content-type'].includes('application/json')) {
    res.status(400).send({ success: false, message: '請用json 格式' })
    return
  }
  try {
    const result = await db.bookings.findByIdAndDelete(req.body.id)
    if (result === null) res.status(404).send({ success: false, message: '找不到訂位資料刪除' })
    else res.status(200).send({ success: true, result })
  } catch (err) {
    if (err.name === 'CastError') res.status(404).send({ success: false, message: err.message }) // 不是mongodb 格式
    else res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
})

// API Get 查詢區 --------------------------------------------------------------------------------
app.get('/heartbeat', async (req, res) => { // 維持前端登入狀態
  let isSignin = false
  if (req.session.user !== undefined) isSignin = true
  res.status(200).send(isSignin)
})

app.get('/user', async (req, res) => { // 查詢帳戶
  // if (req.session.user === undefined) { // 檢查登入狀態
  //   res.status(401).send({ success: false, message: '未登入' })
  //   return
  // }
  try {
    let result = await db.users.find() // 預設查詢所有資料
    if (req.query.id) { // id 查詢
      result = await db.users.find({ _id: req.query.id })
      res.status(200).send(result)
      return
    }
    if (req.query.name) { // name 查詢
      result = await db.users.find({ name: req.query.name })
      res.status(200).send(result)
      return
    } else {
      res.status(200).send({ success: true, result })
    }
  } catch (err) {
    res.status(404).send({ success: false, message: '找不到使用者' })
  }
})

app.get('/order', async (req, res) => { // 查詢點餐
  // if (req.session.user === undefined) { // 檢查登入狀態
  //   res.status(401).send({ success: false, message: '未登入' })
  //   return
  // }
  try {
    let result = await db.orders.find() // 預設查詢所有資料
    if (req.query.id) { // id 查詢
      result = await db.orders.find({ _id: req.query.id })
      res.status(200).send(result)
      return
    }
    if (req.query.name) { // name 查詢
      result = await db.orders.find({ name: req.query.name })
      res.status(200).send(result)
      return
    } else {
      res.status(200).send({ success: true, result })
    }
  } catch (err) {
    res.status(404).send({ success: false, message: '找不到訂單' })
  }
})

app.get('/product', async (req, res) => { // 查詢商品
  // if (req.session.user === undefined) { // 檢查登入狀態
  //   res.status(401).send({ success: false, message: '未登入' })
  //   return
  // }
  try {
    let result = await db.products.find() // 預設查詢所有資料
    if (req.query.id) { // id 查詢
      result = await db.products.find({ _id: req.query.id })
      res.status(200).send(result)
      return
    }
    if (req.query.name) { // name 查詢
      result = await db.products.find({ name: req.query.name })
      res.status(200).send(result)
      return
    } else {
      res.status(200).send({ success: true, result })
    }
  } catch (err) {
    res.status(404).send({ success: false, message: '找不到訂單' })
  }
})

app.get('/booking', async (req, res) => { // 查詢訂位
  // if (req.session.user === undefined) { // 檢查登入狀態
  //   res.status(401).send({ success: false, message: '未登入' })
  //   return
  // }
  try {
    let result = await db.bookings.find() // 預設查詢所有資料
    if (req.query.id) { // id 查詢
      result = await db.bookings.find({ _id: req.query.id })
      res.status(200).send({ success: true, result })
      return
    }
    if (req.query.name) { // name 查詢
      result = await db.bookings.find({ name: req.query.name })
      res.status(200).send({ success: true, result })
      return
    } else {
      res.status(200).send({ success: true, result })
    }
  } catch (err) {
    res.status(404).send({ success: false, message: '找不到訂單' })
  }
})
