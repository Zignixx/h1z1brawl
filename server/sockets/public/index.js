export default function connect(io) {
  io.on('connection', (socket) => {

    socket.on('GET_USERS_CONNECTED', (data, callback) => {
      callback(Object.keys(io.sockets.sockets).length)
    })

    socket.on('LOAD_CHAT', (data, callback) => {
      callback() //TODO load chat messages
    })

  })
}
