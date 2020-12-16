var express = require('express')
var router = express.Router()
const { login } = require('../controller/user')
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource')
})

router.get('/personInfo', function (req, res, next) {
  res.json({
    userId: '123456789',
    name: 'shine-lzx',
    gender: 2,
  })
})

module.exports = router
