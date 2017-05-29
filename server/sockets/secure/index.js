import chat from './routes/chat'
import user from './routes/user'

export default function connect(io) {
  io.on('connection', (socket) => {
    chat(socket, io)
    user(socket, io)
  })
}
