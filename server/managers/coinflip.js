import { Coinflip, CoinflipOffer, User } from '../db'
import { bot as botManager } from './'
import { generateSecret } from '../util/random'
import { coinflipOffer as coinflipOfferType } from '../constants'
import { getCoinflipTotal, getJoinerTotal, getCreatorTotal } from '../util/coinflip'
import { findSocketById } from '../util/socket'

class CoinflipManager {

  constructor() {
    /* if ur reading this, run away! */

    this.acceptCoinflipRequest = this.acceptCoinflipRequest.bind(this)
    this.declineCoinflipRequest = this.declineCoinflipRequest.bind(this)
  }

  setSecureIo(io) {
    this.secureIo = io
  }

  setPublicIo(io) {
    this.publicIo = io
  }

  isGameOpen(data, user) {
    return new Promise((resolve, reject) => {
      Coinflip.findById(data.game._id).exec().then(game => {
        if (game.creator.id === user._id) {
          return reject(new Error('You cannot join your own game'))
        }
        if (game.open && !game.joiner.id) {
          return resolve(data)
        }
        return reject(new Error('Game is not open'))
      }).catch(reject)
    })
  }

  cancelCoinflipOffer({ tradeId, botId }) {
    return new Promise((resolve, reject) => {
      if (!tradeId) {
        return reject(new Error('No trade ID specified in coin flip offer'))
      }
      if (!botId || !botManager.isBotAvailable(botId)) {
        return reject(new Error('Bot is offline'))
      }
      const bot = botManager.getBot(botId)
      bot.cancelTrade(tradeId).then(data => {
        resolve()
      }).catch(reject)
    })
  }

  createGame(user, { side, items }) {
    return new Promise((resolve, reject) => {
      const coinflip = new Coinflip({
        creator: {
          id: user._id,
          name: user.name,
          image: user.image,
          items
        },
        startingSide: side
      })

      coinflip.save()
        .then(coinflipGame => resolve({ user, coinflipGame }))
        .catch(reject)
    })
  }

  checkJoinerStatus(id, offer) {
    Coinflip.findById(id).exec().then(game => {
      if (!game.completed) {
        game.removeJoiner().then(game => {
          this.cancelCoinflipOffer(offer)
          this.publicIo.emit('COINFLIP_UPDATE_GAME', game.toCleanObject())
        }).catch(error => {
          console.log(`Error while handling coinflip request: ${error.message}`)
        })
      }
    }).catch(error => {
      console.log(`Error while handling coinflip request: ${error.message}`)
    })
  }

  createJoinOffer({ user, data: { items, game } }) {
    return new Promise((resolve, reject) => {
      CoinflipOffer.findByGame(game).then(offer => {
        const { botId } = offer
        if (!botManager.isBotAvailable(botId)) {
          return reject(new Error('Bot is unavailable to trade'))
        }

        const bot = botManager.getBot(botId)

        Coinflip.findById(game._id).exec().then(game => {
          new CoinflipOffer({
            _id: generateSecret(),
            userId: user._id,
            tradeUrl: user.tradeUrl,
            gameId: game._id,
            botId: botId,
            userItems: items,
            type: coinflipOfferType.JOIN_GAME
          }).save().then(offer => {
            game.setJoiner(user, items).then(game => {
              this.publicIo.emit('COINFLIP_UPDATE_GAME', game.toCleanObject())
            })
            setTimeout(() => {
              this.checkJoinerStatus(game._id, offer)
            }, 2 * 60 * 1000)
            bot.sendCoinflipRequest(offer).then(tradeOffer => {
              offer.setTradeId(tradeOffer.id)
              resolve(tradeOffer)
            }).catch(reject)
          }).catch(reject)
        }).catch(reject)
      }).catch(reject)
    })
  }

  sendCoinflipRequest({ user, coinflipGame, data }) {
    return new Promise((resolve, reject) => {
      botManager.getNextBot().then(bot => { /* get the next available bot to send an offer */
        new CoinflipOffer({
          _id: generateSecret(),
          userId: user._id,
          tradeUrl: user.tradeUrl,
          gameId: coinflipGame._id, /* coinflip gameId to attach the trade offer to a game */
          botId: bot.client.steamID.getSteamID64(),
          userItems: data.items,
        }).save().then(tradeOffer => { /* use mongoose async to save a newly created trade offer */
          bot.sendCoinflipRequest(tradeOffer).then(offer => { /* return a promise to send a trade offer request to the user */
            tradeOffer.setTradeId(offer.id)
            resolve(offer)
          }).catch(reject)
        }).catch(reject)
      }).catch(reject)
    })
  }

