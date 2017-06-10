import React, { Component } from 'react'
import Modal from 'react-modal'
import { Row, Col } from 'react-bootstrap'
import { getUserTotal, getCoinflipTotal, didCreatorWin } from '../../../util/coinflip'
import { CountDownTimer } from '../../'
import black from '../../../static/coin-heads.png'
import red from '../../../static/coin-tails.png'

import './CoinflipWatchModal.css'

const IMAGE_URL = 'https://steamcommunity-a.akamaihd.net/economy/image/'
const WAITING_COUNTDOWN = 120
const COMPLETION_COUNTDOWN = 10

class CoinflipWatchItem extends Component {
  render() {
    return (
      <div className="Item">
        <img src={`${IMAGE_URL}${this.props.item.icon_url}`} alt="item" />
        <div>
          <p>{this.props.item.name}</p>
          <span>{this.props.item.price}</span>
        </div>
      </div>
    )
  }
}

export default class CoinflipWatchModal extends Component {

  constructor(props) {
    super(props)

    this.state = {
      animateFlip: false,
      animationDone: false
    }
  }

  renderGame() {
    const { game } = this.props
    return (
      <Row>
        <Col xs={6}>
          { this.renderUser(game.creator, game.startingSide === 'black' ? black : red, this.getCreatorPercent(game), this.state.animationDone ? (this.didCreatorWin ? 'winner' : 'loser') : '') }
        </Col>
        <Col xs={6}>
          { this.renderUser(game.joiner, game.startingSide === 'black' ? red : black, this.getJoinerPercent(game), this.state.animationDone ? (this.didCreatorWin ? 'loser' : 'winner') : '') }
        </Col>
        <div className="Status">
          { this.getStatus() }
        </div>
      </Row>
    )
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.game && this.props.game) {
      if (nextProps.game._id !== this.props.game._id) {
        this.setState({ animateFlip: false, animationDone: false })
      }
    }
  }

  flipCoin(winningSide) {
    setTimeout(() => {
      this.setState({ animateFlip: false, animationDone: true })
    }, 6000)
    return (
      <div className="FlipContainer"><div className={`Flip ${winningSide}`}></div></div>
    )
  }

  displayWinner(winningSide, roll) {
    return (
      <div className="Winner">
        <img src={winningSide === 'black' ? black : red} />
        <p>Roll: <span>{roll}</span></p>
      </div>
    )
  }

  getStatus() {
    const { game } = this.props
    if (this.state.animationDone) {
      return this.displayWinner(this.didCreatorWin ? game.startingSide : (game.startingSide === 'black' ? 'red' : 'black'), game.winningPercentage)
    } else if (!game.joiner.id) { /* no one has joined the game */
      return (<p>Waiting...</p>)
    } else if (this.state.animateFlip) {
      this.didCreatorWin = didCreatorWin(game)
      return this.flipCoin(this.didCreatorWin ? game.startingSide : (game.startingSide === 'black' ? 'red' : 'black'))
    } else if (game.joiner.id && !game.completed) { /* waiting for the joiner to accept trade (120 second cooldown) */
      const secondsRemaining = WAITING_COUNTDOWN - this.getSecondsElapsed(game.waitingStartTime)
      return <CountDownTimer
               seconds={secondsRemaining}
               color="rgba(154, 51, 51, 0.86)"
             />
    } else if (game.completed) { /* game has completed, countdown the timer then flip or just render the winner */
      const secondsRemaining = COMPLETION_COUNTDOWN - this.getSecondsElapsed(game.completedStartTime)
      return <CountDownTimer
               seconds={secondsRemaining}
               color="rgb(95, 144, 112)"
               onComplete={() => this.setState({ animateFlip: true })}
             />
    }
  }

  getSecondsElapsed(time) {
    if (!time) {
      return 0
    }
    return parseInt((new Date().getTime() - time) / 1000)
  }

  getCreatorPercent(game) {
    if (game.joiner.items.length == 0) {
      return '--'
    }
    const total = getCoinflipTotal(game)
    const creatorTotal = getUserTotal(game.creator)
    return Number((creatorTotal / total) * 100).toFixed(3)
  }

  getJoinerPercent(game) {
    if (game.joiner.items.length == 0) {
      return '--'
    }
    const total = getCoinflipTotal(game)
    const joinerTotal = getUserTotal(game.joiner)
    return Number((joinerTotal / total) * 100).toFixed(3)
  }

  renderUser(user, side, percent, resultClass) {
    if (!user.image) {
      return null
    }
    return (
      <div className={`UserDisplay ${resultClass}`}>
        <img className="User" src={user.image} alt="user" />
        <img className="Side" src={side} alt="side" />
        <p>{user.name}</p>
        <span>${Number(getUserTotal(user)).toFixed(2)}</span>
        { this.renderItems(user, percent) }
      </div>
    )
  }

  renderItems(user, percent) {
    if (user.items.length === 0) {
      return (<div className="Waiting">Waiting...</div>)
    }
    const items = this.sortItems(user.items).map((item, key) => (
      <CoinflipWatchItem item={item} key={key} />
    ))
    return (
      <div className="Items">
        <div className="Item Center">{`${percent}%`}</div>
        {items}
      </div>
    )
  }

  sortItems(items) {
    return items.sort((a, b) => b.price - a.price)
  }

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        onRequestClose={this.props.onClose}
        closeTimeoutMS={200}
        onAfterOpen={this.afterOpen}
        contentLabel="Modal"
        className="Modal Modal__WatchCoinflip"
        overlayClassName="Modal__Overlay"
      >
        <div className="Modal__Header">
          <h1>Watching</h1>
          <a onClick={this.props.onClose}><i className="fa fa-times" /></a>
        </div>
        <div className="Modal__Content">
          {this.props.game &&
            this.renderGame()
          }
        </div>
        <div className="Modal__Footer">
          <p>Hash: <span>{this.props.game ? this.props.game.hash : ''}</span></p>
        </div>
      </Modal>
    )
  }

}
