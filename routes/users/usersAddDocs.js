var express = require('express')
var router  = express.Router()
var request = require('request')
var fs      = require('fs')

router.post('/', function(req, res) {
  
  const data = req.body
  const usersFile = './dataBase/users.json'

  const { series, number, date, whoGet, adress, snils, inn, clientId } = data
  
  let users = JSON.parse(fs.readFileSync('./dataBase/users.json', 'utf-8'))

  let name = ''
  let surName = ''
  let secondName = ''
  let borth = ''

  users.users.forEach(user => {
    if ( user.clientId === clientId ) {

      name = user.bio.name ? user.bio.name : 'николай'
      surName = user.bio.surname ? user.bio.surname : 'шипов'
      secondName = user.bio.secondName ? user.bio.secondName : 'николаевич'
      borth = user.bio.borth ? user.bio.borth : '29.12.1993'

    }
  })

  borth = '29.12.1993'

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

  const urlDemo = `https://api-fns.ru/api/innfl?fam=${surName}&nam=${name}&otch=${secondName}&bdate=${borth}` + '&docno=' + series + number + '&key=59e55219511f91d7b35785b694fcdff24fbb50d3'

  // -----------------------------------------
  // на время исчерпания лимита апи
  // -----------------------------------------
  
  checkedInn = inn + '*'

  users.users.forEach(user => {
    if ( user.clientId === clientId ) {

      user.docs = {
        
        passport: { series, number, date, whoGet }, isValidPassport: false, adress, snils, inn: checkedInn
      
      }

    }
  })

  fs.writeFile(usersFile, JSON.stringify(users), error => {
    
    if (error) throw error
  
  })

  res.send(checkedInn)

  // -----------------------------------------
  // на время исчерпания лимита апи
  // -----------------------------------------

  false && request(
    encodeURI(urlDemo),
    ( error, response, body ) => {
      if ( error ) {
        return res.status(500).send({ message: error })
      }

      let checkedInn = ''

      if ( JSON.parse(body).items.length !== 0 ) checkedInn = data.items[0]["ИНН"]
      if ( JSON.parse(body).error ) checkedInn = inn + '*'

      users.users.forEach(user => {
        if ( user.clientId === clientId ) {
    
          user.docs = {
            
            passport: { series, number, date, whoGet }, isValidPassport: false, adress, snils, inn: checkedInn
          
          }
    
        }
      })
    
      fs.writeFile(usersFile, JSON.stringify(users), error => {
    
        if (error) throw error
      
      })

      return res.send(checkedInn)
    }  
  )

})

module.exports = router