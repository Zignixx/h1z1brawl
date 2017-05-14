import { routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux'

import auth from './authReducer'
import coinflip from './coinflipReducer'
import jackpot from './jackpotReducer'
import app from './appReducer'

export default combineReducers({
  routing: routerReducer,
  auth,
  jackpot,
  coinflip,
  app
})
