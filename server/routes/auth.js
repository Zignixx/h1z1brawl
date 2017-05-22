import { Router } from 'express'
import passport from 'passport'
import config from '../../config'

const router = Router()

router.get('/auth/steam', passport.authenticate('steam'))

router.get('/auth/steam/return', passport.authenticate('steam', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect(config.app.url)
  }
)

router.get('/auth/loadAuth', (req, res) => {
  res.end(JSON.stringify(req.user))
})

router.get('/auth/logout', (req, res) => {
  req.logout()
  res.redirect(config.app.url)
})

export default router
