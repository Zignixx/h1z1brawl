import chat from './routes/chat'
import user from './routes/user'
import coinflip from './routes/coinflip'

export default function connect(io) {
  io.on('connection', (socket) => {
    chat(socket, io)
    user(socket, io)
    coinflip(socket, io)
  })
}
