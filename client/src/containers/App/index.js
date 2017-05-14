import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Header from '../../components/Header'
import Chat from '../Chat'
import Landing from '../Landing'
import Routes from '../../routes'

import './App.css'
import background from '../../static/bg.jpg'

class App extends Component {
  render() {
    const { loggedIn, user } = this.props
    return (
      <div className="App">
        <Header user={user} actions />
        <Chat />
        {loggedIn &&
          <Landing />
        }
        <Routes />
        <div className="App__Background">
          <img src={background} alt="background" />
          <div className="App__Background-Wrapper"></div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    loggedIn: state.auth.loggedIn,
    loaded: state.auth.loaded
  }
}

export default withRouter(connect(
  mapStateToProps
)(App))
