import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Jackpot from './containers/Jackpot'
import Leaderboards from './containers/Leaderboards'
import User from './containers/User'
import FAQ from './components/FAQ'
import Giveaway from './containers/Giveaway'
import { Admin, Coinflip } from './containers'


const Routes = ({ secureSocket, publicSocket }) => (
  <main>
    <Switch>
      <Route exact path="/" render={props => <Coinflip secureSocket={secureSocket} publicSocket={publicSocket} {...props} />} />
      <Route path="/jackpot" component={Jackpot} />
      <Route path="/coinflip" render={props => <Coinflip secureSocket={secureSocket} publicSocket={publicSocket} {...props} />} />
      {/*<Route path="/user/:id?" component={User} />*/}
      <Route path="/faq" component={FAQ} />
      <Route path="/leaderboards" component={Leaderboards} />
      <Route path="/giveaway" component={Giveaway} />
      {/*<Route path="/admin" component={Admin} />*/}
    </Switch>
  </main>
)

export default Routes
