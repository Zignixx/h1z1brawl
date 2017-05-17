const auth = {
  steam: {
    apiKey: process.env.API_KEY || '5EB306084E5CB78D76E3DDFBF03346A7'
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'derp derp derp'
  }
}

const api = {
  host: process.env.NODE_ENV !== "production" ? 'http://localhost:3001/' : 'http://h1z1brawl.com/'
}

const app = {
  host: process.env.NODE_ENV !== "production" ? 'http://localhost:3000/' : 'http://h1z1brawl.com/'
}

const database = {
  uri: process.env.MONGODB_URI || 'mongodb://localhost'
}

module.exports = { //not transpiled
  auth: auth,
  api: api,
  app: app,
  database: database
}
