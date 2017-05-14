const createAction = (genre, name) => {
  return `ACTION_${genre}_${name}`
}

const authActions = {
  AUTH_USER_LOGIN_REQUEST: createAction('auth', 'USER_LOGIN_REQUEST'),
  AUTH_USER_LOGIN_SUCCESS: createAction('auth', 'USER_LOGIN_SUCCESS'),
  AUTH_USER_LOGIN_FAILURE: createAction('auth', 'USER_LOGIN_FAILURE'),
  AUTH_USER_LOGOUT_REQUEST: createAction('auth', 'USER_LOGOUT_REQUEST'),
  AUTH_USER_LOGOUT_SUCCESS: createAction('auth', 'USER_LOGOUT_SUCCESS'),
  AUTH_USER_LOGOUT_FAILURE: createAction('auth', 'USER_LOGOUT_FAILURE')
}

export default {
  ...authActions
}
