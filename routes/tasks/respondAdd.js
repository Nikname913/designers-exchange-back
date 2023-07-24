var express    = require('express')
var router     = express.Router()
var fs         = require('fs')

router.post('/', function(req, res) {
  
  const { taskID,
    executorID,
    executorName,
    deadline = '',
    coast = '',
    preSolution = '',
    prePay = '',
    expert = '',
    expertCoast = '',
    comment = '' } = req.body
  const tasksFile = './dataBase/tasks.json'

  const tasksData = JSON.parse(fs.readFileSync('./dataBase/tasks.json', 'utf-8'))
  const tasksList = tasksData.tasks

  const tasksListNew = tasksList.map(item => {

    if ( item.taskID === taskID ) {

      item.reviews.push({
        executorID,
        executorName,
        deadline,
        coast,
        preSolution,
        prePay,
        expert,
        expertCoast,
        comment
      })
      item.focused = 'new'

      const messageString = 'null::Поступил новый отклик на ваш заказ ' + taskID + '. Откликнулся пользователь ' + executorID

      if ( item.alertData ) {

        item.alertData.push({
          initiator: executorID,
          message: messageString
        })

      } else {

        item.alertData = []
        
        item.alertData.push({
          initiator: executorID,
          message: messageString
        })

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