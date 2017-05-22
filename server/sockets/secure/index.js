import chat from './routes/chat'

export default function connect(io) {
  io.on('connection', (socket) => {
    chat(socket, io)
  })
}
