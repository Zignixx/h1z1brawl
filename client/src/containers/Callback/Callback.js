import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { replace } from 'react-router-redux'
import { loadAuth } from '../../actions/auth'
import { alert } from '../../actions/alert'
import { NotificationManager } from 'react-notifications'

import './Callback.css'
import cube from '../../static/cube.svg'

class Callback extends Component {

  componentWillMount() {
    if (this.props.loaded) {
      this.props.replace('/')
    } else {
      this.props.loadAuth();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      NotificationManager.error('Authorixzation', `Error while logging in: ${nextProps.error}`)
      this.props.replace('/')
    } else if (nextProps.loaded) {
      this.props.replace('/')
      NotificationManager.success('Authorization', 'You have been logged in')
    }
  }

  render() {
    return (
      <div className="Callback">
        <img src={cube} alt="loading" />
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    loaded: state.auth.loaded,
    loading: state.auth.loading,
    error: state.auth.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    replace,
    loadAuth,
    alert
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Callback)
