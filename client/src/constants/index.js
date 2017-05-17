function createConstants(...constants) {
  return constants.reduce((acc, constant) => {
    acc[constant] = constant
    return acc
  }, {})
}

export default createConstants(
  'AUTH_USER_LOAD_REQUEST',
  'AUTH_USER_LOAD_SUCCESS',
  'AUTH_USER_LOAD_FAILURE',
  'AUTH_USER_LOGOUT'
)
