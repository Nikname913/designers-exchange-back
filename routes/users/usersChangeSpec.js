var express = require('express')
var router  = express.Router()
var fs      = require('fs')

router.post('/', function(req, res) {

  const data = req.body
  const usersFile = './dataBase/users.json'

  const { spec, clientId } = data

  let users = JSON.parse(fs.readFileSync('./dataBase/users.json', 'utf-8'))

  users.users.forEach(user => {
    if ( user.clientId === clientId ) {

      user.spec = spec

    }
  })

  fs.writeFile(usersFile, JSON.stringify(users), error => {

    if (error) throw error
  
  })

  res.send(users)

})

module.exports = router