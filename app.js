var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var livereload = require('livereload')
var connectLiveReload = require('connect-livereload')
var cors = require('cors')

const liveReloadServer = livereload.createServer()

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/")
  }, 100)
})

var defaultRouter = require('./routes/default')
var usersGetRouter = require('./routes/users/usersGet')
var usersAddRouter = require('./routes/users/usersAdd')
var usersAddDocsRouter = require('./routes/users/usersAddDocs')
var usersRemoveRouter = require('./routes/users/usersRemove')
var usersAddBorth = require('./routes/users/usersAddBorth')

var authGetRouter = require('./routes/auth/authGet')
var authAddRouter = require('./routes/auth/authAdd')
var authCheckReg = require('./routes/auth/authCheckReg')

var taskAddRouter = require('./routes/tasks/taskAdd')
var taskGetRouter = require('./routes/tasks/taskGet')
var taskGetListRouter = require('./routes/tasks/taskGetList')
var taskActiveChangeRouter = require('./routes/tasks/taskActiveChange')

var respondAddRouter = require('./routes/tasks/respondAdd')
var respondRemoveRouter = require('./routes/tasks/respondRemove')
var respondRemoveOneRouter = require('./routes/tasks/respondRemoveOne')
var executorAddRouter = require('./routes/tasks/executorAdd')

var alarmsAddRouter = require('./routes/dataAlarms/alarmAdd')
var addFileTechTask = require('./routes/filesystem/addFile.techtask')

var checkFaceName = require('./routes/checkFaceName')

var app = express()

app.use(connectLiveReload())

// app.set('views', path.join(__dirname, 'views'))
// app.set('view engine', 'jade')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors({ origin: true, credentials: true }))

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Credentials', true)
  res.header('Access-Control-Allow-Origin', req.headers.origin)
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.header('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token, Authorization')
  if (req.method === "OPTIONS") {
    
    return res.status(200).end()
  
  } else { next() }
})

app.use('/', defaultRouter)

app.use('/users', usersGetRouter)
app.use('/add-user', usersAddRouter)
app.use('/add-user-docs', usersAddDocsRouter)
app.use('/add-user-borth', usersAddBorth)
app.use('/remove-user', usersRemoveRouter)

app.use('/auth', authGetRouter)
app.use('/add-auth', authAddRouter)
app.use('/check-auth', authCheckReg)

app.use('/add-task', taskAddRouter)
app.use('/get-task', taskGetRouter)
app.use('/get-task-list', taskGetListRouter)
app.use('/change-task-status', taskActiveChangeRouter)

app.use('/add-respond', respondAddRouter)
app.use('/add-executor-in-task', executorAddRouter)
app.use('/remove-respond-one', respondRemoveOneRouter)
app.use('/remove-respond', respondRemoveRouter)

app.use('/add-alarm-in-task', alarmsAddRouter)

app.use('/add-file-techtask', addFileTechTask)

app.use('/check-face', checkFaceName)

app.use(function(req, res, next) {
  false && console.log(req)
  false && console.log(res)
  next(createError(404))
})

app.use(function(err, req, res, next) {
  false && console.log(next)
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  res.status(err.status || 500)
  res.send(err.message)
});

module.exports = app
