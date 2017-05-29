import {
  CREATE_COINFLIP_GAME,
  CREATE_COINFLIP_GAME_FAILURE,
  CREATE_COINFLIP_GAME_SUCCESS
} from '../constants'

const initialState = {
  loading: false,
  loaded: false,
  creatingGame: false,
  stats: {
    loaded: false,
    loading: false,
    won: {}
  }
}

export default function reducer(state = initialState, {type, payload}) {
  switch (type) {
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
    default:
      return state
  }
}
