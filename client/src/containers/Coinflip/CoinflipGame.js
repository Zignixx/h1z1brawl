import React, { Component } from 'react'
import CoinflipGameItem from './CoinflipGameItem'
import { Popup } from 'semantic-ui-react'
import black from '../../static/coin-heads.png'
import red from '../../static/coin-tails.png'
import noUser from '../../static/no-user.jpg'

const IMAGE_URL = 'https://steamcommunity-a.akamaihd.net/economy/image/'

export default class CoinflipGame extends Component {

  /* props
   *
   *  game - the game object to render
   *    side
   *
   *
   */

  renderItems() {
    const sorted = this.sortedItems()
    if (sorted.length > 6) {
      const items = sorted.slice(0, 5).map((item, key) => (
        <CoinflipGameItem key={key} name={item.name} image={`${IMAGE_URL}${item.icon_url}`} price={item.price} />
      ))
      return (
        {items},
        <span>+{sorted.length - 6} more items...</span>
      )
    }
    return sorted.map((item, key) => (
      <CoinflipGameItem key={key} name={item.name} image={`${IMAGE_URL}${item.icon_url}`} price={item.price} />
    ))
  }

  sortedItems() {
    return this.props.game.creator.items.sort((a, b) => {
      return b.price - a.price
    })
  }

  getTotalValue() {
    let total = 0.00
    for (const index in this.props.game.creator.items) {
      const item = this.props.game.creator.items[index]
      if (item && item.price) {
        total += Number(item.price)
      }
    }
    if (this.props.game.joiner && this.props.game.joiner.items) {
      for (const index in this.props.game.joiner.items) {
        const item = this.props.game.joiner.items[index]
        if (item && item.price) {
          total += Number(item.price)
        }
      }
    }
    return parseFloat(Number(total).toFixed(2))
  }

  getRange(totalValue) {
    const range = (totalValue * 0.05)
    return [Number(totalValue - range).toFixed(2), Number(totalValue + range).toFixed(2)]
  }

  getNumberData() {
    const totalValue = this.getTotalValue()
    const [low, high] = this.getRange(totalValue)
    return [Number(totalValue).toFixed(2), low, high]
  }

  getStartingSide() {
    if (this.props.game.startingSide === 'red') {
      return red
    }
    return black
  }

  getPlayers() {
    const { creator, joiner } = this.props.game

    return (
      <div>
        <Popup
          inverted
          content={creator.name}
          trigger={<img src={creator.image} alt="user1" />} />
        <span>vs.</span>
        <Popup
          inverted
          content={joiner.name ? joiner.name : ''}
          trigger={joiner.image ? (
            <img src={joiner.image} alt="user2" />
          ) : (
            <div className="None"></div>
          )} />
      </div>
    )
  }

  render() {
    const [totalValue, lowMargin, highMargin] = this.getNumberData()
    return (
      <tr className="Coinflip__Game">
        <td className="Coinflip__Side">
          <img src={this.getStartingSide()} alt="side" />
        </td>
        <td className="Coinflip__Players">
          { this.getPlayers() }
        </td>
        <td className="Coinflip__Items">
          { this.renderItems() }
        </td>
        <td className="Coinflip__Value">
          <span>{`$${totalValue}`}</span>
          <p><span>{`${lowMargin} - ${highMargin}`}</span></p>
        </td>
        <td className="Coinflip__Status">
          <span>Open</span>
        </td>
        <td className="Coinflip__Actions">
          <a className="noselect create" onClick={this.props.onJoin}>
            <span>Join</span>
            <div>
              <i className="fa fa-sign-in"></i>
            </div>
          </a>
          <a className="noselect watch" onClick={this.props.onWatch}>
            <span>Watch</span>
            <div>
              <i className="fa fa-eye"></i>
            </div>
          </a>
        </td>
      </tr>
    )
  }

}
