import { default as Bot } from '../bot'
import TradeOfferManager from 'steam-tradeoffer-manager'
import SteamCommunity from 'steamcommunity'
import { Promise as bluebird } from 'bluebird'

const {
  Invalid,
  Active,
  Accepted,
  Countered,
  Expired,
  Canceled,
  Declined,
  InvalidItems,
  CreatedNeedsConfirmation,
	CanceledBySecondFactor,
	InEscrow
} = TradeOfferManager.ETradeOfferState

bluebird.promisifyAll(TradeOfferManager.prototype)

const APP_ID = 433850

Bot.prototype.createManager = function() {
  if (this.manager) return

  this.community = new SteamCommunity()

  this.manager = new TradeOfferManager({
    steam: this.client,
    domain: this.domain,
    cancelTime: this.cancelTime,
    pollInterval: this.pollTime,
    community: this.community,
    language: 'en'
  })

  this.manager.on('newOffer', this.newOffer.bind(this))
  this.manager.on('sentOfferChanged', this.sentOfferChanged.bind(this))
}

Bot.prototype.setSteamCookies = function(cookies) {
  this.manager.setCookiesAsync(cookies).then(data => {
    this.log('set cookies for tradeoffer-manager')
    this.enabled = true
  }).catch(err => {
    this.log(`error while setting cookies: ${err}`)
    this.enabled = false
  })
  this.community.setCookies(cookies)
  this.community.startConfirmationChecker(this.confirmationTime, this.identitySecret)
}

Bot.prototype.canTrade = function(userObject) {
  return userObject.escrowDays == 0 && userObject.probation ? (userObject.probation == 'true') : (true)
}

Bot.prototype.formatItems = function(items) {
  const array = []
  for (let i = 0; i < items.length; i++) {
    const item = items[i].toObject()
    array.push({
      ...item,
      appid: APP_ID,
      contextid: 1
    })
  }
  return array
}

Bot.prototype.offerAccepted = function(offer) {
  if (offer.type === 'coinflip') {
    this.handleCoinflipAccepted(offer)
  }
}

Bot.prototype.offerFailed = function(offer, reason) {
  if (offer.type === 'coinflip') {
    this.handleCoinflipFailed(offer, reason)
  }
}

Bot.prototype.newOffer = function(offer) {
  this.log(`new Offer - ${offer}`)
  /* TODO allow admins to send offers */
}

Bot.prototype.sentOfferChanged = function(offer, oldState) { //TODO check how CreatedNeedsConfirmation works
  const { state } = offer
  const { type,  tradeId } = this.getTradeOfferData(offer)
  offer = { ...offer, type, tradeId }
  if (state === Accepted) {
    this.offerAccepted(offer)
  } else if (state === InEscrow || state === Countered || state === InvalidItems || state === Invalid) {
    offer.cancel()
    this.offerFailed(offer, state)
  } else if (state === Declined || state === Expired || state === Canceled || state === CanceledBySecondFactor) {
    this.offerFailed(offer, state)
  }
}

Bot.prototype.getTradeOfferData = function({ message }) {
  const data = {
    type: null,
    tradeId: null
  }

  /* get ID from offer message */
  const words = message.split(' ')
  data.tradeId = words[words.length - 1]

  /* get type from offer message */
  data.type = (~message.indexOf('coinflip')) ? 'coinflip' : null

  return data
}
