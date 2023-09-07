var express = require('express')
var router  = express.Router()
var fs      = require('fs')

router.post('/', function(req, res) {

  const data = req.body
  const pingFile = './dataBaseAdmin/ping.online.json'

  const { userId, time } = data

  let pings = JSON.parse(fs.readFileSync('./dataBaseAdmin/ping.online.json', 'utf-8'))

  pings.ping.push({ userId, time })

  fs.writeFile(pingFile, JSON.stringify(pings), error => {

    if (error) throw error
  
  })

  res.send('ПИНННGG!!!')

})

module.exports = router