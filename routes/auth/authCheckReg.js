var express = require('express')
var router  = express.Router()
var sha256  = require("crypto-js/sha256")
var fs      = require('fs')

router.post('/', function(req, res) {

  const { email, code } = req.body
  const authFile = './dataBase/auth.json'
  const usersFile = './dataBase/users.json'

  const authData = JSON.parse(fs.readFileSync('./dataBase/auth.json', 'utf-8')).users
  const authTemplate = JSON.parse(fs.readFileSync('./dataBase/auth.json', 'utf-8')).userTemplate

  const usersData = JSON.parse(fs.readFileSync('./dataBase/users.json', 'utf-8')).users
  const usersTemplate = JSON.parse(fs.readFileSync('./dataBase/users.json', 'utf-8')).userTemplate

  const sendData = {
    result: 'error',
    userMail: '',
    userPassword: '',
    userClientId: '',
    userType: ''
  }

  authData.forEach(item => {

    if ( item.login === email && item.clientId === code ) {

      sendData.result = 'success'
      sendData.userMail = email.split('*')[1]
      sendData.userPassword = item.password
      sendData.userClientId = sha256(email.split('*')[1]).toString()
      sendData.userType = item.type

    }

  })

  if ( sendData.result === 'success' ) {

    let authDataFilter = authData.filter(item => item.login !== email)
    authDataFilter.push({ 
      login: sendData.userMail,
      password:sendData.userPassword,
      rootId:sha256(sendData.userMail).toString(),
      clientId:sha256(sendData.userMail).toString(),
      type: sendData.userType 
    })

    let newUser = ''

    usersData.forEach(user => {

      if ( user.mail === email ) {
        newUser = user
      }

    })

    newUser.mail = email.split('*')[1]
    newUser.rootId = sha256(sendData.userMail).toString()
    newUser.clientId = sha256(sendData.userMail).toString()

    let userDataFilter = usersData.filter(item => item.mail !== email)
    userDataFilter.push(newUser)

    const newAuthData = {
      userTemplate: authTemplate,
      users: authDataFilter
    }

    const newUsersData = {
      userTemplate: usersTemplate,
      users: userDataFilter
    }

    fs.writeFile(authFile, JSON.stringify(newAuthData), error => {

      if (error) throw error
    
    })

    fs.writeFile(usersFile, JSON.stringify(newUsersData), error => {

      if (error) throw error
    
    })

  }

  res.send(JSON.stringify(sendData))

})

module.exports = router
