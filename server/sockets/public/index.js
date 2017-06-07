import chat from './routes/chat'
import coinflip from './routes/coinflip'
import { coinflip as coinflipManager } from '../../managers'

export default function connect(io) {

  coinflipManager.setPublicIo(io)

  io.on('connection', (socket) => {

    socket.on('GET_USERS_CONNECTED', (data, callback) => {
      callback(Object.keys(io.sockets.sockets).length)
    })

    chat(socket, io)
    coinflip(socket, io)
  })
}
