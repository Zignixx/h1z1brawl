import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { routerMiddleware } from 'react-router-redux'
import {persistStore, autoRehydrate} from 'redux-persist'

import reducers from '../reducers'
import socketMiddleware from '../middleware/socketMiddleware'

const createFinalStore = (history, sockets) => {
  return compose(
    applyMiddleware(routerMiddleware(history), thunk, socketMiddleware(sockets[0]), socketMiddleware(sockets[1]), logger),
    autoRehydrate()
  )(createStore)
}

export default function configureStore(initialState, history, sockets) {
  const store = createFinalStore(history, sockets)(reducers, initialState)
  persistStore(store, {
    blacklist: ['auth']
  }) //allow state to be saved across refreshes
  return store
};
