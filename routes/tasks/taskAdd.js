var express = require('express')
var router  = express.Router()
var fs      = require('fs')

router.post('/', function(req, res) {

  const { title = '', 
    coast = '', 
    prepay = '', 
    prepayDays = '',
    expertDays = '', 
    expertCoast = '', 
    dateStart = '', 
    dateFinish = '', 
    square = '', 
    storeys = '', 
    height = '',
    p1 = '',
    p2 = '',
    p3 = '',
    p4 = '',
    description = '',
    customer = '',
    status = '',
    date = '',
    taskId = '',
    chapters = [],
    tags = ['undefined', 'undefined', 'undefined'] } = req.body
    const tasksFile = './dataBase/tasks.json'

    const nowDate = new Date()
    let yyyy = nowDate.getFullYear()
    let mm = nowDate.getMonth() + 1
    let dd = nowDate.getDate()

    let h = nowDate.getHours()
    let m = nowDate.getMinutes()
    let s = nowDate.getSeconds()

    // ----------------------------------------------------------------
    // CHMS - create hours * minutes * seconds
    // NTID - new task ID
    // ----------------------------------------------------------------

    const taskDate = `${dd}-${mm}-${yyyy}-CHMS-${h}-${m}-${s}`

    let tasksData = JSON.parse(fs.readFileSync('./dataBase/tasks.json', 'utf-8'))
    let taskItem = {
      taskID: taskDate + '-NTID-' + taskId + '-new',
      customer,
      executor: "Исполнитель не выбран",
      date,
      status,
      reviews: [],
      title,
      dates: {
        start: dateStart,
        finish: dateFinish
      },
      tags,
      coast,
      prepay,
      prepayDays,
      expertise: "Государственная",
      expertiseDays: expertDays,
      expertiseCoast: expertCoast,
      objectData: {
        constructionType: p1 ? p1 : "Не указано",
        region: p2 ? p2 : "Не указано",
        type: p3 ? p3 : "Не указано",
        spec: p4 ? p4 : "Не указано",
      },
      objectParams: {
        square,
        storeys,
        height,
      },
      description,
      chapters: chapters
    }

    tasksData.tasks.push(taskItem)

    fs.writeFile(tasksFile, JSON.stringify(tasksData), error => {

      if (error) throw error
    
    })

    res.send('задание добавлено')

})

module.exports = router