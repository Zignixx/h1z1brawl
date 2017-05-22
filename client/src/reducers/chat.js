import update from 'immutability-helper'
import { SEND_CHAT_REQUEST, SEND_CHAT_FAILURE, SEND_CHAT_SUCCESS, RECEIVE_CHAT } from '../constants'

const initialState = {
  messages: [],
  sending: false,
  error: null
}

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case SEND_CHAT_REQUEST:
      return {
        ...state,
        sending: true
      }
    case SEND_CHAT_FAILURE:
      return {
        ...state,
        sending: false,
        error: payload
      }
    case SEND_CHAT_SUCCESS:
      return {
        ...state,
        sending: false
      }
    case RECEIVE_CHAT:
      console.log('RECEIVED CHAT')
      return update(state, {
        messages: {
          $push: [payload]
        }
      })
    default:
      return state
  }
}
