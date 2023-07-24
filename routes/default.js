var nodemailer = require('nodemailer')
var express    = require('express')
var request    = require('request')
var router     = express.Router()

router.get('/', function(req, res) {

  const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
        user: 'nik.shipov@gmail.com',
        pass: 'ftmfdxiphdpufxii',
    },
    secure: true,
  })

  false && transporter.sendMail({
    from: 'nik.shipov@gmail.com',
    to: 'nik.shipov@yandex.ru',
    subject: 'Message from Express',
    text: 'this message was sent from node js server',
    html:
      '<span>meesage example</span>',
  }, (error, info) => {
      if (error) { return console.log(error) }
      res.status(200).send({ message: "Mail send", message_id: info.messageId })
  })

  const IP = req.ip.split('::')[1].split(':')[1]
  
  const message = 
  ` <div style="display: flex; flex-direction: column;">
      <span style="display: block">Добро пожаловать в серверную часть приложения биржи проектировщиков. Ваш ip-адрес ${IP}</span>
      <span style="display: block">Просмотр доступных методов        *</span>
      <span style="display: block">Переход в админ-панель приложения *</span>
      <span style="display: block">Просмотр сырых данных приложения  *</span>
    </div>
  `

  res.send(message)

  // ----------------------------------------------------------------
  // {"rootId":"fed2191c05e80d0322ed5660f75e6b7d1d7daddd6859e0e8c69ea5e82eecd59a","clientId":"fed2191c05e80d0322ed5660f75e6b7d1d7daddd6859e0e8c69ea5e82eecd59a","type":"EXECUTOR","number":"89068085023","isValidNumber":false,"mail":"gorillaweb@yandex.ru","location":{"country":"","city":"[ options download ]"},"bio":{"name":"Gorilla","surname":"Gorilla","secondName":"","borth":""},"docs":{"passport":{"series":"","number":"","date":"","whoGet":""},"isValidPassport":false,"address":"","snils":"","inn":""}}
  // ----------------------------------------------------------------

})

module.exports = router