  /*resendCoinflipRequest(tradeOffer) {
    return new Promise((resolve, reject) => {
      if (!tradeOffer || !tradeOffer.botItems || tradeOffer.botItems.length == 0) {
        return reject(new Error('You can only resend winnings offers'))
      }
      new CoinflipOffer({
        _id: generateSecret(),
        userId: tradeOffer.userId,
        tradeUrl: tradeOffer.tradeUrl,
        gameId: tradeOffer.gameId,
        botId: tradeOffer.botId,
        botItems: tradeOffer.botItems,
        type: tradeOffer.type
      }).save().then(newOffer => {
        const { botId } = tradeOffer
        if (!botManager.isBotAvailable(botId)) {
          return reject(new Error('Bot is unavailable to trade'))
        }

        const bot = botManager.getBot(botId)
        bot.sendCoinflipRequest(newOffer).then(offer => {
          newOffer.setTradeId(offer.id)
          resolve(offer)
        }).catch(reject)
      }).catch(reject)
    })
  }*/

  sendGameWinnings(game, coinflipOffer) { /* calculate tickets, see which side the creator started on, then check his percentage based on winning perctenage */
    const gameTotal = getCoinflipTotal(game), creatorTotal = getCreatorTotal(game)
    const percentage = ((creatorTotal / gameTotal) * 100)
    const isBelow50 = (game.startingSide === 'black')
    let winner = game.joiner
    const { botId } = coinflipOffer

    if (game.winningPercentage <= percentage && isBelow50) {
      winner = game.creator
    } else if (game.winningPercentage >= percentage && !isBelow50) {
      winner = game.creator
    }

    const socket = findSocketById(this.secureIo, winner.id)

    User.findById(winner.id).exec().then(user => {
      new CoinflipOffer({
        _id: generateSecret(),
        userId: user._id,
        tradeUrl: user.tradeUrl,
        gameId: game._id, /* coinflip gameId to attach the trade offer to a game */
        botId: botId,
        botItems: [...game.joiner.items, ...game.creator.items],
        type: coinflipOfferType.WINNINGS
      }).save().then(newOffer => {
        if (!botManager.isBotAvailable(botId)) {
          if (socket) {
            socket.emit('NOTIFY', {
              type: 'error',
              message: 'Unable to find bot to trade. Please contact support.'
            })
          }
          return
        }
        const bot = botManager.getBot(botId)
        bot.sendCoinflipRequest(newOffer).then(offer => {
          if (socket) {
            setTimeout(() => {
              socket.emit('COINFLIP_OFFER', offer)
            }, 16 * 1000) // wait till client side animation takes place
          }
          newOffer.setTradeId(offer.id)
        }).catch(error => {
          console.log(`Error while handling coinflip request: ${error.message}`)
        })
      }).catch(error => {
        console.log(`Error while handling coinflip request: ${error.message}`)
      })
    }).catch(error => {
      console.log(`Error while handling coinflip request: ${error.message}`)
    })
  }

  acceptCoinflipRequest(tradeOffer) {

    function handleJoinGame(coinflipOffer) {
      coinflipOffer.setAccepted()
      Coinflip.findByCoinflipOffer(coinflipOffer.toObject()).then(game => game.setCompleted()).then(game => {
        this.publicIo.emit('COINFLIP_UPDATE_GAME', game.toObject()) //can send the secret and percentage now
        this.sendGameWinnings(game.toObject(), coinflipOffer.toObject())
      }).catch(error => {
        console.log(`Error while handling coinflip request: ${error.message}`)
      })
    }

    function handleNewGame(coinflipOffer) {
      coinflipOffer.setAccepted()
      Coinflip.findByCoinflipOffer(coinflipOffer.toObject()).then(game => game.setOpen()).then(game => {
        this.publicIo.emit('COINFLIP_NEW_GAME', game.toCleanObject())
      }).catch(error => {
        console.log(`Error while handling coinflip request: ${error.message}`)
      })
    }

    function handleWinnings(coinflipOffer) {
      coinflipOffer.setAccepted()
    }

    CoinflipOffer.findByTradeOffer(tradeOffer).then(coinflipOffer => {
      if (coinflipOffer.type === coinflipOfferType.JOIN_GAME) {
        handleJoinGame.call(this, coinflipOffer)
      } else if (coinflipOffer.type === coinflipOfferType.NEW_GAME) {
        handleNewGame.call(this, coinflipOffer)
      } else if (coinflipOffer.type === coinflipOfferType.WINNINGS) {
        handleWinnings.call(this, coinflipOffer)
      }
    }).catch(error => {
      console.log(`Error while handling coinflip request: ${error.message}`)
    })
  }

