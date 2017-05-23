import { User, Message } from '../../../db'

export default function configure(socket, io) {

  socket.on('SEND_CHAT', (data, callback) => {
    User.findById(socket.decoded_token.id)
      .then(user => { //TODO check if user is muted or something
        const message = new Message({
          senderId: user._id,
          message: data.message
        })
        return message.save()
      })
      .then(message => message.formatMessage())
      .then(message => {
        io.emit('RECEIVE_CHAT', message)
        callback()
      })
      .catch(err => {
        callback({
          error: err
        })
      })
  })

}
