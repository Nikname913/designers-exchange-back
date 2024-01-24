var express    = require('express')
var nodemailer = require('nodemailer')
var router     = express.Router()
var fs         = require('fs')

router.post('/', function(req, res) {
  
  const { email } = req.body

  let authList = JSON.parse(fs.readFileSync('./dataBase/auth.json', 'utf-8'))
  let authUsersListData = authList.users
  let counter = 0

  authUsersListData.forEach(user => {

    if ( user.login === email ) {

      counter = 1

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
        from: 'techsystems.exchange@gmail.com',
        to: email,
        subject: 'Биржа проектировщиков, восстановление пароля',
        text: `Здравствуйте, ваш пароль от аккаунта - ${user.password}`,
        html: `<span>Здравствуйте, ваш пароль от аккаунта - ${user.password}</span>`,
      }, (error, info) => {
        
        if (error) { return console.log(error) }
      
      })

    } 

  })

  if ( counter === 0 ) { res.send({ respond: 'error' }) }
  if ( counter === 1 ) { res.send({ respond: 'success' }) }

})

module.exports = router