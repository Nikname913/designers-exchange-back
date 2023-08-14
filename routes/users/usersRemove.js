var express = require('express')
var router  = express.Router()
var fs      = require('fs')

router.post('/', function(req, res) {

  const userTemplate = `{
    "rootId": "", 
    "clientId": "",
    "type": "",
    "number":"",
    "isValidNumber":"",
    "mail":"",
    "location":{
      "country":"",
      "city":""
    },
    "bio":{
      "name":"",
      "surname":"",
      "secondName":"",
      "borth":""
    },
    "docs":{
      "passport":{
        "series":"",
        "number":"",
        "date":"",
        "whoGet":""
      },
      "isValidPassport":"",
      "address":"",
      "snils":"",
      "inn":""
    }
  }`
  const authTemplate = `{
    "login":"",
    "password":"",
    "rootId":"",
    "clientId":"",
    "type":""
  }`
  
  const data = req.body
  const usersFile = './dataBase/users.json'
  const authFile = './dataBase/auth.json'

  const { clientId } = data
  
  let users = JSON.parse(fs.readFileSync('./dataBase/users.json', 'utf-8'))
  let newUserTemplate = JSON.parse(userTemplate)

  let auth = JSON.parse(fs.readFileSync('./dataBase/auth.json', 'utf-8'))
  let newAuthTemplate = JSON.parse(authTemplate)

  let usersFilter = users.users.filter(userOne => userOne.clientId !== clientId)
  let authFilter = auth.users.filter(userOne => userOne.clientId !== clientId)

  const newUsers = {
    userTemplate: newUserTemplate,
    users: usersFilter
  }
  const newAuth = {
    userTemplate: newAuthTemplate,
    users: authFilter
  }

  false && res.send(JSON.stringify(newUsers))
  false && res.send(JSON.stringify(newAuth))

  // ----------------------------------------------------------------
  // ----------------------------------------------------------------

  let usersDeleteChange = users.users.map(userOne => {

    if ( userOne.clientId === clientId ) {

      userOne.type = 'DELETED::' + userOne.type
      userOne.aboutText = ''
      userOne.alertData = []
      userOne.avatar = '1'
      userOne.portfolio = []
      userOne.docs = { shortName: 'deleted' }
      userOne.bio = { name: 'deleted' }

    }

    return userOne

  })
  
  const newUsersRemove = {
    userTemplate: newUserTemplate,
    users: usersDeleteChange
  }
  
  // удаление данных из базы users
  // ----------------------------------------------------------------

  false && fs.writeFile(usersFile, JSON.stringify(newUsersRemove), error => {

    if (error) throw error
    false && res.send('данные о пользователе удалены')
  
  })

  // ----------------------------------------------------------------
  // удаление данных из базы auth
  // ----------------------------------------------------------------

  fs.writeFile(authFile, JSON.stringify(newAuth), error => {

    if (error) throw error
    false && res.send('данные о пользователе удалены')
  
  })

  res.send('данные о пользователе удалены')

})

module.exports = router