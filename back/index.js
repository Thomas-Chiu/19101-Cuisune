import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import md5 from 'md5'
// import multer from 'multer' // 處理上傳的檔案
// import FTPStorage from 'multer-ftp' // 將上傳的檔案丟到FTP
// import path from 'path' // path 為node.js 內建套件，可處理路徑資訊
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

// 監聽server 區 ---------------------------------------------------------------------------
app.listen(process.env.PORT, () => {
  console.log('網頁伺服器已開啟')
  console.log('http://localhost:3000')
})

// API Post 新增區 --------------------------------------------------------------------------------
app.post('/signup', async (req, res) => { // 新增使用者帳戶
  if (req.headers['content-type'] !== 'application/json') {
    res.status(400).send({ success: false, message: '請用json 格式' })
    return
  } if (
    req.body.name === undefined ||
    req.body.account === undefined ||
    req.body.password === undefined ||
    req.body.email === undefined
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
        email: req.body.email
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

app.post('/signin', async (req, res) => { // 登入驗證
  if (req.headers['content-type'] !== 'application/json') {
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

app.post('/product', async (req, res) => { // 新增菜單商品
  if (req.headers['content-type'] !== 'application/json') {
    res.status(400).send({ success: false, message: '請用json 格式' })
    return
  } if (
    req.body.name === undefined ||
    req.body.price < 1 ||
    req.body.description === undefined ||
    req.body.sauce === undefined ||
    req.body.drink === undefined ||
    req.body.mainCourse === undefined ||
    req.body.noodle === undefined
  ) {
    res.status(400).send({ success: false, message: '資料欄位不正確', price: '金額不能為 0' })
    return
  }
  try {
    const result = await db.products.create(
      {
        name: req.body.name,
        amount: req.body.amount,
        price: req.body.price,
        description: req.body.description,
        sauce: req.body.sauce,
        drink: req.body.drink,
        mainCourse: req.body.mainCourse,
        noodle: req.body.noodle
      }
    )
    res.status(200).send({ success: true, result })
  } catch (err) {
    res.status(400).send({ success: false, message: err.message })
  }
})

app.post('/order', async (req, res) => { // 新增點餐訂單
  if (req.headers['content-type'] !== 'application/json') {
    res.status(400).send({ success: false, message: '請用json 格式' })
    return
  } if (
    req.body.name === undefined ||
    req.body.male === undefined ||
    req.body.mobile === undefined ||
    req.body.amount < 1 ||
    req.body.amount > 100 ||
    req.body.here === undefined ||
    req.body.pickupTime === undefined ||
    req.body.items === undefined ||
    req.body.memo === undefined
  ) {
    res.status(400).send({ success: false, message: '資料欄位不正確', amount: '數量最少 1，最多 100' })
    return
  }
  try {
    const result = await db.orders.create(
      {
        name: req.body.name,
        male: req.body.male,
        mobile: req.body.mobile,
        amount: req.body.amount,
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
// API Patch 修改區 --------------------------------------------------------------------------------

// API Delete 刪除區 --------------------------------------------------------------------------------
app.delete('/signout', async (req, res) => { // 登出刪除session
  req.session.destroy((err) => {
    if (err) res.status(500).send({ success: false, message: '伺服器錯誤' })
    else res.clearCookie().status(200).send({ success: true, message: '登出成功' })
  })
})

app.delete('/cancelOrder', async (req, res) => { // 刪除點餐訂單
  if (req.headers['content-type'] !== 'application/json') {
    res.status(400).send({ success: false, message: '請用json 格式' })
    return
  }
  try {
    const result = await db.orders.findByIdAndDelete(req.body.id)
    if (result === null) res.status(404).send({ success: false, message: '找不到訂單刪除' })
    else res.status(200).send({ success: true, message: '訂單刪除成功', result })
  } catch (err) {
    res.status(400).send(err.message)
  }
})

// API Get 查詢區 --------------------------------------------------------------------------------
app.get('/heartbeat', async (req, res) => { // 維持前端登入狀態
  let isSignin = false
  if (req.session.user !== undefined) isSignin = true
  res.status(200).send(isSignin)
})
