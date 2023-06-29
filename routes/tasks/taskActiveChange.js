var express = require('express')
var router  = express.Router()
var fs      = require('fs')

router.post('/', function(req, res) {

  const { taskId, status } = req.body
  const tasksFile = './dataBase/tasks.json'

  const tasksData = JSON.parse(fs.readFileSync('./dataBase/tasks.json', 'utf-8'))
  tasksData.tasks.forEach(item => {
    if (item.taskID === taskId) {
      item.status = status
    }
  })

  fs.writeFile(tasksFile, JSON.stringify(tasksData), error => {

    if (error) throw error
  
  })

  res.send(req.body)

})

module.exports = router