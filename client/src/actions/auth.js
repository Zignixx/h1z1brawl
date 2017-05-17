import { checkHttpStatus } from '../util/network'
import jwtDecode from 'jwt-decode'

import actions from '../constants'

const { AUTH_USER_LOAD_REQUEST, AUTH_USER_LOAD_SUCCESS, AUTH_USER_LOAD_FAILURE, AUTH_USER_LOGOUT } = actions

export function loadAuth() {
  return (dispatch) => {
    dispatch(authRequest())
    return fetch('/api/auth/loadAuth', {
      method: 'get',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
      })
      .then(checkHttpStatus)
      .then(response => response.json())
      .then(response => {
        try {
          console.log(response)
          // eslint-disable-next-line
          let attempt = jwtDecode(response.token)
          dispatch(authSuccess(response.token, response))
        } catch (e) {
          dispatch(authFailure({
            response: {
              status: 401,
              statusText: 'Invalid token'
            }
          }))
        }
      })
      .catch(error => {
        dispatch(authFailure({
          response: {
            status: 401,
            statusText: error
          }
        }))
      })
  }
}

function authRequest() {
  return {
    type: AUTH_USER_LOAD_REQUEST
  }
}

function authSuccess(token, user) {
  localStorage.setItem('token', token)
  return {
    type: AUTH_USER_LOAD_SUCCESS,
    payload: {
      token,
      user
    }
  }
}

function logoutSuccess() {
  localStorage.removeItem('token')
  return {
    type: AUTH_USER_LOGOUT
  }
}

export function logout() {
  return (dispatch) => {
    return fetch('/api/auth/logout')
      .then(response => {
        dispatch(logoutSuccess())
      })
      .catch(err => {
        //idk what to do here my nigga
      })
  }
}

function authFailure(error) {
  localStorage.removeItem('token')
  return {
    type: AUTH_USER_LOAD_FAILURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText
    }
  }
}
