var express    = require('express')
var router     = express.Router()

const multer = require('multer')

const storage = multer.diskStorage({

  destination: function (req, file, cb) {

    false && console.log(file)
    bodyData = req.body
    
    cb(null, './techDocs')
  
  },
  filename: function (req, file, cb) {
    false && cb(null, file.originalname.split('.')[0] + '-' + bodyData.taskID + '.' + 'docx')
    false && cb(null, file.originalname.split('.')[0] + '.' + bodyData.taskID + '.' + file.mimetype.split('/')[1])
    false && cb(null, file.originalname.split('.')[0] + '.' + req.body.taskID + '.' + 'docx')

    cb(null, file.originalname.split('.')[0] + '.' + 'docx')
  }
})

const upload = multer({ storage: storage })

router.post('/', upload.single('taskTechDocsFile'), function (req, res) {

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