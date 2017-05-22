import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import FontAwesome from 'react-fontawesome'
import { Row, Col } from 'react-bootstrap'
import config from '../../../../config'

import logo from '../../static/logo.png'
import { getConnectedUsers } from '../../actions/users'
import { Stat } from '../../components'
import './Landing.css'

class Landing extends Component {

  constructor(props) {
    super(props)
    this.handleStatClick = this.handleStatClick.bind(this)

    this.state = {
      jackpotLoading: (!this.props.jackpotStats.loaded || this.props.jackpotStats.loading),
      coinflipLoading: (!this.props.coinflipStats.loaded || this.props.coinflipStats.loading),
      usersLoading: (!this.props.users.loaded || this.props.users.loading),
      statInterval: 3
    }
  }

  componentWillMount() {
    this.props.getConnectedUsers()
    //TODO dispatch action to get stats
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      jackpotLoading: (!nextProps.jackpotStats.loaded || nextProps.jackpotStats.loading),
      coinflipLoading: (!nextProps.coinflipStats.loaded || nextProps.coinflipStats.loading),
      usersLoading: (!nextProps.users.loaded || nextProps.users.loading)
    })
  }

  handleStatClick(days) {
    this.setState({
      statInterval: days
    })
    console.log(this)
    //TODO dispatch action to update stats
  }

  render() {
    console.log(config.api.host)
    const { jackpotStats, coinflipStats, users } = this.props
    const { statInterval, jackpotLoading, coinflipLoading, usersLoading } = this.state

    return (
      <div className="Landing">
        <img src={logo} alt="Logo"/>
        <h1>The number one gambling site<br />for H1Z1:KotK</h1>
        <hr />
        <div className="Landing__Stats">
          <Row className="show-grid">
            <Col sm={6} md={4}>
              <Stat title="WON ON JACKPOT" data={jackpotStats.won[statInterval]} loading={jackpotLoading} />
            </Col>
            <Col sm={6} md={4}>
              <Stat title="WON ON COINFLIP" data={coinflipStats.won[statInterval]} loading={coinflipLoading} />
            </Col>
            <Col sm={6} md={4}>
              <Stat title="USERS" data={`${users.count}+`} loading={usersLoading} />
            </Col>
          </Row>
          <div className="Landing__Stats-Selector">
            <span onClick={() => this.handleStatClick(3)}>3 days</span>
            <span onClick={() => this.handleStatClick(7)}>7 days</span>
            <span onClick={() => this.handleStatClick(30)}>30 days</span>
          </div>
        </div>
        <hr />
        <a className="Landng__EnterButton" href={`${config.api.host}api/auth/steam`}>
          <FontAwesome name='steam' />
          <p>Enter Now</p>
        </a>
        <div className="Landing__TOS">
          <p>
            BY CLICKING THE "ENTER NOW" BUTTON, YOU CONFIRM THAT YOU ARE AT LEAST 18 YEARS OLD <br />
            AND THAT YOU HAVE <a href="/tos">READ & AGREED TO OUR TERMS AND CONDITIONS.</a>
          </p>
        </div>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    jackpotStats: state.jackpot.stats,
    coinflipStats: state.coinflip.stats,
    users: state.users
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getConnectedUsers
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Landing)
