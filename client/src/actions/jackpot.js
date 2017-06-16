import config from '../../../config'
import { NotificationManager } from 'react-notifications'
import {
  JACKPOT_DEPOSIT_ITEMS,
  JACKPOT_DEPOSIT_ITEMS_SUCCESS,
  JACKPOT_DEPOSIT_ITEMS_FAILURE,
  JACKPOT_UPDATE_ROUND,
  JACKPOT_NEW_ROUND,
  JACKPOT_END_ROUND,
  JACKPOT_FINISH_ROLLING,
  JACKPOT_LOAD,
  JACKPOT_LOAD_SUCCESS,
  JACKPOT_LOAD_FAILURE,
  JACKPOT_START_ROLLING,
  JACKPOT_LOAD_STATS,
  JACKPOT_LOAD_STATS_SUCCESS,
  JACKPOT_LOAD_STATS_FAILURE
} from '../constants'

export function loadJackpotStats(days) {
  return {
    type: config.socket.public.param,
    types: [JACKPOT_LOAD_STATS, JACKPOT_LOAD_STATS_SUCCESS, JACKPOT_LOAD_STATS_FAILURE],
    promise: (socket) => socket.emit('JACKPOT_LOAD_STATS', days)
  }
}

export function startJackpotRolling(roundId) {
  return {
    type: JACKPOT_START_ROLLING,
    payload: roundId
  }
}

export function loadJackpot() {
  return {
    type: config.socket.public.param,
    types: [JACKPOT_LOAD, JACKPOT_LOAD_SUCCESS, JACKPOT_LOAD_FAILURE],
    promise: (socket) => socket.emit('JACKPOT_LOAD').catch(error => {
      NotificationManager.error(`Error loading jackpot: ${error.message}`)
      throw error
    })
  }
}

export function depositJackpotItems(items) {
  return {
    type: config.socket.secure.param,
    types: [JACKPOT_DEPOSIT_ITEMS, JACKPOT_DEPOSIT_ITEMS_SUCCESS, JACKPOT_DEPOSIT_ITEMS_FAILURE],
    promise: (socket) => socket.emit('JACKPOT_DEPOSIT_ITEMS', items).then(result => {
      NotificationManager.info('Deposited jackpot items. Waiting for trade offer...')
    }).catch(error => {
      NotificationManager.error(`Error depositing items: ${error.message}`)
      throw error
    })
  }
}

export function endJackpotRolling() {
  return {
    type: JACKPOT_FINISH_ROLLING
  }
}

export function endJackpotRound(round) {
  return {
    type: JACKPOT_END_ROUND,
    payload: round
  }
}

export function newJackpotRound(round) {
  return {
    type: JACKPOT_NEW_ROUND,
    payload: round
  }
}

export function updateJackpotRound(round) {
  return {
    type: JACKPOT_UPDATE_ROUND,
    payload: round
  }
}
