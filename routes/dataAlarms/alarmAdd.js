var express    = require('express')
var router     = express.Router()
var fs         = require('fs')

router.post('/', function(req, res) {
  
  const { taskID, message, initiator } = req.body
  const tasksFile = './dataBase/tasks.json'

  const tasksData = JSON.parse(fs.readFileSync('./dataBase/tasks.json', 'utf-8'))
  const tasksList = tasksData.tasks

  const tasksListNew = tasksList.map(item => {

    if ( item.taskID === taskID ) {

      if ( item.alertData ) {
        item.alertData.push({ initiator, message })
      } else {

        item.alertData = []
        item.alertData.push({ initiator, message })

      }

    }

    return item

  })

  const newArrayData = {
    taskTemplate: tasksData.taskTemplate,
    tasks: tasksListNew
  }

  fs.writeFile(tasksFile, JSON.stringify(newArrayData), error => {

    if (error) throw error
  
  })

  res.send(newArrayData)

})

module.exports = router