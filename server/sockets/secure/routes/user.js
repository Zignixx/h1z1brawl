import { User } from '../../../db'
import { loadInventory, forceRefreshInventory } from '../../../actions'

export default function configure(socket, io) {

  socket.on('FORCE_REQUEST_INVENTORY', (data, callback) => {
    forceRefreshInventory(socket.decoded_token.id)
      .then(callback)
      .catch(error => callback({ error }))
  })

  socket.on('REQUEST_INVENTORY', (data, callback) => {
    loadInventory(socket.decoded_token.id)
      .then(callback)
      .catch(error => callback({ error }))
  })

  socket.on('SAVE_TRADE_URL', (data, callback) => {
    User.findById(socket.decoded_token.id)
      .then(user => {
        user.tradeUrl = data.url
        return user.save()
      })
      .then(callback)
      .catch(error => callback({ error }))
  })

}
