var express    = require('express')
var nodemailer = require('nodemailer')
var router     = express.Router()
var fs         = require('fs')

router.post('/', function(req, res) {
  
  const { email, password, type, name, surname, secondName, number, faceType = '', specArr } = req.body
  const authFile = './dataBase/auth.json'
  const usersFile = './dataBase/users.json'

  // -------------------------------------------
  // {"login": "", "password": "", "rootId": "", "clientId": ""}
  // -------------------------------------------

  const authItem = {
    login: '',
    password: '',
    rootId: '',
    clientId: '',
    type: ''
  }

  const sendData = {
    email: 'no-data',
    password: 'no-data',
    clientId: 'no-data'
  }

  let authList = JSON.parse(fs.readFileSync('./dataBase/auth.json', 'utf-8'))
  let authCount = 0

  const usersData = JSON.parse(fs.readFileSync('./dataBase/users.json', 'utf-8')).users
  const usersTemplate = JSON.parse(fs.readFileSync('./dataBase/users.json', 'utf-8')).userTemplate

  // {"userTemplate":{"login":"","password":"","rootId":"","clientId":""}, "users": [{"login":"nik.shipov@gmail.com","password":"Qwerty12345","rootId":"13nik9","clientId":"13nik9"}]}

  const filterAuthList = { 
    userTemplate: { 
      login: "", 
      password: "", 
      rootId: "", 
      clientId:"",
      type: "",
    },
    users: authList.users.filter(user => user.login !== `*${email}`) 
  }

  const filterUsersList = { 
    userTemplate: [{
      rootId:"",
      clientId:"",
      type:"",
      number:"",
      isValidNumber:"",
      mail:"",
      faceType:"",
      location:{
        country:"",
        city:""
      },
      bio:{
        name:"",
        surname:"",
        secondName:"",
        borth:""
      },
      docs:{
        passport:{
          series:"",
          number:"",
          date:"",
          whoGet:""
        },
        isValidPassport:"",
        address:"",
        snils:"",
        inn:""
      },
      spec: [],
      reviews: [],
      portfolio: [],
      educationAndSkills: [],
      team: [],
      aboutText:""
    }],
    users: usersData.filter(user => user.mail !== `*${email}`) 
  }

  filterAuthList.users.forEach(item => {

    if ( item.login === email ) authCount++

  })

  if ( authCount === 0 ) {

    const key1 = (Math.random() * 1000).toFixed(0)
    const key2 = (Math.random() * 1000).toFixed(0)
    const keyCode = `${key1}\-${key2}`

    authItem.login = `*${email}`
    authItem.password = password
    authItem.rootId = keyCode
    authItem.clientId = keyCode
    authItem.type = type

    const userItem = {
      rootId:keyCode,
      clientId:keyCode,
      type:type,
      number:number,
      isValidNumber:false,
      mail:`*${email}`,
      faceType:faceType,
      location:{
        country:"",
        city:"[ options download ]"
      },
      bio:{
        name:name,
        surname:surname,
        secondName:secondName,
        borth:""
      },
      docs:{
        passport:{
          series:"",
          number:"",
          date:"",
          whoGet:""
        },
        isValidPassport:false,
        address:"",
        snils:"",
        inn:""
      },
      spec: specArr.length > 0 ? [ specArr ] : [],
      reviews: [],
      portfolio: [],
      educationAndSkills: [],
      team: [],
      aboutText:""
    }

    filterAuthList.users.push(authItem)

    sendData.email = `original-${email}`
    sendData.password = `original-${password}`

    filterUsersList.users.push(userItem)

    // -----------------------------------------
    // -----------------------------------------
    // const transporter = nodemailer.createTransport({
    //   port: 465,
    //   host: "smtp.gmail.com",
    //   auth: {
    //     user: 'nik.shipov@gmail.com',
    //     pass: 'ftmfdxiphdpufxii',
    //   },
    //   secure: true,
    // })
    // -----------------------------------------
    // -----------------------------------------

    const transporter = nodemailer.createTransport({
      port: 465,
      host: "smtp.gmail.com",
      auth: {
        user: 'techsystems.exchange@gmail.com',
        pass: 'jjtukhxkbfykrrjd',
      },
      secure: true,
    })
  
    transporter.sendMail({
      from: 'nik.shipov@gmail.com',
      to: email,
      subject: 'Биржа проектировщиков, подтверждение аккаунта',
      text: `Ваш код подтверждения - ${keyCode}`,
      html: `<span>Ваш код подтверждения - ${keyCode}</span>`,
    }, (error, info) => {
      
      if (error) { return console.log(error) }
      
      fs.writeFile(authFile, JSON.stringify(filterAuthList), error => {

        if (error) throw error
      
      })

      fs.writeFile(usersFile, JSON.stringify(filterUsersList), error => {

        if (error) throw error
      
      })
    
    })

  } else {

    sendData.email = 'no-original'
      
  }

  res.send(sendData)

})

module.exports = router