var express = require('express')
var router = express.Router()
var fs = require('fs')

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
    description = '',
    customer = '',
    status = '',
    date = '',
    taskId = '',
    chapters = [],
    tags = ['undefined', 'undefined', 'undefined'] } = req.body
    const tasksFile = './dataBase/tasks.json'

    let taskItem = {
      taskID: '',
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
      tags: ['undefined', 'undefined', 'undefined'],
      coast,
      prepay,
      prepayDays,
      expertise: "Государственная",
      expertiseDays: expertDays,
      expertiseCoast: expertCoast,
      objectData: {
        constructionType: "Новое здание",
        region: "Екатеринбург",
        type: "Промышленне здания",
        spec: "Складские помещения"
      },
      objectParams: {
        square,
        storeys,
        height,
      },
      description,
      chapters: chapters
    }

    let tasksData = JSON.parse(fs.readFileSync('./dataBase/tasks.json', 'utf-8'))

    tasksData.tasks.forEach(item => {

      if ( item.taskID === taskId ) {

        if ( title !== '' ) item.title = title
        if ( dateStart ) item.dates.start = dateStart
        if ( dateFinish ) item.dates.finish = dateFinish
        if ( tags.length > 0 ) item.tags = tags
        if ( coast !== '' ) item.coast = coast
        if ( prepay !== '' ) item.prepay = prepay
        if ( prepayDays !== '' ) item.prepayDays = prepayDays
        if ( expertDays ) item.expertiseDays = expertDays
        if ( expertCoast !== '' ) item.expertiseCoast = expertCoast
        if ( square !== '' ) item.objectParams.square = square
        if ( storeys !== '' ) item.objectParams.storeys = storeys
        if ( height !== '' ) item.objectParams.height = height
        if ( description !== '' ) item.description = description
        if ( chapters.length > 0 ) item.chapters = chapters

      }

    })

    fs.writeFile(tasksFile, JSON.stringify(tasksData), error => {

      if (error) throw error
    
    })

    res.send('задание добавлено')

})

module.exports = router