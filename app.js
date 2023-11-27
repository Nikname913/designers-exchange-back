var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var livereload = require('livereload')
var connectLiveReload = require('connect-livereload')
var bodyParser = require('body-parser')
var cors = require('cors')
var multer = require('multer')

const liveReloadServer = livereload.createServer()

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/")
  }, 100)
})

var defaultRouter = require('./routes/default')
var appDataPage = require('./routes/admin/appData')
var appTasksPage = require('./routes/admin/appTasks')
var appSupportPage = require('./routes/admin/appSupport')
var appOnlinePage = require('./routes/admin/appOnline')
var appApiMethods = require('./routes/admin/appApiMethods')
var sendSupportMessage = require('./routes/admin/messageSupport')
var ping = require('./routes/admin/usersPing')

// ----------------------------------------
// ----------------------------------------

var usersGetRouter = require('./routes/users/usersGet')
var usersAddRouter = require('./routes/users/usersAdd')
var usersAddDocsRouter = require('./routes/users/usersAddDocs')
var usersAddCompanyRouter = require('./routes/users/usersAddCompany')
var usersRemoveRouter = require('./routes/users/usersRemove')
var usersAddBorth = require('./routes/users/usersAddBorth')
var usersAddCase = require('./routes/users/usersAddCase')
var usersAddEducation = require('./routes/users/usersAddEducation')
var usersAddSkill = require('./routes/users/usersAddSkill')
var usersChangeAvatar = require('./routes/users/usersChangeAvatar')
var usersChangeSpec = require('./routes/users/usersChangeSpec')
var usersChangeAbout = require('./routes/users/usersChangeAbout')

var authGetRouter = require('./routes/auth/authGet')
var authAddRouter = require('./routes/auth/authAdd')
var authCheckReg = require('./routes/auth/authCheckReg')
var authRestorePassword = require('./routes/auth/authRestorePassword')

var taskAddRouter = require('./routes/tasks/taskAdd')
var taskEditRouter = require('./routes/tasks/taskEdit')
var taskGetRouter = require('./routes/tasks/taskGet')
var taskGetListRouter = require('./routes/tasks/taskGetList')
var taskActiveChangeRouter = require('./routes/tasks/taskActiveChange')

var respondAddRouter = require('./routes/tasks/respondAdd')
var respondRemoveRouter = require('./routes/tasks/respondRemove')
var respondRemoveOneRouter = require('./routes/tasks/respondRemoveOne')
var executorAddRouter = require('./routes/tasks/executorAdd')
var orderCompleteRouter = require('./routes/tasks/orderComplete')

var alarmsAddRouter = require('./routes/dataAlarms/alarmAdd')
var alarmsSystemAddRouter = require('./routes/dataAlarms/alarmSystemAdd')
var alarmsSystemRemoveRouter = require('./routes/dataAlarms/alarmSystemRemove')

var addFileTechTask = require('./routes/filesystem/addFile.techtask')
var addFileOrderContract = require('./routes/filesystem/addFile.contract')
var addFileOrderComplete = require('./routes/filesystem/addFile.complete')
var addFileCase = require('./routes/filesystem/addFile.portfolio')
var sendFileTechTask = require('./routes/filesystem/sendFile.techtask')
var sendFileContract = require('./routes/filesystem/sendFile.contract')
var sendFileComplete = require('./routes/filesystem/sendFile.complete')
var userAvatarFile = require('./routes/filesystem/addFile.avatar')

var checkFaceName = require('./routes/checkFaceName')

var app = express()

app.use(connectLiveReload())

// app.set('views', path.join(__dirname, 'views'))
// app.set('view engine', 'jade')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
// ----------------------------------------
// app.use(bodyParser.json())
// ----------------------------------------
// app.use(express.static(path.join(__dirname, 'public')))
// ----------------------------------------
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

// ----------------------------------------
// ----------------------------------------

