import mongoose, { Schema } from 'mongoose'
import { CoinflipOffer } from '../'

var userSchema = new Schema({
  _id: {type: String, required: true},
  name: {type: String, required: true},
  image: {type: String, required: true},
  tradeUrl: {type: String, required: false},
  rank: {type: Number, required: true, default: 0},
  level: {type: Number, required: true, default: 0},
  totalDeposited: {type: Number, required: true, default: 0.00},
  totalWagered: {type: Number, required: true, default: 0.00},
  totalWithdrawn: {type: Number, required: true, default: 0.00},
  dateJoined: {type: Date, default: Date.now, required: true},
});

userSchema.methods.hasTradeURL = function() {
  if (this.tradeUrl) {
    return true
  } else {
    throw new Error('You must set your trade URL')
  }
}

const User = mongoose.model('User', userSchema)

export default User
