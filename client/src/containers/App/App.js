import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { NotificationContainer, NotificationManager } from 'react-notifications'
import { Modal } from 'semantic-ui-react'
import { loadAuth } from '../../actions/auth'
import { Header } from '../../components'
import { Chat, Landing } from '../index'
import Routes from '../../routes'

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
      //user has logged in
      this.setState({
        tradeUrlModal: !nextProps.auth.user.tradeUrl
      })
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
            <div className="App__Background noselect">
              <img src={background} alt="background" />
              <div className="App__Background-Wrapper"></div>
            </div>
            <Modal
              open={this.state.tradeUrlModal}
              onClose={() => this.setState({ tradeUrlModal: false })}
              size="small"
              dimmer={true}
              transition="slide">
              <Modal.Header>
                <p>yo</p>
              </Modal.Header>
              <Modal.Content>
                <p>hi</p>
              </Modal.Content>
            </Modal>
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
