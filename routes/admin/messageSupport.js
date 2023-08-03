var express = require('express')
var router  = express.Router()
var fs      = require('fs')

router.post('/', function(req, res) {

  const data = req.body
  const messagesFile = './dataBaseAdmin/messages.json'

  const { userId, userName, userMail, message, category } = data

  let messages = JSON.parse(fs.readFileSync('./dataBaseAdmin/messages.json', 'utf-8'))

  messages.data.push({ userId, userName, userMail, message, category })

  fs.writeFile(messagesFile, JSON.stringify(messages), error => {

    if (error) throw error
  
  })

  res.send('Ваше обращение было доставлено')

})

module.exports = router