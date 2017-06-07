import config from '../../../config'
import { NotificationManager } from 'react-notifications'
import {
  CREATE_COINFLIP_GAME,
  CREATE_COINFLIP_GAME_FAILURE,
  CREATE_COINFLIP_GAME_SUCCESS,
  COINFLIP_NEW_GAME,
  COINFLIP_REQUEST_OFFERS,
  COINFLIP_REQUEST_OFFERS_SUCCESS,
  COINFLIP_REQUEST_OFFERS_FAILURE,
  COINFLIP_RESEND_OFFER,
  COINFLIP_RESEND_OFFER_SUCCESS,
  COINFLIP_RESEND_OFFER_FAILURE,
  COINFLIP_CANCEL_OFFER,
  COINFLIP_CANCEL_OFFER_SUCCESS,
  COINFLIP_CANCEL_OFFER_FAILURE,
  COINFLIP_LOAD_GAMES,
  COINFLIP_LOAD_GAMES_SUCCESS,
  COINFLIP_LOAD_GAMES_FAILURE
} from '../constants'

export function loadCoinflipGames() {
  return {
    type: config.socket.public.param,
    types: [COINFLIP_LOAD_GAMES, COINFLIP_LOAD_GAMES_SUCCESS, COINFLIP_LOAD_GAMES_FAILURE],
    promise: (socket) => socket.emit('COINFLIP_LOAD_GAMES').catch(error => {
      NotificationManager.error(`Error loading coinflip: ${error}`)
      throw error
    })
  }
}

export function createCoinflipGame(data) {
  return {
    type: config.socket.secure.param,
    types: [CREATE_COINFLIP_GAME, CREATE_COINFLIP_GAME_SUCCESS, CREATE_COINFLIP_GAME_FAILURE],
    promise: (socket) => socket.emit('CREATE_COINFLIP_GAME', data)
      .then(data => {
        NotificationManager.info('Coinflip game created. Waiting for trade offer...')
      })
      .catch(err => {
        NotificationManager.error(`Error while creating: ${err.toString()}`, 'Coinflip')
        throw err
      })
  }
}

export function cancelCoinflipOffer(offer) {
  return {
    type: config.socket.secure.param,
    types: [COINFLIP_CANCEL_OFFER, COINFLIP_CANCEL_OFFER_SUCCESS, COINFLIP_CANCEL_OFFER_FAILURE],
    promise: (socket) => socket.emit('COINFLIP_CANCEL_OFFER', offer).then(data => {
      NotificationManager.info('Coinflip offer canceled')
    }).catch(error => {
      NotificationManager.error(`Error canceling coinflip offer: ${error}`)
      throw error
    })
  }
}

export function resendCoinflipOffer(offer) {
  return {
    type: config.socket.secure.param,
    types: [COINFLIP_RESEND_OFFER, COINFLIP_RESEND_OFFER_SUCCESS, COINFLIP_RESEND_OFFER_FAILURE],
    promise: (socket) => socket.emit('COINFLIP_RESEND_OFFER', offer).catch(error => {
      NotificationManager.error(`Error while resending offer: ${error}`)
      throw error
    })
  }
}

export function requestCoinflipOffers() {
  return {
    type: config.socket.secure.param,
    types: [COINFLIP_REQUEST_OFFERS, COINFLIP_REQUEST_OFFERS_SUCCESS, COINFLIP_REQUEST_OFFERS_FAILURE],
    promise: (socket) => socket.emit('COINFLIP_REQUEST_OFFERS').catch(error => {
      NotificationManager.error(`Error while requesting offers: ${error}`)
      throw error
    })
  }
}

export function receiveCoinflipOffers(offers) {
  return {
    type: COINFLIP_REQUEST_OFFERS_SUCCESS,
    payload: offers
  }
}

export function loadCoinflipStats() {
  return {
    x: null
  }
}

export function addCoinflipGame(game) {
  return {
    type: COINFLIP_NEW_GAME,
    payload: game
  }
}
