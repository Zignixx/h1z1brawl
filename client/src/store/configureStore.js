import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'

import reducers from '../reducers'

const createFinalStore = (history) => {
  return compose(
    applyMiddleware(routerMiddleware(history), thunk)
  )(createStore)
}

export default function configureStore(initialState, history) {
  return createFinalStore(history)(reducers, initialState)
};
