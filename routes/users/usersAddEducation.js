var express = require('express')
var router  = express.Router()
var fs      = require('fs')

router.post('/', function(req, res) {

  const data = req.body
  const usersFile = './dataBase/users.json'

  const { clientId,
    addInEducation1Title,
    addInEducation1Finish,
    addInEducation1Special } = data

  let users = JSON.parse(fs.readFileSync('./dataBase/users.json', 'utf-8'))

  users.users.forEach(user => {
    if ( user.clientId === clientId ) {

      user.educationAndSkills.push({
        type: 'education',
        title: addInEducation1Title,
        finish: addInEducation1Finish,
        special: addInEducation1Special
      })

    }
  })

  fs.writeFile(usersFile, JSON.stringify(users), error => {

    if (error) throw error
  
  })

  res.send({ answer: "данные успешно записаны" })

})

module.exports = router