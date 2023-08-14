var express    = require('express')
var router     = express.Router()
var fs         = require('fs')

const multer = require('multer')

const storageComplete = multer.diskStorage({

  destination: function (req, file, cb) {

    false && console.log(file)
    bodyData = req.body
    
    cb(null, './techComplete')
  
  },
  filename: function (req, file, cb) {
    false && cb(null, file.originalname.split('.')[0] + '-' + bodyData.taskID + '.' + 'docx')
    false && cb(null, file.originalname.split('.')[0] + '.' + bodyData.taskID + '.' + file.mimetype.split('/')[1])
    false && cb(null, file.originalname.split('.')[0] + '.' + req.body.taskID + '.' + 'docx')

    cb(null, bodyData.orderId + '.complete' + '.' + file.originalname.split('.')[1])
  }
})

const upload = multer({ storage: storageComplete })

router.post('/', upload.single('orderCompleteFile'), function (req, res) {

  const orderId = req.body.orderID

  const tasksData = JSON.parse(fs.readFileSync('./dataBase/tasks.json', 'utf-8'))
  const tasksList = tasksData.tasks
  const tasksFile = './dataBase/tasks.json'

  const tasksListNew = tasksList.map(item => {

    if ( item.taskID === orderId ) {

      let progress = 100 / ( item.chapters.length + 3 ) * ( item.chapters.length + 2 )

      item.progress = progress      

    }

    return item

  })

  const newArrayData = {
    taskTemplate: tasksData.taskTemplate,
    tasks: tasksListNew
  }

  fs.writeFile(tasksFile, JSON.stringify(newArrayData), error => {

    if (error) throw error
  
  })

  res.send(req.body)

  // ----------------------------------------------------------------
  // неактивный модуль для переименования файлов
  // ----------------------------------------------------------------

  false && fs.rename(
  `/techDocs/${fileName}`, 
  `/techDocs/${fileName.split('.')[0]}` + '-' + `${req.body.taskID}` + '.' + `${fileName.split('.')[1]}`, 
  error => {
    if (error) {

      res.send(error)
      return
    
    }
  })

})

module.exports = router