var express = require('express')
var router  = express.Router()
var fs      = require('fs')

router.get('/', function(req, res) {

  const chatData = JSON.parse(fs.readFileSync('./dataBase/chat.json', 'utf-8'))

  res.send(chatData)

})

module.exports = router