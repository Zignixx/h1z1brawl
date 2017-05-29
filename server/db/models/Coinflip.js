import mongoose, { Schema } from 'mongoose'
import autoIncrement from 'mongoose-auto-increment'
import md5 from 'md5'
import { generateSecret, generatePercentage } from '../../util/random'

var coinflipSchema = new Schema({
  creatorId: { type: String, required: true },
  joinerId: { type: String },
  startingSide: { type: String, required: true },
  hash: { type: String },
  winningPercentage: { type: Number },
  secret: { type: String },
  open: { type: Boolean, default: false }
  items: [],
  winnerId: { type: String },
  completed: { type: Boolean, default: false },
  dateCreated: { type: Date, default: Date.now },
  dateCompleted: { type: Date }
});

coinflipSchema.statics.getUserHistory = function(userId, limit) {
  return this.find({ completed: true }).or([creatorId: userId }, { joinerId: userId }]).sort({ dateCompleted: -1 }).limit(limit).exec()
}

coinflipSchema.statics.getRecentGames = function(limit) {
  return this.find({ completed: true }).sort({ dateCompleted: -1} ).limit(limit).exec()
}

coinflipSchema.statics.getOpenGames = function() {
  return this.find({ open: true }).exec()
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

coinflipSchema.plugin(autoIncrement.plugin, 'Coinflip')

const Coinflip = mongoose.model('Coinflip', coinflipSchema)

export default Coinflip
