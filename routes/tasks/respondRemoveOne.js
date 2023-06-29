var express    = require('express')
var router     = express.Router()
var fs         = require('fs')

router.post('/', function(req, res) {
  
  const { taskID,
    executorID } = req.body
  const tasksFile = './dataBase/tasks.json'

  const tasksData = JSON.parse(fs.readFileSync('./dataBase/tasks.json', 'utf-8'))
  const tasksList = tasksData.tasks

  const tasksListNew = tasksList.map(item => {

    let reviewsSorted = []

    if ( item.taskID === taskID ) {

      reviewsSorted = item.reviews.filter(reviewItem => reviewItem.executorID !== executorID)

    } else {

      reviewsSorted = item.reviews

    }

    item.reviews = reviewsSorted
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