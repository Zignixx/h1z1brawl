import {
  CREATE_COINFLIP_GAME,
  CREATE_COINFLIP_GAME_FAILURE,
  CREATE_COINFLIP_GAME_SUCCESS,
  COINFLIP_NEW_GAME,
  COINFLIP_REQUEST_OFFERS,
  COINFLIP_REQUEST_OFFERS_SUCCESS,
  COINFLIP_REQUEST_OFFERS_FAILURE,
  COINFLIP_LOAD_GAMES,
  COINFLIP_LOAD_GAMES_SUCCESS,
  COINFLIP_LOAD_GAMES_FAILURE
} from '../constants'

const initialState = {
  loading: false,
  loaded: false,
  creatingGame: false,
  games: [],
  offers: {
    loaded: false,
    loading: false,
    offers: []
  },
  stats: {
    loaded: false,
    loading: false,
    won: {}
  }
}

export default function reducer(state = initialState, {type, payload}) {
  switch (type) {
    case COINFLIP_LOAD_GAMES:
      return {
        ...state,
        loading: true,
        loaded: false
      }
    case COINFLIP_LOAD_GAMES_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        games: payload
      }
    case COINFLIP_LOAD_GAMES_FAILURE:
      return {
        ...state,
        loading: false,
        loaded: false,
        games: []
      }
    case CREATE_COINFLIP_GAME:
      return {
        ...state,
        creatingGame: true
      }
    case CREATE_COINFLIP_GAME_SUCCESS:
      return {
        ...state,
        creatingGame: false
      }
    case CREATE_COINFLIP_GAME_FAILURE:
      return {
        ...state,
        creatingGame: false
      }
    case COINFLIP_NEW_GAME:
      return {
        ...state,
        games: state.games.concat(payload)
      }
    case COINFLIP_REQUEST_OFFERS:
      return {
        ...state,
        offers: {
          ...state.offers,
          loading: true
        }
      }
    case COINFLIP_REQUEST_OFFERS_SUCCESS:
      return {
        ...state,
        offers: {
          loaded: true,
          loading: false,
          offers: payload
        }
      }
    case COINFLIP_REQUEST_OFFERS_FAILURE:
      return {
        ...state,
        offers: {
          ...state.offers,
          loaded: false,
          loading: false
        }
      }
    /*case COINFLIP_UPDATE_GAME:
      return {
        ...state,
        //TODO set the payload equal to the existing game in the game's array
      }*/
    default:
      return state
  }
}
