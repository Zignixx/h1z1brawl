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
      const items = this.formatItems(tradeOffer.userItems)

      /* check if the user and bot inventory actually have the items */
      /*if (!this.hasItems(bot, tradeOffer.botItems)) {
        throw new Error('Bot inventory does not contain items -- contact an Admin immediately')
      } else if (!this.hasItems(user, tradeOffer.userItems)) {
        throw new Error('Your inventory does not have the required items')
      } TODO check if both inventories have the required items */

      steamOffer.setMessage(`Trade offer sent from H1Z1Brawl coinflip. Your trade ID: ${tradeOffer._id}`)
      steamOffer.addTheirItems(items)

      /* return a promise to send the trade offer through steam */
      return sendAsync()
    }).then(status => {
      if (status === 'pending') {
        throw new Error('Trade went to escrow')
      }
      
      /* make sure to track the coinflipOfferId for later usage */
      steamOffer.coinflipOfferId = tradeOffer._id
      resolve(steamOffer) /* resolve the trade offer back to the user */
    }).catch(reject)
  })
}
