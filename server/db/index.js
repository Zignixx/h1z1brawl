import config from '../../config'

export const connect = (mongoose) => {
  mongoose.Promise = global.Promise //native es6 library
  mongoose.connect(config.database.uri, (err) => {
    if (err) {
      console.log('Error while connecting to MongoDB: ', err)
      process.exit(0)
    }
    console.log('Connected to MongoDB')
  })
}

export User from './models/User'
export Message from './models/Message'
