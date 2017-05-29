import config from '../../../config'
import { NotificationManager } from 'react-notifications'
import { SAVE_TRADE_URL_SUCCESS, SAVE_TRADE_URL_FAILURE, SAVE_TRADE_URL_REQUEST, REQUEST_INVENTORY, REQUEST_INVENTORY_SUCCESS, REQUEST_INVENTORY_FAILURE, FORCE_REQUEST_INVENTORY } from '../constants'

export function saveTradeURL(url) {
  return {
    type: config.socket.secure.param,
    types: [SAVE_TRADE_URL_REQUEST, SAVE_TRADE_URL_SUCCESS, SAVE_TRADE_URL_FAILURE],
    promise: (socket) => socket.emit('SAVE_TRADE_URL', { url })
  }
}

export function requestInventory() {
  return {
    type: config.socket.secure.param,
    types: [REQUEST_INVENTORY, REQUEST_INVENTORY_SUCCESS, REQUEST_INVENTORY_FAILURE],
    promise: (socket) => socket.emit('REQUEST_INVENTORY')
  }
}

export function forceRefreshInventory() {
  return {
    type: config.socket.secure.param,
    types: [FORCE_REQUEST_INVENTORY, REQUEST_INVENTORY_SUCCESS, REQUEST_INVENTORY_FAILURE],
    promise: (socket) => socket.emit('FORCE_REQUEST_INVENTORY')
      .catch(err => {
        if (err.ttl) {
          NotificationManager.error(err.ttl)
          throw null
        }
        throw err
      })
  }
}
