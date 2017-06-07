import chat from './routes/chat'
import user from './routes/user'
import coinflip from './routes/coinflip'
import { coinflip as coinflipManager } from '../../managers'

export default function connect(io) {

  coinflipManager.setSecureIo(io)

  io.on('connection', (socket) => {
    chat(socket, io)
    user(socket, io)
    coinflip(socket, io)
  })
}
