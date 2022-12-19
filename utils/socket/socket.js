const server = require('../../app')

const io = require('socket.io')(server, {
  cors: {
    origin: "http://localhost:3000",
    method: ['GET', 'POST']
  }
})

module.exports = io
