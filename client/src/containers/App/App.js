import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { NotificationContainer, NotificationManager } from 'react-notifications'

import { loadAuth } from '../../actions/auth'
import { Header } from '../../components'
import { Chat, Landing } from '../index'
import Routes from '../../routes'

import './App.css'
import 'react-notifications/lib/notifications.css';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-theme.css'
import background from '../../static/bg.jpg'
import cube from '../../static/cube.svg'

class App extends Component {

  componentWillMount() {
    if (!this.props.auth.loaded) {
      this.props.loadAuth()
    }
  }

  render() {
    const { user, loading } = this.props.auth
    return (
      <div className="App">
        { loading ? (
          <div className="App__Loading">
            <img src={cube} alt="loading" />
          </div>
        ) : (
          <div>
          <Header user={user} actions />
          <Chat secureSocket={this.props.secureSocket} />
          {!user &&
            <Landing />
          }
          <Routes />
          <div className="App__Background">
            <img src={background} alt="background" />
            <div className="App__Background-Wrapper"></div>
          </div>
          </div>
        ) }
        <NotificationContainer />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
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
