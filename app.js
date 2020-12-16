var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser') /*post方法*/
var logger = require('morgan')
var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')
let loginRouter = require('./routes/login')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
// app.set('view engine', 'ejs');
// 可以识别html文件
app.engine('.html', require('ejs').__express)
app.set('view engine', 'html')

app.use(logger('dev'))
app.use(express.json())
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/app', usersRouter)
app.use('/appLogin', loginRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
