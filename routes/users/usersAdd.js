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
    "faceType":"",
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
    },
    "spec": [],
    "reviews": [],
    "portfolio": [],
    "educationAndSkills": [],
    "team": [],
    "aboutText":""
  }`
  
  const data = req.body
  const usersFile = './dataBase/users.json'

  const { bio: { name, surname, secondName }, mail, number, type, rootId, clientId } = data
  
  let users = JSON.parse(fs.readFileSync('./dataBase/users.json', 'utf-8'))
  let newUser = JSON.parse(userTemplate)

  newUser.rootId = rootId
  newUser.clientId = clientId
  newUser.type = type
  newUser.number = number
  newUser.mail = mail
  newUser.bio.name = name
  newUser.bio.surname = surname
  newUser.bio.secondName = secondName

  users.users.push(data)

  fs.writeFile(usersFile, JSON.stringify(users), error => {

    if (error) throw error
    res.send('данные записаны')
  
  })

})

module.exports = router