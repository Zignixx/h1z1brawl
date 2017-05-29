import config from '../../../config'
import { NotificationManager } from 'react-notifications'
import {
  CREATE_COINFLIP_GAME,
  CREATE_COINFLIP_GAME_FAILURE,
  CREATE_COINFLIP_GAME_SUCCESS
} from '../constants'

export function createCoinflipGame(data) {
  return {
    type: config.socket.secure.param,
    types: [CREATE_COINFLIP_GAME, CREATE_COINFLIP_GAME_SUCCESS, CREATE_COINFLIP_GAME_FAILURE],
    promise: (socket) => socket.emit('CREATE_COINFLIP_GAME', data)
      .then(data => {
        NotificationManager.success('Created a coinflip game', 'Coinflip')
      })
      .catch(err => {
        NotificationManager.error(`Error while creating: ${err.message}`, 'Coinflip')
        throw err
      })
  }
}

export function loadCoinflipStats() {
  return {
    x: null
  }
}
