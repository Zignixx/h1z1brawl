import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import FontAwesome from 'react-fontawesome'
import { Row, Col } from 'react-bootstrap'

import './Landing.css'
import logo from '../../static/logo.png'
import Stat from '../../components/Stat'

class Landing extends Component {

  constructor(props) {
    super(props)
    this.handleStatClick = this.handleStatClick.bind(this)

    this.state = {
      jackpotLoading: (!this.props.jackpotStats.loaded || this.props.jackpotStats.loading),
      coinflipLoading: (!this.props.coinflipStats.loaded || this.props.coinflipStats.loading),
      statInterval: 3
    }
  }

  handleStatClick(days) {
    this.setState({
      statInterval: days
    })
    console.log(this)
    //TODO dispatch action to update stats
  }

  render() {

    const { jackpotStats, coinflipStats, currentUsers } = this.props
    const { statInterval, jackpotLoading, coinflipLoading } = this.state

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
              <Stat title="PLAYING NOW" data={`${currentUsers}+`} />
            </Col>
          </Row>
          <div className="Landing__Stats-Selector">
            <span onClick={() => this.handleStatClick(3)}>3 days</span>
            <span onClick={() => this.handleStatClick(7)}>7 days</span>
            <span onClick={() => this.handleStatClick(30)}>30 days</span>
          </div>
        </div>
        <hr />
        <a className="Landng__EnterButton" href="auth/steam">
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
    currentUsers: state.app.users
  }
}

const mapDispatchToProps = (dispatch) => {}

export default connect(
  mapStateToProps
)(Landing)
