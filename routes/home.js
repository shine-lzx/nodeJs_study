const express = require('express')
const router = express.Router()
const { Succeed, Failed } = require('../model/resModel')
const { ranking } = require('../controller/home')
const db = require('../conf/db')

// 首页banner图
router.post('/getBanner', (req, res, next) => {
  const filePath = 'http://localhost:3000/static/images/homeBg.png'
  try {
    res.send(
      new Succeed({
        data: filePath,
      })
    )
  } catch (error) {
    res.send(new Failed(null, null, error))
  }
})

// 排行榜
router.post('/getRankingList', (req, res, next) => {
  let _sql = 'SELECT * FROM ranking'
  const { type } = req.query

  db.query(_sql, [], function (results, fields) {
    let newData = []
    if (type === '1') {
      newData = results.splice(1, 3).map((item) => {
        return {
          ...item,
          shopPic: `http://192.168.200.110:3000/static/images/${item.shopPic}`,
        }
      })
    } else {
      newData = results.map((item) => {
        return {
          ...item,
          shopPic: `http://192.168.200.110:3000/static/images/${item.shopPic}`,
        }
      })
    }

    try {
      res.send(
        new Succeed({
          data: newData,
        })
      )
    } catch (error) {
      res.send(new Failed(results, null, error))
    }
    return res.end('数据库连接成功')
  })
})

module.exports = router
