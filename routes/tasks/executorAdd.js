var express    = require('express')
var router     = express.Router()
var fs         = require('fs')

router.post('/', function(req, res) {

  const { taskID,
    executorID } = req.body

  const tasksFile = './dataBase/tasks.json'
  const usersFile = './dataBase/users.json'

  const tasksData = JSON.parse(fs.readFileSync('./dataBase/tasks.json', 'utf-8'))
  const tasksList = tasksData.tasks

  const usersData = JSON.parse(fs.readFileSync('./dataBase/users.json', 'utf-8'))
  const usersList = usersData.users

  const tasksListNew = []

  tasksList.forEach(item => {

    let iterItem = item

    if ( iterItem.taskID === taskID && iterItem.status === 'TASK-ACTIVE' ) {

      let progress = 100 / ( item.chapters.length + 3 )

      iterItem.executor = executorID
      iterItem.status = 'ORDER-ACTIVE'
      iterItem.progress = progress

    }

    tasksListNew.push(iterItem)

  })

  const usersListNew = usersList.map(item => {

    if ( item.clientId === executorID ) {

      if ( item.alertData ) {

        item.alertData.push({ 
          message: `Поздравялем, заказчик выбрал вас исполнителем для выполнения задания ${taskID}. Нажмите, чтобы перейти в заказ и начать работу над проектом`, 
          type: 'error', 
          actions: []
        })
      
      } else {

        item.alertData = []
        item.alertData.push({ 
          message: `К сожалению, заказчик отказал вам в сотрудничестве в рамках задания ${taskID}`, 
          type: 'error', 
          actions: []
        })

      }

    }

    return item

  })
    
  const newArrayData = {
    taskTemplate: tasksData.taskTemplate,
    tasks: tasksListNew
  }
  
  const newArrayDataUsers = {
    userTemplate: usersData.userTemplate,
    users: usersListNew
  }

  fs.writeFile(tasksFile, JSON.stringify(newArrayData), error => {

    if (error) throw error
  
  })

  fs.writeFile(usersFile, JSON.stringify(newArrayDataUsers), error => {

    if (error) throw error
  
  })

  res.send(newArrayData)

})

module.exports = router