var express = require('express')
var router  = express.Router()
var fs      = require('fs')

router.post('/', function(req, res) {

  const data = req.body
  const usersFile = './dataBase/users.json'

  const { clientId,
    CASE_NAME,
    CASE_SY,
    CASE_SM,
    CASE_FY,
    CASE_FM,
    CASE_PAY,
    CASE_P1,
    CASE_P2,
    CASE_P3,
    CASE_P4,
    CASE_TEXT,
    CASE_TAGS,
    CASE_FILE } = data

  let users = JSON.parse(fs.readFileSync('./dataBase/users.json', 'utf-8'))

  users.users.forEach(user => {
    if ( user.clientId === clientId ) {

      user.portfolio.push({
        title: CASE_NAME,
        startYear: CASE_SY,
        startMonth: CASE_SM,
        finishYear: CASE_FY,
        finishMonth: CASE_FM,
        coast: CASE_PAY,
        param1: CASE_P1,
        param2: CASE_P2,
        param3: CASE_P3,
        param4: CASE_P4,
        text: CASE_TEXT,
        tags: CASE_TAGS,
        file:CASE_FILE
      })

    }
  })

  fs.writeFile(usersFile, JSON.stringify(users), error => {

    if (error) throw error
  
  })

  res.send({ answer: "данные успешно записаны" })

})

module.exports = router