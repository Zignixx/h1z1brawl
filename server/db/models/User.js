import mongoose, { Schema } from 'mongoose'
import { calculateLevel } from '../../util/user'
import { CoinflipOffer } from '../'

var userSchema = new Schema({
  _id: {type: String, required: true},
  name: {type: String, required: true},
  image: {type: String, required: true},
  tradeUrl: {type: String, required: false},
  rank: {type: Number, required: true, default: 0},
  level: {type: Number, required: true, default: 0},
  totalBet: {type: Number, required: true, default: 0.00},
  totalWon: {type: Number, required: true, default: 0.00},
  dateJoined: {type: Date, default: Date.now, required: true},
});

userSchema.methods.hasTradeURL = function() {
  if (this.tradeUrl) {
    return true
  } else {
    throw new Error('You must set your trade URL')
  }
}

userSchema.methods.addTotalWon = function(amount) {
  this.totalWon += amount
  this.save()
}

userSchema.methods.addTotalBet = function(amount) {
  this.totalBet += amount
  this.save()
}

userSchema.statics.addTotalWon = function(id, amount) {
  this.findOne({ _id: id }).exec().then(user => user.addTotalWon(amount)).catch(error => {
    console.log(`Error adding total won to user: ${error.message}`)
  })
}

userSchema.statics.addTotalBet = function(id, amount) {
  this.findOne({ _id: id }).exec().then(user => user.addTotalBet(amount)).catch(error => {
    console.log(`Error adding total won to user: ${error.message}`)
  })
}

userSchema.pre('save', function(next) {
  if (this.isModified('totalBet')) {
    this.level = parseInt(calculateLevel(this.totalBet))
  }
  next()
})

const User = mongoose.model('User', userSchema)

export default User
