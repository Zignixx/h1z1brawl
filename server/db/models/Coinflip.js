import mongoose, { Schema } from 'mongoose'
import { User } from '../'
import autoIncrement from 'mongoose-auto-increment'
import md5 from 'md5'
import { generateSecret, generatePercentage } from '../../util/random'

var coinflipSchema = new Schema({
  creator: {
    id: String,
    name: String,
    image: String,
    items: [{
      assetid: String,
      icon_url: String,
      price: Number,
      name: String
    }]
  },
  joiner: {
    id: String,
    name: String,
    image: String,
    items: [{
      assetid: String,
      icon_url: String,
      price: Number,
      name: String
    }]
  },
  startingSide: { type: String, required: true },
  hash: { type: String },
  winningPercentage: { type: Number },
  secret: { type: String },
  open: { type: Boolean, default: false },
  failed: { type: Boolean, default: false },
  winnerId: { type: String },
  completed: { type: Boolean, default: false },
  dateCreated: { type: Date, default: Date.now },
  dateCompleted: { type: Date }
})

coinflipSchema.methods.setFailed = function() {
  this.failed = true
  return this.save()
}

coinflipSchema.methods.setOpen = function() {
  this.open = true
  return this.save()
}

coinflipSchema.methods.setJoiner = function(user, items) {
  this.joiner = {
    id: user._id,
    name: user.name,
    image: user.image,
    items
  }
  return this.save()
}

coinflipSchema.methods.removeJoiner = function() {
  this.joiner = {
    items: []
  }
  return this.save()
}

coinflipSchema.methods.setCompleted = function() {
  this.completed = true
  return this.save()
}

coinflipSchema.methods.toCleanObject = function() {
  const object = this.toObject()
  delete object.winningPercentage
  delete object.secret
  return object
}

coinflipSchema.statics.findByCoinflipOffer = function({ gameId }) {
  if (!gameId) {
    return null
  }
  return this.findOne({ _id: gameId }).exec()
}

coinflipSchema.statics.getUserHistory = function(userId, limit) {
  return this.find({ completed: true }).or([{ creatorId: userId }, { joinerId: userId }]).sort({ dateCompleted: -1 }).limit(limit).exec()
}

coinflipSchema.statics.getRecentGames = function(limit) {
  return this.find({ completed: true }).sort({ dateCompleted: -1} ).limit(limit).exec()
}

coinflipSchema.statics.getOpenGames = function() {
  return this.find({ open: true }, { secret: 0, winningPercentage: 0 }).exec()
}

coinflipSchema.pre('save', function(next) {
  if (this.isModified('completed') && this.completed) {
    this.dateCompleted = Date.now()
    this.open = false
  }
  if (!this.hash) {
    this.secret = generateSecret()
    this.winningPercentage = generatePercentage()
    this.hash = md5(`${this.secret}-${this.winningPercentage}`)
  }
  next()
})

autoIncrement.initialize(mongoose.connection) //make sure it is initialized before creating plugin

coinflipSchema.plugin(autoIncrement.plugin, 'Coinflip')

const Coinflip = mongoose.model('Coinflip', coinflipSchema)

export default Coinflip
