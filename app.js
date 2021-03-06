let createError = require('http-errors')
let express = require('express')
let path = require('path')
let cookieParser = require('cookie-parser')
let bodyParser = require('body-parser') /*post方法*/
let logger = require('morgan')
let indexRouter = require('./routes/index')
let usersRouter = require('./routes/users')
let loginRouter = require('./routes/login')
let pcRouter = require('./routes/pc')
let homeRouter = require('./routes/home')
let app = express()
// let autoroute = require('express-autoroute')

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
app.use('/pc', pcRouter)
app.use('/homePage', homeRouter)

// 托管静态文件
app.use('/static', express.static(path.join(__dirname, 'static')))
// autoroute(app, options) //where app is an express app;
// autoroute(app, {
//   throwErrors: false,
//   logger: require('winston'),
//   routesDir: 'routes',
// })

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
