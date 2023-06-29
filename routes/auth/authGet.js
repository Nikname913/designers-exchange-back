var express = require('express')
var router  = express.Router()
var fs      = require('fs')

router.post('/', function(req, res) {

  const { email, password } = req.body
  const authData = JSON.parse(fs.readFileSync('./dataBase/auth.json', 'utf-8')).users
  const sendData = {
    email: 'incorrect',
    password: 'incorrect',
    clientId: undefined,
    type: undefined
  }

  authData.forEach(item => {

    if ( item.login === email ) {

      sendData.email = item.login

      if ( item.password === password ) {
        
        sendData.password = item.password
        sendData.clientId = item.clientId
        sendData.type = item.type

      }

    }

  })

  res.send(JSON.stringify(sendData))

})

module.exports = router
