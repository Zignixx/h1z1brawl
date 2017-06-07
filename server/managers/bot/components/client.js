import { default as Bot } from '../bot'
import SteamUser from 'steam-user'
import SteamTotp from 'steam-totp'

Bot.prototype.createClient = function() {
  this.client = new SteamUser()
  this.client.options.promptSteamGuardCode = false

  this.client.logOn({
    accountName: this.accountName,
    password: this.password,
    twoFactorCode: SteamTotp.generateAuthCode(this.sharedSecret)
  })

  this.client.on('loggedOn', this.loggedOn.bind(this))
  this.client.on('disconnected', this.disconnected.bind(this))
  this.client.on('steamGuard', this.steamGuard.bind(this))
  this.client.on('webSession', this.webSession.bind(this))
  this.client.on('error', this.error.bind(this))
}

Bot.prototype.error = function(err) {
  this.log(`error in steam-user: ${err}`)
}

Bot.prototype.logOut = function() {
  if (!this.client) {
    return
  }
  this.client.logOff()
}

Bot.prototype.webSession = function(sessionId, cookies) {
  this.setSteamCookies(cookies)
}

Bot.prototype.disconnected = function(eresult, message) {
  this.log(`disconnected from Steam (${eresult} - ${message})`)
}

Bot.prototype.loggedOn = function() {
  this.log('logged onto Steam')
}

Bot.prototype.steamGuard = function(domain, callback) {
  callback(SteamTotp.generateAuthCode(this.sharedSecret))
}
