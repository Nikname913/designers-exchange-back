var express = require('express')
var router  = express.Router()
var fs      = require('fs')

router.post('/', function(req, res) {

  const { email, password } = req.body
  const authData = JSON.parse(fs.readFileSync('./dataBaseAdmin/users.json', 'utf-8')).users
  const sendData = {
    email: 'incorrect',
    password: 'incorrect',
    userId: undefined,
    type: undefined
  }

  authData.forEach(item => {

    if ( item.mail === email ) {

      sendData.email = item.mail

      if ( item.password === password ) {
        
        sendData.password = item.password
        sendData.userId = item.userId
        sendData.type = item.type

      }

    }

  })

  res.send(JSON.stringify(sendData))

})

module.exports = router
