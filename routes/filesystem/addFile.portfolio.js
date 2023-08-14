var express    = require('express')
var router     = express.Router()
var fs         = require('fs')

const multer = require('multer')

const storageComplete = multer.diskStorage({

  destination: function (req, file, cb) {

    false && console.log(file)
    bodyData = req.body
    
    cb(null, './techPortfolio')
  
  },
  filename: function (req, file, cb) {
    false && cb(null, file.originalname.split('.')[0] + '-' + bodyData.taskID + '.' + 'docx')
    false && cb(null, file.originalname.split('.')[0] + '.' + bodyData.taskID + '.' + file.mimetype.split('/')[1])
    false && cb(null, file.originalname.split('.')[0] + '.' + req.body.taskID + '.' + 'docx')

    cb(null, bodyData.userId + '.case' + '.' + file.originalname.split('.')[1])
  }
})

const upload = multer({ storage: storageComplete })

router.post('/', upload.single('orderCaseFile'), function (req, res) {

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