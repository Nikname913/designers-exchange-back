var express = require('express')
var router  = express.Router()
var fs      = require('fs')

router.post('/', function(req, res) {
  
  res.send(fs.readFileSync('./dataBase/users.json', 'utf-8'))

})

module.exports = router
