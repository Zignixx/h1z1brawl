import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { NotificationContainer } from 'react-notifications'

import { loadAuth } from '../../actions/auth'
import { Header } from '../../components'
import { Chat, Landing } from '../index'
import Routes from '../../routes'

import './App.css'
import 'react-notifications/lib/notifications.css';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-theme.css'
import background from '../../static/bg.jpg'

class App extends Component {

  componentWillMount() {
    if (!this.props.loaded) {
      this.props.loadAuth()
    }
  }

  render() {
    const { user } = this.props
    return (
      <div className="App">
        <Header user={user} actions />
        <Chat />
        {!user &&
          <Landing />
        }
        <Routes />
        <div className="App__Background">
          <img src={background} alt="background" />
          <div className="App__Background-Wrapper"></div>
        </div>
        <NotificationContainer />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    loaded: state.auth.loaded
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    loadAuth
  }, dispatch)
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App))
