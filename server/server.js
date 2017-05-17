import express from 'express'
import session from 'express-session'
import http from 'http'
import socketIo from 'socket.io'
import bodyParser from 'body-parser'
import config from '../config'
import mongoose from 'mongoose'

import { default as configureAuth } from './util/configureAuth'
import { default as authRoute } from './routes/auth'
import { connect as connectMongo } from './db'

const app = express()
const server = http.Server(app)
const io = socketIo(server)

app.set('port', (process.env.PORT || 3001));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(session({
  secret: config.auth.jwt.secret,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 }
}))

configureAuth(app)
connectMongo(mongoose)

app.use('/api', authRoute)

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('../client/build'));
}

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
