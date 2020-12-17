var express = require('express')
var router = express.Router()
const { login } = require('../controller/user')
var db = require('../conf/db')

router.post('/login', async (req, res, next) => {
  const { account, password } = req.body
  const userData = await login(account, password)
  res.send(userData)
})

let _sql = 'SELECT * FROM user'
router.get('/userList', (req, res, next) => {
  db.query(_sql, [], function (results, fields) {
    res.json({ code: '00000', data: [...results], msg: '成功' })
  })
})

router.post('/register', (req, res, next) => {
  const { userId, name, gender, weapon } = req.body
  console.log('req.body: ', req.body)
  db.query(
    `INSERT INTO user(userId, name, gender, weapon) VALUES(${userId},${
      name + ''
    },${gender},${weapon + ''})`,
    (err, res) => {
      if (err) throw err
      res.json({ code: '00000', data: 0, msg: '成功' })
    }
  )
})

module.exports = router
