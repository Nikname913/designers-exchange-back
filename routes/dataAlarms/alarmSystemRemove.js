var express    = require('express')
var router     = express.Router()
var fs         = require('fs')

router.post('/', function(req, res) {
  
  const { userId, actions = '', order = '' } = req.body
  const usersFile = './dataBase/users.json'

  const usersData = JSON.parse(fs.readFileSync('./dataBase/users.json', 'utf-8'))
  const usersList = usersData.users

  const usersListNew = usersList.map(item => {

    if ( item.clientId === userId ) {

      if ( item.alertData ) {

        let newAlertData = item.alertData.filter(item => {

          if ( item.actions !== actions && item.order !== order ) { return item }

        })

        item.alertData = newAlertData
      
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