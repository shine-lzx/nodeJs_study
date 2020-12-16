var express = require('express')
var router = express.Router()
const { login } = require('../controller/user')
var db = require('../conf/db')

router.post('/login', async (req, res, next) => {
  const { account, password } = req.body
  const userData = await login(account, password)
  res.send(userData)
})

// let _sql = 'SELECT * FROM WHERE account="wdy" and password="123123" v_user order by createTime desc'
let _sql = 'SELECT * FROM v_user order by createTime desc'
router.get('/userList', (req, res, next) => {
//   console.log('headers: ', req.headers['accept-encoding'])
  db.query(_sql, [], function (results, fields) {
    res.json({ results })
  })
})

module.exports = router