app.use('/', defaultRouter)
app.use('/8000/support', appSupportPage)
app.use('/8000/data', appDataPage)
app.use('/8000/tasks', appTasksPage)
app.use('/8000/logs', appOnlinePage)
app.use('/8000/methods', appApiMethods)
app.use('/8000/sendSupportMessage', sendSupportMessage)
app.use('/8000/pingMarkOne', ping)

app.use('/users', usersGetRouter)
app.use('/add-user', usersAddRouter)
app.use('/add-user-docs', usersAddDocsRouter)
app.use('/add-user-case', usersAddCase)
app.use('/add-user-education', usersAddEducation)
app.use('/add-user-skill', usersAddSkill)
app.use('/add-user-company', usersAddCompanyRouter)
app.use('/add-user-borth', usersAddBorth)
app.use('/remove-user', usersRemoveRouter)
app.use('/change-user-avatar', usersChangeAvatar)
app.use('/change-user-spec', usersChangeSpec)
app.use('/change-user-about', usersChangeAbout)

app.use('/auth', authGetRouter)
app.use('/add-auth', authAddRouter)
app.use('/check-auth', authCheckReg)
app.use('/restore-pass', authRestorePassword)

app.use('/add-task', taskAddRouter)
app.use('/edit-task', taskEditRouter)
app.use('/get-task', taskGetRouter)
app.use('/get-task-list', taskGetListRouter)
app.use('/change-task-status', taskActiveChangeRouter)

app.use('/add-respond', respondAddRouter)
app.use('/add-executor-in-task', executorAddRouter)
app.use('/remove-respond-one', respondRemoveOneRouter)
app.use('/remove-respond', respondRemoveRouter)
app.use('/order-complete', orderCompleteRouter)

app.use('/add-alarm-in-task', alarmsAddRouter)
app.use('/add-alarm-system', alarmsSystemAddRouter)
app.use('/remove-alarm-system', alarmsSystemRemoveRouter)

app.use('/add-file-avatar', userAvatarFile)
app.use('/add-file-contract', addFileOrderContract)
app.use('/add-file-complete', addFileOrderComplete)
app.use('/add-file-case', addFileCase)
// ----------------------------------------
// app.use('/add-file-techtask', addFileTechTask)
// ----------------------------------------
app.use('/send-file-techtask', sendFileTechTask)
app.use('/send-file-contract', sendFileContract)
app.use('/send-file-complete', sendFileComplete)

app.use('/check-face', checkFaceName)

// ----------------------------------------
// ----------------------------------------

let bodyData = ''

const storage1 = multer.diskStorage({

  destination: function (req, file, cb) {

    bodyData = req.body
    cb(null, 'techDocs')
  
  },
  filename: function (req, file, cb) {
    false && cb(null, file.originalname.split('.')[0] + '-' + bodyData.taskID + '.' + 'docx')
    false && cb(null, file.originalname.split('.')[0] + '.' + bodyData.taskID + '.' + file.mimetype.split('/')[1])
    false && cb(null, file.originalname.split('.')[0] + '.' + req.body.taskID + '.' + 'docx')

    if ( file.mimetype !== 'image/jpeg' ) {

      cb(null, bodyData.taskTechDocsId + '.techtask' + '.' + file.originalname.split('.')[1])

    } else {

      cb(null, bodyData.taskTechDocsId + '.avatar' + '.' + file.originalname.split('.')[1])

    }
  }
})

app.use(express.static(__dirname))

app.use(multer({ storage: storage1 }).single('taskTechDocsFile'))

app.post("/add-file-techtask", function (req, res, next) {
   
  let filedata = req.file

  if ( filedata )
    
    res.send(filedata.originalname + '. fileId=' + req.body.taskTechDocsId + '. filetype=' + filedata.mimetype)
  
  else
      
    res.send("Ошибка при загрузке файла")

  })

// ----------------------------------------
// ----------------------------------------

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
