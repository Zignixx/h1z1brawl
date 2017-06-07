import mongoose, { Schema } from 'mongoose'

var coinflipOfferSchema = new Schema({
  _id: { type: String },
  userId: { type: String, required: true },
  botId: { type: String, required: true },
  tradeUrl: { type: String, required: true },
  gameId: { type: String, required: true },
  userItems: [{
    assetid: String,
    icon_url: String,
    price: Number,
    name: String
  }],
  botItems: [{
    assetid: String,
    icon_url: String,
    price: Number,
    name: String
  }],
  created: { type: Date, default: Date.now },
  completed: { type: Boolean, default: false },
  failed: { type: Boolean, default: false },
  failureReason: { type: String }
});

coinflipOfferSchema.methods.setAccepted = function() {
  this.completed = true
  return this.save()
}

coinflipOfferSchema.methods.setFailed = function(reason) {
  this.failed = true
  this.failureReason = `${reason}`
  return this.save()
}

coinflipOfferSchema.statics.findUserOffers = function(id, limit) {
  return new Promise((resolve, reject) => {
    this.find({ userId: id }).limit(limit).sort({ created: -1 }).exec().then(resolve).catch(reject)
  })
}

coinflipOfferSchema.statics.userHasOpenRequest = function(user) {
  return new Promise((resolve, reject) => {
    this.findOne({ userId: user._id, failed: false, completed: false }).exec().then(tradeOffer => {
      if (tradeOffer) {
        return reject(new Error('You already have an open trade offer'))
      }
      resolve(user)
    }).catch(reject)
  })
}

coinflipOfferSchema.statics.findByTradeOffer = function({ tradeId }) {
  if (!tradeId) {
    return null
  }
  return this.findOne({ _id: tradeId }).exec()
}

const CoinflipOffer = mongoose.model('CoinflipOffer', coinflipOfferSchema)

export default CoinflipOffer
