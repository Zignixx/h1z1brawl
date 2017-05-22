import { User } from '../../../db'

export default function configure(socket, io) {

  socket.on('SEND_CHAT', (data, callback) => {
    User.findById(socket.decoded_token.id)
      .then(user => { //TODO check if user is muted or something
        callback()
        io.emit('RECEIVE_CHAT', {
          user: user,
          message: data.message
        })
      })
      .catch(err => {
        callback({
          error: err
        })
      })
  })

}
