const auth = {
  steam: {
    apiKey: process.env.STEAM_API_KEY || '5EB306084E5CB78D76E3DDFBF03346A7'
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'derp derp derp'
  }
}

const api = {
  host: process.env.NODE_ENV !== "production" ? 'http://localhost:3001/' : process.env.API_URL,
  url: process.env.NODE_ENV !== "production" ? 'http://localhost:3001/' : '/',
}

const app = {
  host: process.env.NODE_ENV !== "production" ? 'http://localhost:3000/' : process.env.APP_URL,
  url: process.env.NODE_ENV !== "production" ? 'http://localhost:3000/' : '/'
}

const database = {
  uri: process.env.MONGODB_URI || 'mongodb://localhost'
}

const socket = {
  public: {
    param: 'socket-public',
    path: ''
  },
  secure: {
    param: 'socket-secure',
    path: '/secure'
  }
}

module.exports = { //not transpiled
  auth: auth,
  api: api,
  app: app,
  socket: socket,
  database: database
}
