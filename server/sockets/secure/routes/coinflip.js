import { User } from '../../../db'

export default function configure(socket, io) {

  socket.on('CREATE_COINFLIP_GAME', (data, callback) => {
    User.findById(socket.decoded_token.id).exec()
      .then(user => {

      })
      .catch(error => callback({ error }))
  })

}
