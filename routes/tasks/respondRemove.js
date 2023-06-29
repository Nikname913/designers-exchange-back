var express    = require('express')
var router     = express.Router()
var fs         = require('fs')

router.post('/', function(req, res) {
  
  const { clientId } = req.body
  const tasksFile = './dataBase/tasks.json'

  const tasksData = JSON.parse(fs.readFileSync('./dataBase/tasks.json', 'utf-8'))
  const tasksList = tasksData.tasks

  const tasksListNew = tasksList.map(item => {

    let newReviews = item.reviews.filter(reviewOne => reviewOne.executorID !== clientId)
    item.reviews = newReviews

    return item

  })

  const newArrayData = {
    taskTemplate: tasksData.taskTemplate,
    tasks: tasksListNew
  }

  fs.writeFile(tasksFile, JSON.stringify(newArrayData), error => {

    if (error) throw error
  
  })

  res.send('все отклики пользователя удалены')

})

module.exports = router