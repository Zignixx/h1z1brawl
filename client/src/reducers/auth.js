import actions from '../constants'

const { AUTH_USER_LOAD_REQUEST, AUTH_USER_LOAD_SUCCESS, AUTH_USER_LOAD_FAILURE, AUTH_USER_LOGOUT } = actions

const initialState = {
  loaded: false,
  token: null,
  user: null,
  loading: false,
  error: null
}

export default function reducer(state = initialState, {type, payload}) {
  switch(type) {
    case AUTH_USER_LOAD_FAILURE:
      return {
        ...state,
        loaded: false,
        loading: false,
        user: null,
        token: null,
        error: `Authentication Error: ${payload.status} ${payload.statusText}`
      }
    case AUTH_USER_LOAD_SUCCESS:
      return {
        ...state,
        loaded: true,
        loading: false,
        user: payload.user,
        token: payload.token
      }
    case AUTH_USER_LOAD_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case AUTH_USER_LOGOUT:
      return {
        ...state,
        user: null,
        token: null
      }
    default:
      return state
  }
}
