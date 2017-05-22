import { routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux'

import auth from './auth'
import coinflip from './coinflip'
import jackpot from './jackpot'
import users from './users'
import chat from './chat'

export default combineReducers({
  router: routerReducer,
  auth,
  jackpot,
  users,
  coinflip,
  chat
})
