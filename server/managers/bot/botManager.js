import bots from '../../../bots'
import { default as Bot } from './bot'

const { accounts, settings } = bots

class BotManager {

  constructor() {
    this.bots = []
    this.currentBotIndex = 0
    this.loadBots()
  }

  loadBots() {
    for (const bot of Object.values(accounts)) {
      this.loadBot({ ...bot, ...settings })
    }
  }

  loadBot(options) {
    const bot = new Bot(options)
    this.bots.push(bot)
    bot.init()
  }

  checkBotsAvailability() {
    for (const bot of Object.values(this.bots)) {
      if (bot.enabled) {
        return true
      }
    }
    return false
  }

  getNextBot() {
    return new Promise((resolve, reject) => {
      if (this.bots.length == 0 || !this.checkBotsAvailability()) {
        reject(new Error('No available bots to trade'))
      }

      const nextBot = () => {
        if (this.currentBotIndex >= this.bots.length) {
          this.currentBotIndex = 0;
        }

        const bot = this.bots[this.currentBotIndex];
        this.currentBotIndex++;

        if (bot && bot.enabled) {
          return bot;
        } else {
          return nextBot();
        }
      }

      const bot = nextBot()

      resolve(bot)
    })
  }

}

const bot = new BotManager()

export { bot }
