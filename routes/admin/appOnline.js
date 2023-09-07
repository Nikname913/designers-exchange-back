var express    = require('express')
var router     = express.Router()
var fs         = require('fs')

const AppDataPage = require('../../views/app-online-page')

router.get('/', function(req, res) {

  const IP = req.ip.split('::')[1].split(':')[1]

  const users = JSON.parse(fs.readFileSync('./dataBaseAdmin/ping.online.json', 'utf-8'))
  const tasks = JSON.parse(fs.readFileSync('./dataBase/tasks.json', 'utf-8'))

  const componentData = {
    USERS: users.ping,
    TASKS: tasks.tasks
  } 

  const message = AppDataPage(componentData)

  res.send(message)

  // ----------------------------------------------------------------
  // {"rootId":"fed2191c05e80d0322ed5660f75e6b7d1d7daddd6859e0e8c69ea5e82eecd59a","clientId":"fed2191c05e80d0322ed5660f75e6b7d1d7daddd6859e0e8c69ea5e82eecd59a","type":"EXECUTOR","number":"89068085023","isValidNumber":false,"mail":"gorillaweb@yandex.ru","location":{"country":"","city":"[ options download ]"},"bio":{"name":"Gorilla","surname":"Gorilla","secondName":"","borth":""},"docs":{"passport":{"series":"","number":"","date":"","whoGet":""},"isValidPassport":false,"address":"","snils":"","inn":""}}
  // ----------------------------------------------------------------

})

module.exports = router