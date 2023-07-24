var express = require('express')
var router  = express.Router()
var fs      = require('fs')

router.post('/', function(req, res) {

  const data = req.body
  const { fileName } = data

  res.sendFile(`techDocs/${fileName}`, { root: '.' })

})

module.exports = router