  declineCoinflipRequest(tradeOffer, reason) {

    function handleJoinGame(coinflipOffer, reason) {
      coinflipOffer.setFailed(reason)
      Coinflip.findByCoinflipOffer(coinflipOffer.toObject()).then(game => {
        return game.removeJoiner()
      }).then(game => {
        this.publicIo.emit('COINFLIP_UPDATE_GAME', game.toCleanObject())
      }).catch(error => {
        console.log(`Error while handling coinflip request: ${error.message}`)
      })
    }

    function handleNewGame(coinflipOffer, reason) {
      const socket = findSocketById(this.secureIo, coinflipOffer.userId)

      coinflipOffer.setFailed(reason)
      Coinflip.findByCoinflipOffer(coinflipOffer.toObject()).then(game => {
        return game.setFailed()
      }).then(game => {
        if (socket) {
          socket.emit('NOTIFY', {
            type: 'error',
            message: 'Your coinflip game has been canceled'
          })
        }
        return true
      }).catch(error => {
        console.log(`Error while handling coinflip request: ${error.message}`)
      })
    }

    function handleWinnings(coinflipOffer, reason) {
      coinflipOffer.setFailed(reason)
    }

    CoinflipOffer.findByTradeOffer(tradeOffer).then(coinflipOffer => {
      if (coinflipOffer.type === coinflipOfferType.JOIN_GAME) {
        handleJoinGame.call(this, coinflipOffer, reason)
      } else if (coinflipOffer.type === coinflipOfferType.NEW_GAME) {
        handleNewGame.call(this, coinflipOffer, reason)
      } else if (coinflipOffer.type === coinflipOfferType.WINNINGS) {
        handleWinnings.call(this, coinflipOffer, reason)
      }
    }).catch(error => {
      console.log(`Error while handling coinflip request: ${error.message}`)
    })
  }

  declineCoinflipRequestAsync(tradeOffer, reason) {

    function handleNewGame(coinflipOffer, reason) {
      return new Promise((resolve, reject) => {
        coinflipOffer.setFailed(reason)
        Coinflip.findByCoinflipOffer(coinflipOffer.toObject()).then(game => {
          this.cancelCoinflipOffer(coinflipOffer)
          return game.setFailed()
        }).then(resolve).catch(reject)
      })
    }

    function handleJoinGame(coinflipOffer, reason) {
      return new Promise((resolve, reject) => {
        coinflipOffer.setFailed(reason)
        Coinflip.findByCoinflipOffer(coinflipOffer.toObject()).then(game => {
          this.cancelCoinflipOffer(coinflipOffer)
          return game.removeJoiner()
        }).then(game => {
          this.publicIo.emit('COINFLIP_UPDATE_GAME', game.toCleanObject())
          resolve()
        }).catch(reject)
      })
    }

    function handleWinnings(coinflipOffer) {
      this.cancelCoinflipOffer(coinflipOffer)
      return coinflipOffer.setFailed(reason)
    }

    return new Promise((resolve, reject) => {
      CoinflipOffer.findByTradeOffer({ tradeId: tradeOffer._id }).then(coinflipOffer => {
        if (coinflipOffer.type === coinflipOfferType.JOIN_GAME) {
          return handleJoinGame.call(this, coinflipOffer, reason)
        } else if (coinflipOffer.type === coinflipOfferType.NEW_GAME) {
          return handleNewGame.call(this, coinflipOffer, reason)
        } else if (coinflipOffer.type === coinflipOfferType.WINNINGS) {
          return handleWinnings.call(this, coinflipOffer, reason)
        }
        return false
      }).then(resolve).catch(reject)
    })
  }

}

const coinflip = new CoinflipManager()

export { coinflip }
