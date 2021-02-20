const express = require('express')
const router = express.Router()
const { login, register } = require('../controller/user')
const db = require('../conf/db')
const { v4: uuidv4 } = require('uuid')
const { Succeed, Failed } = require('../model/resModel')
const { readFileFun } = require('../utils/readFile')
const path = require('path')
const fs = require('fs')

var cheerio = require('cheerio')
var request = require('request')
var iconv = require('iconv-lite')

// let aaa = readFileFun(path.join(__dirname, '../static/images'))
// console.log('aaa: ', aaa)

router.post('/login', async (req, res, next) => {
  const { phone, password } = req.body
  const userInfo = await login(phone, password)
  console.log('userInfo: ', userInfo)

  if (userInfo && userInfo.length) {
    res.send(
      new Succeed({
        data: userInfo,
      })
    )
  } else {
    res.send(new Failed(null, null, '账号或密码错误'))
  }
})

router.post('/register', async (req, res, next) => {
  let userId = uuidv4()
  let result = await register({ userId, ...req.body })
  console.log('result: ', result)
  if (result) {
    res.send(
      new Succeed({
        data: result,
      })
    )
  } else {
    res.send(new Failed(null, null, '注册失败'))
  }
})

let _sql = 'SELECT * FROM user'
router.get('/userList', (req, res, next) => {
  db.query(_sql, [], function (results, fields) {
    try {
      res.send(
        new Succeed({
          data: results,
        })
      )
    } catch (error) {
      res.send(new Failed(results, null, error))
    }
    return res.end('数据库连接成功')
  })
})

router.post('/deleteFile', (req, res, next) => {
  // const filePath = 'http://localhost:3000/static/images/bhz.jpg'

  // try {
  //   res.send(
  //     new Succeed({
  //       data: filePath,
  //     })
  //   )
  // } catch (error) {
  //   res.send(new Failed(null, null, error))
  // }

  const filePath = path.resolve(__dirname, `../static/images/shy.png`)
  const cs = fs.createReadStream(filePath)

  cs.on('data', (chunk) => {
    let base64Image = chunk.toString('base64')

    try {
      res.send(
        new Succeed({
          data: 'data:image/png;base64,' + base64Image,
        })
      )
    } catch (error) {
      console.log('error: ', error)
    }
  })

  cs.on('end', () => {
    res.end()
  })

  // fs.unlink('F:/projectFile/nodeJs_study/static/test.txt', (err) => {
  //   try {
  //     res.send(
  //       new Succeed({
  //         data: 1,
  //       })
  //     )
  //   } catch (error) {
  //     res.send(new Failed('删除失败', null, error))
  //   }
  // })
  // fs.rename(
  //   'F:/projectFile/nodeJs_study/static/test.txt',
  //   'F:/projectFile/nodeJs_study/static/test_one.txt',
  //   (err) => {
  //     if (err) throw err
  //     console.log('重命名完成')
  //   }
  // )
  // fs.stat('新文件', (err, stats) => {
  //   if (err) throw err
  //   console.log(`文件属性: ${JSON.stringify(stats)}`)
  // })
})

const getWeather = () => {
  let url = 'http://wthrcdn.etouch.cn/weather_mini?citykey=101190905'
  request({ url, encoding: null }, (err, response, body) => {
    let data = iconv.decode(body, 'utf-8')
    console.log(data)
  })
}

router.get('/getWeather', (req, res, err) => {
  getWeather()
  res.json({ data: '666' })
})

module.exports = router
