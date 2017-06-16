import React from 'react'
import { Route, Switch } from 'react-router-dom'

import { Admin, Coinflip, Jackpot, History } from './containers'
import { FAQ, Giveaway } from './components'


const Routes = ({ secureSocket, publicSocket }) => (
  <main>
    <Switch>
      <Route exact path="/" render={props => <Coinflip secureSocket={secureSocket} publicSocket={publicSocket} {...props} />} />
      <Route path="/jackpot" render={props => <Jackpot secureSocket={secureSocket} publicSocket={publicSocket} {...props} />} />
      <Route path="/coinflip" render={props => <Coinflip secureSocket={secureSocket} publicSocket={publicSocket} {...props} />} />
      {/*<Route path="/user/:id?" component={User} />*/}
      <Route path="/faq" component={FAQ} />
      <Route path="/history" component={History} />
      <Route path="/giveaway" component={Giveaway} />
      {/*<Route path="/admin" component={Admin} />*/}
    </Switch>
  </main>
)

export default Routes
