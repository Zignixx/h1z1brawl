import { Coinflip, CoinflipOffer, User } from '../db'
import { bot as botManager } from './'
import { generateSecret } from '../util/random'

class CoinflipManager {

  constructor() {
    /* if ur reading this, run away! */

    this.acceptCoinflipRequest = this.acceptCoinflipRequest.bind(this)
    this.declineCoinflipRequest = this.declineCoinflipRequest.bind(this)
  }

  setSecureIo(io) {
    this.secureIo = io
  }

  setPublicIo(io) {
    this.publicIo = io
  }

  createGame(user, { side, items }) {
    return new Promise((resolve, reject) => {
      const coinflip = new Coinflip({
        creator: {
          id: user._id,
          name: user.name,
          image: user.image,
          items
        },
        startingSide: side
      })

      coinflip.save()
        .then(coinflipGame => resolve({ user, coinflipGame }))
        .catch(reject)
    })
  }

  sendCoinflipRequest({ user, coinflipGame, data }) {
    return new Promise((resolve, reject) => {
      botManager.getNextBot().then(bot => { /* get the next available bot to send an offer */
        new CoinflipOffer({
          _id: generateSecret(),
          userId: user._id,
          tradeUrl: user.tradeUrl,
          gameId: coinflipGame._id, /* coinflip gameId to attach the trade offer to a game */
          botId: bot.client.steamID.getSteamID64(),
          userItems: data.items
        }).save().then(tradeOffer => { /* use mongoose async to save a newly created trade offer */
          return bot.sendCoinflipRequest(tradeOffer) /* return a promise to send a trade offer request to the user */
        }).then(resolve).catch(reject)
      }).catch(reject)
    })
  }

  resendCoinflipRequest(tradeOffer) {
    return new Promise((resolve, reject) => {
      if (!tradeOffer || !tradeOffer.botItems || tradeOffer.botItems.length == 0) {
        return reject(new Error('You can only resend winnings offers'))
      }
      return reject(new Error('nice try'))
    })
  }

  acceptCoinflipRequest(tradeOffer) {
    CoinflipOffer.findByTradeOffer(tradeOffer).then(coinflipOffer => {
      coinflipOffer.setAccepted()
      return Coinflip.findByCoinflipOffer(coinflipOffer.toObject())
    }).then(game => game.setOpen()).then(game => {
      this.publicIo.emit('COINFLIP_NEW_GAME', game)
    }).catch(error => {
      console.log(`Error while handling coinflip request: ${error.message}`)
    })
  }

  declineCoinflipRequest(tradeOffer, reason) {
    CoinflipOffer.findByTradeOffer(tradeOffer).then(coinflipOffer => {
      coinflipOffer.setFailed(reason)
      return Coinflip.findByCoinflipOffer(coinflipOffer.toObject())
    }).then(game => game.setFailed()).then(game => {
      /* TODO maybe send a notification to the user that their game has canceled */
      return true
    }).catch(error => {
      console.log(`Error while handling coinflip request: ${error.message}`)
    })
  }

  declineCoinflipRequestAsync(tradeOffer, reason) {
    return new Promise((resolve, reject) => {
      CoinflipOffer.findByTradeOffer({ tradeId: tradeOffer._id }).then(coinflipOffer => {
        coinflipOffer.setFailed(reason)
        return Coinflip.findByCoinflipOffer(coinflipOffer.toObject())
      }).then(game => game.setFailed()).then(resolve).catch(reject)
    })
  }

}

const coinflip = new CoinflipManager()

export { coinflip }
