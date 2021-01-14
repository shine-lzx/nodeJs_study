var express = require('express')
var router = express.Router()
var cheerio = require('cheerio')
var superagent = require('superagent')

router.get('/getPageInfo', function (req, res, next) {
  const { reptileUrl } = req.query
  if (reptileUrl) {
    superagent.get(reptileUrl).end(function (err, sres) {
      if (err) {
        return next(err)
      }
      var $ = cheerio.load(sres.text)
      var items = [{ vhtml: sres.text }]
      //   $('#api_selector div').each(function (idx, element) {
      //     var $element = $(element)
      //     items.push({
      //       title: $element.attr('title'),
      //       href: $element.attr('href'),
      //     })
      //   })
      res.send(items)
    })
  } else {
    throw '请输入网址'
  }
})

module.exports = router
