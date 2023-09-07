var express = require('express')
var router  = express.Router()
var fs      = require('fs')

router.post('/', function(req, res) {

  const data = req.body
  const usersFile = './dataBase/users.json'

  const { clientId,
    addInSkills1Title,
    addInSkills1Site = 'Не указано',
    addInSkills1Sm = 'Не указано',
    addInSkills1Sy = 'Не указано',
    addInSkills1Fm = 'Не указано',
    addInSkills1Fy = 'Не указано',
    addInSkills1NowTime = false,
    addInSkills1Job,
    addInSkills1JobTasks } = data

  let users = JSON.parse(fs.readFileSync('./dataBase/users.json', 'utf-8'))

  users.users.forEach(user => {
    if ( user.clientId === clientId ) {

      user.educationAndSkills.push({
        type: 'skill',
        title: addInSkills1Title,
        site: addInSkills1Site,
        sm: addInSkills1Sm,
        sy: addInSkills1Sy,
        fm: addInSkills1Fm,
        fy: addInSkills1Fy,
        nowTime: addInSkills1NowTime,
        jobName: addInSkills1Job,
        jobTasks: addInSkills1JobTasks
      })

    }
  })

  fs.writeFile(usersFile, JSON.stringify(users), error => {

    if (error) throw error
  
  })

  res.send({ answer: "данные успешно записаны" })

})

module.exports = router