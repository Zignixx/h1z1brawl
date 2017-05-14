const auth = {
  steam: {
    apiKey: process.env.API_KEY || '5EB306084E5CB78D76E3DDFBF03346A7'
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'derp derp derp'
  }
}

const database = {
  uri: process.env.DATABASE_URI || 'trerer'
}

module.exports = { //not transpiled
  auth: auth,
  database: database
}
