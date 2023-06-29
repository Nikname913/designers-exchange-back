var express = require('express')
var router  = express.Router()
var fs      = require('fs')

router.post('/', function(req, res) {
  
  const data = req.body
  const usersFile = './dataBase/users.json'

  const { series, number, date, whoGet, adress, snils, inn, clientId } = data
  
  let users = JSON.parse(fs.readFileSync('./dataBase/users.json', 'utf-8'))
  let answer = ''

  // ----------------------------------------------------------------
  // https://api-fns.ru/api/innfl
  //  ?fam=шипов
  //  &nam=николай
  //  &otch=николаевич
  //  &bdate=29.12.1993
  //  &docno=6519963196
  //  &key=59e55219511f91d7b35785b694fcdff24fbb50d3
  // ----------------------------------------------------------------

  const url = "https://api-fns.ru/api/innfl?fam=шипов&nam=николай&otch=николаевич&bdate=" 
    + ( Number(date.split('T')[0].split('-')[2]) + 1 ) + '.' 
    + date.split('T')[0].split('-')[1] + '.' 
    + date.split('T')[0].split('-')[0] + '&docno=' + series + number + '&key=59e55219511f91d7b35785b694fcdff24fbb50d3'

  const urlDemo = "https://api-fns.ru/api/innfl?fam=шипов&nam=николай&otch=николаевич&bdate=29.12.1993" + '&docno=' + series + number + '&key=59e55219511f91d7b35785b694fcdff24fbb50d3'

  fetch(urlDemo)
    .then(res => res.json())
    .then(data => {

      let checkedInn = ''
      answer = data

      if ( data.items.length !== 0 ) checkedInn = data.items[0]["ИНН"]
      if ( data.error ) checkedInn = inn + '*'

      users.users.forEach(user => {
        if ( user.clientId === clientId ) {
    
          user.docs = {
            
            passport: { series, number, date, whoGet }, isValidPassport: false, adress, snils, inn: checkedInn
          
          }
    
        }
      })
    
      fs.writeFile(usersFile, JSON.stringify(users), error => {
    
        if (error) throw error
        res.send(answer)
      
      })

    })

})

module.exports = router