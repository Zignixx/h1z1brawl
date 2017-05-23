import config from '../../../config'
import { SEND_CHAT_REQUEST, SEND_CHAT_FAILURE, SEND_CHAT_SUCCESS, RECEIVE_CHAT, LOAD_CHAT_REQUEST, LOAD_CHAT_SUCCESS, LOAD_CHAT_FAILURE } from '../constants'

export function sendChat(message) {
  return {
    type: config.socket.secure.param,
    types: [SEND_CHAT_REQUEST, SEND_CHAT_SUCCESS, SEND_CHAT_FAILURE],
    promise: (socket) => socket.emit('SEND_CHAT', { message: message })
  }
}

export function loadChat() {
  return {
    type: config.socket.public.param,
    types: [LOAD_CHAT_REQUEST, LOAD_CHAT_SUCCESS, LOAD_CHAT_FAILURE],
    promise: (socket) => socket.emit('LOAD_CHAT')
  }
}

export function receiveChat(object) {
  return {
    type: RECEIVE_CHAT,
    payload: object
  }
}
