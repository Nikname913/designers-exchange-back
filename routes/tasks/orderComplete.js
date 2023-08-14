var express    = require('express')
var router     = express.Router()
var fs         = require('fs')

router.post('/', function(req, res) {

  const { taskID } = req.body

  const tasksFile = './dataBase/tasks.json'
  const usersFile = './dataBase/users.json'

  const tasksData = JSON.parse(fs.readFileSync('./dataBase/tasks.json', 'utf-8'))
  const tasksList = tasksData.tasks

  const tasksListNew = []

  tasksList.forEach(item => {

    let iterItem = item

    if ( iterItem.taskID === taskID && iterItem.status === 'ORDER-ACTIVE' ) {

      iterItem.status = 'ORDER-COMPLETE'

    }

    tasksListNew.push(iterItem)

  })
    
  const newArrayData = {
    taskTemplate: tasksData.taskTemplate,
    tasks: tasksListNew
  }

  fs.writeFile(tasksFile, JSON.stringify(newArrayData), error => {

    if (error) throw error
  
  })

  res.send(tasksListNew)

})

module.exports = router