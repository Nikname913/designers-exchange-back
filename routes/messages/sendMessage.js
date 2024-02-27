var express    = require('express')
var router     = express.Router()
var fs         = require('fs')

router.post('/', function(req, res) {

  const { chatID, message, fromID, date = '28.01.2024 | 00:00' } = req.body
  const chatFile = './dataBase/chat.json'

  let chatData = JSON.parse(fs.readFileSync('./dataBase/chat.json', 'utf8'))
  let chatTemplate = chatData.chatTemplate
  let chats = chatData.chats

  let isNewChat = true

  chats.forEach(function(chat) {

    if ( chat.chatId === chatID ) {

      isNewChat = false
      chat.messages.push({
        text: message,
        from: fromID,
        date: date
      })

    }

  })

  if ( isNewChat ) {

    const createChat = {
      chatId: chatID,
      users: [ fromID ],
      messages: [{
        text: message,
        from: fromID,
        date: date
      }]
    }

    chats.push(createChat)

  }

  const newChatData = {
    chatTemplate,
    chats
  }

  fs.writeFile(chatFile, JSON.stringify(newChatData), error => {

    if (error) throw error
  
  })

})

module.exports = router