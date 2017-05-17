import { routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux'

import auth from './auth'
import coinflip from './coinflip'
import jackpot from './jackpot'
import app from './app'

export default combineReducers({
  router: routerReducer,
  auth,
  jackpot,
  coinflip,
  app
})
