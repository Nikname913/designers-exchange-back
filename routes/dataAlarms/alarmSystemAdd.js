var express    = require('express')
var router     = express.Router()
var fs         = require('fs')

router.post('/', function(req, res) {
  
  const { userId, message, type, actions, fee = '', comment= '', order= '' } = req.body
  const usersFile = './dataBase/users.json'

  const usersData = JSON.parse(fs.readFileSync('./dataBase/users.json', 'utf-8'))
  const usersList = usersData.users

  const usersListNew = usersList.map(item => {

    if ( item.clientId === userId ) {

      if ( item.alertData ) {

        item.alertData.push({ message, type, actions, fee, comment, order })
      
      } else {

        item.alertData = []
        item.alertData.push({ message, type, actions, fee, comment, order })

      }

    }

    return item

  })

  const newArrayData = {
    userTemplate: usersData.userTemplate,
    users: usersListNew
  }

  fs.writeFile(usersFile, JSON.stringify(newArrayData), error => {

    if (error) throw error
  
  })

  res.send(newArrayData)

})

module.exports = router