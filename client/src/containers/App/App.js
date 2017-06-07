import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { NotificationContainer, NotificationManager } from 'react-notifications'
import { saveTradeURL as tradeURLAction, loadAuth, reloadAuth } from '../../actions'
import { Header, TradeURLModal } from '../../components'
import { Chat, Landing } from '../index'
import Routes from '../../routes'
import { isTradeURL } from '../../util/url'

import './App.css'
import 'react-notifications/lib/notifications.css';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-theme.css'
import 'semantic-ui-css/semantic.min.css';
import background from '../../static/bg.jpg'
import cube from '../../static/cube.svg'

class App extends Component {

  constructor(props) {
    super(props)

    this.saveTradeURL = this.saveTradeURL.bind(this)

    this.state = {
      tradeUrlModal: false
    }
  }

  componentWillMount() {
    if (!this.props.auth.loaded) {
      this.props.loadAuth()
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.auth.user && nextProps.auth.user) {
      setTimeout(() => {
        this.setState({
          tradeUrlModal: !nextProps.auth.user.tradeUrl
        })
      }, 1000)
    }

    if (nextProps.userState.forceRefresh && !this.props.auth.reloading) {
      this.props.reloadAuth()
      NotificationManager.success('Trade URL saved successfully')
      this.setState({
        tradeUrlModal: false
      })
    }

  }

  saveTradeURL({ inputRef: { value } }) {
    if (!value || !isTradeURL(value)) {
      NotificationManager.error('Enter a valid trade URL')
      return;
    }
    this.props.tradeURLAction(value)
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
            {!user &&
              <Landing />
            }
            <Header user={user} actions />
            <Chat secureSocket={this.props.secureSocket} />
            <Routes secureSocket={this.props.secureSocket} publicSocket={this.props.publicSocket} />
            <div className="App__Background noselect">
              <img src={background} alt="background" />
              <div className="App__Background-Wrapper"></div>
            </div>
            <TradeURLModal userState={this.props.userState} onClick={this.saveTradeURL} isOpen={this.state.tradeUrlModal} close={() => this.setState({tradeUrlModal: false})} />
          </div>
        ) }
        <NotificationContainer />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    userState: state.user,
    notify: state.notify
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    loadAuth,
    tradeURLAction,
    reloadAuth
  }, dispatch)
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App))
