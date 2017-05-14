import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import reducers from '../reducers'

const createFinalStore = compose(
  applyMiddleware(thunk)
)(createStore)

export default function configureStore(initialState) {
  return createFinalStore(reducers, initialState)
};
