import React from 'react'
import { Route, Switch } from 'react-router-dom'

import { Admin, Coinflip, Jackpot, History, AdminRoute } from './containers'
import { FAQ, Giveaway, NotFound } from './components'


const Routes = ({ secureSocket, publicSocket }) => (
  <main>
    <Switch>
      <Route exact path="/" render={props => <Jackpot secureSocket={secureSocket} publicSocket={publicSocket} {...props} />} />
      <Route path="/jackpot" render={props => <Jackpot secureSocket={secureSocket} publicSocket={publicSocket} {...props} />} />
      <Route path="/coinflip" render={props => <Coinflip secureSocket={secureSocket} publicSocket={publicSocket} {...props} />} />
      <Route path="/faq" component={FAQ} />
      <Route path="/history" render={props => <History publicSocket={publicSocket} {...props} />} />
      <Route path="/giveaway" component={Giveaway} />
      <AdminRoute path="/admin" component={Admin} />
      <Route component={NotFound} />
    </Switch>
  </main>
)

export default Routes
