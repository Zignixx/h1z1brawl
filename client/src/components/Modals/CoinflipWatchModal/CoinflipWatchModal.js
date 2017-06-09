import React, { Component } from 'react'
import Modal from 'react-modal'
import { Row, Col } from 'react-bootstrap'
import { getUserTotal, getCoinflipTotal } from '../../../util/coinflip'
import black from '../../../static/coin-heads.png'
import red from '../../../static/coin-tails.png'

import './CoinflipWatchModal.css'

const IMAGE_URL = 'https://steamcommunity-a.akamaihd.net/economy/image/'

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

  renderGame() {
    const { game } = this.props
    return (
      <Row>
        <Col xs={6}>
          { this.renderUser(game.creator, game.startingSide === 'black' ? black : red, this.getCreatorPercent(game)) }
        </Col>
        <Col xs={6}>
          { this.renderUser(game.joiner, game.startingSide === 'black' ? red : black, this.getJoinerPercent(game)) }
        </Col>
      </Row>
    )
  }

  getCreatorPercent(game) {
    if (game.joiner.items.length == 0) {
      return '--'
    }
    const total = getCoinflipTotal(game)
    const creatorTotal = getUserTotal(game.creator)
    return (creatorTotal / total) * 100
  }

  getJoinerPercent(game) {
    if (game.joiner.items.length == 0) {
      return '--'
    }
    const total = getCoinflipTotal(game)
    const joinerTotal = getUserTotal(game.joiner)
    return (joinerTotal / total) * 100
  }

  renderUser(user, side, percent) {
    if (!user.image) {
      return null
    }
    return (
      <div>
        <img className="User" src={user.image} alt="user" />
        <img className="Side" src={side} alt="side" />
        <p>{user.name}</p>
        <span>${getUserTotal(user)}</span>
        { this.renderItems(user, percent) }
      </div>
    )
  }

  renderItems(user, percent) {
    if (user.items.length === 0) {
      return (<div className="Items">Waiting...</div>)
    }
    const items = user.items.map((item, key) => (
      <CoinflipWatchItem item={item} key={key} />
    ))
    return (
      <div className="Items">
        <div className="Item Center">{`${percent}%`}</div>
        {items}
      </div>
    )
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
