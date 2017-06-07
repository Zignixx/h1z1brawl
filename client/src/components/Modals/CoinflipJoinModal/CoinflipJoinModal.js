import React, { Component } from 'react'
import Modal from 'react-modal'
import config from '../../../../../config'
import { CoinflipInventoryItem } from '../../../containers'
import { NotificationManager } from 'react-notifications'
import { getCoinflipRange, getCoinflipTotal } from '../../../util/coinflip'

import './CoinflipJoinModal.css'

const IMAGE_URL = 'https://steamcommunity-a.akamaihd.net/economy/image/'

const { minItems, maxItems, minAmount, itemThreshold } = config.coinflip

export default class CoinflipJoinModal extends Component {

  constructor(props) {
    super(props)

    this.afterOpen = this.afterOpen.bind(this)
    this.clearItems = this.clearItems.bind(this)
    this.joinGame = this.joinGame.bind(this)

    this.state = {
      selectedItems: []
    }
  }

  joinGame() {
    const betValue = this.getTotalSelectedPrice(), itemsSelected = this.getSelectedCount()
    const [priceLow, priceHigh] = getCoinflipRange(this.props.game)
    if (betValue < priceLow) {
      return NotificationManager.error(`Bet must be at least $${priceLow}`)
    } else if (itemsSelected < minItems || itemsSelected > maxItems) {
      return NotificationManager.error(`You must select between ${minItems} and ${maxItems} items`)
    } else if (betValue > priceHigh) {
      return NotificationManager.error(`Bet must be less than $${priceHigh}`)
    }
    this.props.onClose()
    //TODO this.props.createGame({ side: this.state.selected, items: this.getSelectedItems() })
  }

  renderItems() {
    const { items, error, loading } = this.props.inventory
    if (loading) {
       return (
         <i className="fa fa-spinner fa-pulse fa-3x fa-fw ItemLoading"></i>
       )
    } else if (error) {
      return (
        <div className="Modal__CreateCoinflip-Error">
          <span>You do not have any tradeable H1Z1:KotK items or Steam is offline.</span>
        </div>
      )
    }
    return items.map((item, key) => (
      <CoinflipInventoryItem
        name={item.name}
        image={`${IMAGE_URL}${item.icon_url}`}
        selected={this.isSelected(key)}
        price={item.price} key={key}
        disabled={item.price < itemThreshold}
        unselect={() => this.unselectItem(key)}
        select={() => this.selectItem(key)}
      />
    ))
  }

  isSelected(key) {
    for (var index in this.state.selectedItems) {
      if (this.state.selectedItems[index] === key) {
        return true
      }
    }
    return false
  }

  selectItem(index) {
    this.setState({
      selectedItems: this.state.selectedItems.concat([index])
    })
  }

  unselectItem(index) {
    this.setState({
      selectedItems: this.state.selectedItems.filter((el) => el !== index)
    })
  }

  clearItems() {
    this.setState({
      selectedItems: []
    })
  }

  getSelectedCount() {
    return this.state.selectedItems.length
  }

  getSelectedItems() {
    const array = []
    for (var index in this.state.selectedItems) {
      array.push(this.props.inventory.items[this.state.selectedItems[index]])
    }
    return array
  }

  getTotalSelectedPrice() {
    let total = 0.00
    for (var index in this.state.selectedItems) {
      total += Number(this.props.inventory.items[this.state.selectedItems[index]].price)
    }
    return Number(total).toFixed(2)
  }

  getTotalInventoryPrice() {
    let total = 0.00
    for (var index in this.props.inventory.items) {
      total += Number(this.props.inventory.items[index].price)
    }
    return Number(total).toFixed(2)
  }

  getPercentage() {
    const total = parseFloat(getCoinflipTotal(this.props.game))
    const selectedPrice = parseFloat(this.getTotalSelectedPrice())

    const gameTotal = total + selectedPrice

    return Number((selectedPrice / gameTotal) * 100).toFixed(2)
  }

  afterOpen() {
    this.props.loadInventory()
  }

  render() {
    const [priceLow, priceHigh] = getCoinflipRange(this.props.game)
    const betValue = this.getTotalSelectedPrice(), itemsSelected = this.getSelectedCount(), percentage = this.getPercentage()
    const betClass = (betValue >= priceLow && betValue <= priceHigh) ? 'good' : 'bad'
    const itemClass = (itemsSelected >= minItems && itemsSelected <= maxItems) ? 'good' : 'bad'

    return (
      <Modal
        isOpen={this.props.isOpen}
        onRequestClose={this.props.onClose}
        closeTimeoutMS={200}
        onAfterOpen={this.afterOpen}
        contentLabel="Modal"
        className="Modal Modal__CreateCoinflip-Created"
        overlayClassName="Modal__Overlay"
      >
        <div className="Modal__Header">
          <h1>Join game...</h1>
          <a onClick={this.props.onClose}><i className="fa fa-times" /></a>
        </div>
        <div className={'Modal__Content Modal__CreateCoinflip-Content'}>
          <h4>Add your items to the coin flip</h4>
          <p>Min bet ${priceLow} - Max items {maxItems}</p>
          <a className="noselect" onClick={this.props.forceRefreshInventory}>
            <span>Force Refresh</span>
            <div>
              <i className="fa fa-refresh" />
            </div>
          </a>
          <div className="Modal__CreateCoinflip-Items">
            { this.renderItems() }
          </div>
          <div className="Modal__CreateCoinflip-Input">
            <p className="InputHeader"><span>Values</span></p>
            <div className="Modal__CreateCoinflip-Values Modal__JoinCoinflip--Values">
              <p className="BetValue">Bet Value <span className={betClass}>{`$${betValue}`}</span></p>
              <p className="ItemsSelected">Items Selected <span className={itemClass}>{`${itemsSelected}/${maxItems}`}</span></p>
              <p className="InventoryValue">Inventory Value <span>{`$${this.getTotalInventoryPrice()}`}</span></p>
              <p className="PriceRange">Price Range <span>{`$${priceLow} - $${priceHigh}`}</span></p>
              <p className="Percentage">Percentage <span className={betClass}>{percentage}%</span></p>
            </div>
            <p className="InputHeader"><span>Options</span></p>
            <div className="Modal__CreateCoinflip-Options">
              <div>
                <a className="ClearItems" onClick={this.clearItems}>Clear</a>
                <a onClick={this.props.onClose}>Cancel</a>
              </div>
            </div>
            <a onClick={this.joinGame} className="CreateGame">Join</a>
          </div>
        </div>
      </Modal>
    )
  }

}
