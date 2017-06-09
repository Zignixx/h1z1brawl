import { Promise as bluebird } from 'bluebird'
import { default as Bot } from '../bot'
import { coinflip } from '../../'

Bot.prototype.handleCoinflipFailed = function(offer, reason) {
  /* all coinflip logic should be handled in the coinflip manager */
  coinflip.declineCoinflipRequest(offer, reason)
}

Bot.prototype.handleCoinflipAccepted = function(offer) {
  /* all coinflip logic should be handled in the coinflip manager */
  coinflip.acceptCoinflipRequest(offer)
}

Bot.prototype.sendCoinflipRequest = function(tradeOffer) {
  return new Promise((resolve, reject) => {
    const steamOffer = this.manager.createOffer(tradeOffer.tradeUrl) /* create a trade offer with the passed URL, will error if invalid */

    /* attach promises to the TradeOffer prototype for async */
    const getUserDetailsAsync = bluebird.promisify(steamOffer.getUserDetails, { context: steamOffer, multiArgs: true })
    const sendAsync = bluebird.promisify(steamOffer.send, { context: steamOffer })

    getUserDetailsAsync().then(([bot, user]) => {

      /* check if the user and the bot are not in escrow and are not on probation */
      if (!this.canTrade(bot)) {
        throw new Error('Bot is unable to trade -- please retry')
      } else if (!this.canTrade(user)) {
        throw new Error('Your account must be Steam Guard Authenticated')
      }

      /* attach appid and contextid to all the items */
      const userItems = this.formatItems(tradeOffer.userItems)
      const botItems = this.formatItems(tradeOffer.botItems)

      steamOffer.setMessage(`Trade offer sent from H1Z1Brawl coinflip. Your trade ID: ${tradeOffer._id}`)
      steamOffer.addTheirItems(userItems)
      steamOffer.addMyItems(botItems)

      /* return a promise to send the trade offer through steam */
      return sendAsync()
    }).then(status => {
      if (status === 'pending' && tradeOffer.botItems.length === 0) {
        steamOffer.cancel()
        return reject(new Error('Trade went to escrow'))
      }

      /* make sure to track the coinflipOfferId for later usage */
      steamOffer.coinflipOfferId = tradeOffer._id
      resolve(steamOffer) /* resolve the trade offer back to the user */

      if (tradeOffer.botItems.length > 0) {
        this.community.acceptConfirmationForObject(this.identitySecret, steamOffer.id, (err) => {
          if (err) {
            console.log(`Error accepting confirmation coinflip: ${err.message}`)
          }
        })
      }
    }).catch(reject)
  })
}
