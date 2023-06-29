var express = require('express')
var router  = express.Router()
var fs      = require('fs')

router.post('/', function(req, res) {

  const { customer } = req.body

  const tasksData = JSON.parse(fs.readFileSync('./dataBase/tasks.json', 'utf-8'))
  const tasksDataFilter = tasksData.tasks.filter(item => item.customer === customer)

  res.send(tasksDataFilter)

})

module.exports = router