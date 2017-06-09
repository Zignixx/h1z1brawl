import { User, CoinflipOffer } from '../../../db'
import { checkCoinflipGame, checkCoinflipJoinData } from '../../../actions'
import { coinflip, bot as botManager } from '../../../managers'

const OFFERS_LIMIT = 20

export default function configure(socket, io) {

  socket.on('CREATE_COINFLIP_GAME', (data, callback) => { //WHAT THE FUCK IS BELOW THIS?
    User.findById(socket.decoded_token.id).exec().then(user => {
      user.hasTradeURL() /* check if user has set a trade URL, throws an error to be caught if not */
      checkCoinflipGame(data) /* check to see if valid data was sent for the coinflip game */
      CoinflipOffer.userHasOpenRequest(user).then(user => { /* check to see if the user doesnt already have open requests */
        return coinflip.createGame(user, data) /* return a promise to create a new coinflip game */
      }).then(({ user, coinflipGame }) => {
        callback() /* callback that the game has been created, but the trade offer status is pending */
        coinflip.sendCoinflipRequest({ user, coinflipGame, data }).then(offer => {
          socket.emit('COINFLIP_OFFER', offer)
        }).catch(error => socket.emit('COINFLIP_OFFER_ERROR', { error: error.message }))
      }).catch(error => callback({ error: error.message }))
    }).catch(error => callback({ error: error.message }))
  })

  socket.on('COINFLIP_JOIN_GAME', (data, callback) => {
    User.findById(socket.decoded_token.id).exec().then(user => {
      user.hasTradeURL()
      checkCoinflipJoinData(data)
      coinflip.isGameOpen(data).then(data => {
        CoinflipOffer.userHasOpenRequest(user).then(user => {
          callback()
          return coinflip.createJoinOffer({ user, data })
        }).then(offer => {
          socket.emit('COINFLIP_OFFER', offer)
        }).catch(error => callback({ error: error.message }))
      }).catch(error => callback({ error: error.message }))
    }).catch(error => callback({ error: error.message }))
  })

  socket.on('COINFLIP_REQUEST_OFFERS', (data, callback) => {
    CoinflipOffer.findUserOffers(socket.decoded_token.id).then(callback).catch(error => callback({ error: error.message }))
  })

  socket.on('COINFLIP_CANCEL_OFFER', (tradeOffer, callback) => {
    coinflip.declineCoinflipRequestAsync(tradeOffer, 6).then(game => {
      callback()
      CoinflipOffer.findUserOffers(socket.decoded_token.id).then(offers => {
        socket.emit('COINFLIP_RECEIVE_OFFERS', offers)
      }).catch(error => callback({ error: error.message }))
    }).catch(error => callback({ error: error.message }))
  })

  /*socket.on('COINFLIP_RESEND_OFFER', (tradeOffer, callback) => {
    coinflip.resendCoinflipRequest(tradeOffer).then(offer => {
      socket.emit('COINFLIP_OFFER', offer)
    }).catch(error => callback({ error: error.message }))
  })*/

}
