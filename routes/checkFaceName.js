var express    = require('express')
var request    = require('request')
var router     = express.Router()

router.post('/', function(req, res) {

  const { faceString } = req.body

  request(
    encodeURI(`http://api-fns.ru/api/search?q=${faceString}&key=59e55219511f91d7b35785b694fcdff24fbb50d3`),
    ( error, response, body ) => {
      if ( error ) {
        return res.status(500).send({ message: error })
      }

      return res.send(body)
    }  
  )

})

module.exports = router