import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
// import multer from 'multer' // 處理上傳的檔案
// import FTPStorage from 'multer-ftp' // 將上傳的檔案丟到FTP
// import md5 from 'md5'
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
  secret: 'album',
  store: new MongoStore({ // 將session 存進mongoDB
    mongooseConnection: db.connection, // 使用mongoose 的資料庫連接
    collection: process.env.COLLECTION_SESSION // 設定存入的collection
  }),
  cookie: { // 設定session 有效期間
    maxAge: 1000 * 60 * 30 // 1000ms * 60s * 30m = 30分鐘
  },
  saveUninitialized: false, // 是否保存未修改的session
  rolling: true, // 是否每次重設過期時間
  resave: true
}))

// 監聽server 區 ---------------------------------------------------------------------------
app.listen(process.env.PORT, () => {
  console.log('http://localhost:3000')
  console.log('SERVER IS ON!!!')
})

// API 區 --------------------------------------------------------------------------------
app.get('/', (req, res) => {
  res.status(200).send(
    {
      key: 'value'
    }
  )
})
