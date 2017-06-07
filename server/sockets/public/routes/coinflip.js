import { Coinflip } from '../../../db'

export default function configure(socket, io) {

  socket.on('COINFLIP_LOAD_GAMES', (data, callback) => {
    Coinflip.getOpenGames().then(callback).catch(err => callback({ error: err.message }))
  })

}
