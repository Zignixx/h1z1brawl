import {
  JACKPOT_DEPOSIT_ITEMS,
  JACKPOT_DEPOSIT_ITEMS_SUCCESS,
  JACKPOT_DEPOSIT_ITEMS_FAILURE,
  JACKPOT_UPDATE_ROUND,
  JACKPOT_NEW_ROUND,
  JACKPOT_END_ROUND,
  JACKPOT_TIMER_START,
  JACKPOT_FINISH_ROLLING,
  JACKPOT_LOAD,
  JACKPOT_LOAD_SUCCESS,
  JACKPOT_LOAD_FAILURE,
  JACKPOT_START_ROLLING
} from '../constants'

const initialState = {
  stats: {
    loaded: false,
    loading: false,
    won: null
  },
  loaded: false,
  loading: false,
  isRolling: false,
  rollingRound: null,
  depositing: false,
  currentRound: null,
  historyRounds: []
}

export default function reducer(state = initialState, {type, payload}) {
  switch (type) {
    case JACKPOT_LOAD:
      return {
        ...state,
        loading: true
      }
    case JACKPOT_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        currentRound: payload.currentRound,
        historyRounds: payload.historyRounds
      }
    case JACKPOT_LOAD_FAILURE:
      return {
        ...state,
        loading: false,
        loaded: false
      }
    case JACKPOT_UPDATE_ROUND:
      return {
        ...state,
        currentRound: payload
      }
    case JACKPOT_FINISH_ROLLING:
      return {
        ...state,
        isRolling: false,
        rollingRound: null
      }
    case JACKPOT_START_ROLLING:
      return {
        ...state,
        isRolling: true,
        rollingRound: payload
      }
    case JACKPOT_END_ROUND:
      return {
        ...state,
        isRolling: true,
        currentRound: null,
        historyRounds: [payload, ...state.historyRounds.slice(0, 8)]
      }
    case JACKPOT_NEW_ROUND:
      return {
        ...state,
        currentRound: payload
      }
    case JACKPOT_DEPOSIT_ITEMS:
      return {
        ...state,
        depositing: true
      }
    case JACKPOT_DEPOSIT_ITEMS_SUCCESS:
      return {
        ...state,
        depositing: false
      }
    case JACKPOT_DEPOSIT_ITEMS_FAILURE:
      return {
        ...state,
        depositing: false
      }
    default:
      return state
  }
}
