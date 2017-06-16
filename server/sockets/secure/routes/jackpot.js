import { User } from '../../../db'
import { checkJackpotItems } from '../../../actions'
import { jackpot, bot as botManager } from '../../../managers'

export default function configure(socket, io) {

  socket.on('JACKPOT_DEPOSIT_ITEMS', (items, callback) => {
    User.findById(socket.decoded_token.id).exec().then(user => {
      user.hasTradeURL()
      checkJackpotItems(items)
      callback()
      jackpot.depositItems(user, items).then(offer => {
        socket.emit('JACKPOT_OFFER', offer)
      }).catch(error => socket.emit('JACKPOT_OFFER_ERROR', { error: error.message }))
    }).catch(error => callback({ error: error.message }))
  })

}
