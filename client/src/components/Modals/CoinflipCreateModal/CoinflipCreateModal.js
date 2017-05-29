import React, { Component } from 'react'
import Modal from 'react-modal'
import { CoinflipInventoryItem } from '../../../containers'

import './CoinflipCreateModal.css'
import heads from '../../../static/coin-heads.png'
import tails from '../../../static/coin-tails.png'

const IMAGE_URL = 'https://steamcommunity-a.akamaihd.net/economy/image/'

export default class CoinflipCreateModal extends Component {

  constructor(props) {
    super(props)

    this.requestClose = this.requestClose.bind(this)
    this.renderModal = this.renderModal.bind(this)
    this.submitGame = this.submitGame.bind(this)
    this.renderItemSelection = this.renderItemSelection.bind(this)
    this.renderCoinSelection = this.renderCoinSelection.bind(this)
    this.renderItems = this.renderItems.bind(this)
    this.nextSlide = this.nextSlide.bind(this)
    this.getTotalSelectedPrice = this.getTotalSelectedPrice.bind(this)
    this.getTotalInventoryPrice = this.getTotalInventoryPrice.bind(this)
    this.getSelectedCount = this.getSelectedCount.bind(this)
    this.clearItems = this.clearItems.bind(this)

    this.state = {
      selected: 'heads',
      created: false,
      selectedItems: []
    }
  }

  requestClose() {
    this.props.onClose()
    setTimeout(() => {
      this.setState({
        selected: 'heads',
        created: false,
        selectedItems: []
      })
    }, 300)
  }

  renderModal() {
    if (this.state.created) {
      return this.renderItemSelection()
    }
    return this.renderCoinSelection()
  }

  nextSlide() {
    this.setState({
      created: true
    })
    this.props.loadInventory()
  }

  renderCoinSelection() {
    return (
      <div>
        <p><span>Select a Coin</span></p>
        <div className="Modal__TradeURL-Coins">
          <img src={heads} alt="heads" ref="heads"
            className={this.state.selected === 'heads' ? 'selected' : ''}
            onClick={() => this.setState({ selected: 'heads' })}
          />
          <img src={tails} alt="tails" ref="tails"
            className={this.state.selected === 'tails' ? 'selected' : ''}
            onClick={() => this.setState({ selected: 'tails' })}
          />
        </div>
        <hr />
        <a onClick={this.nextSlide}>Next</a>
      </div>
    )
  }

  submitGame() {
    this.requestClose()
    console.log('game has been submitted')
  }

  renderItemSelection() {
    const betValue = this.getTotalSelectedPrice(), itemsSelected = this.getSelectedCount()
    const betClass = (betValue >= 1.0) ? 'good' : 'bad'
    const itemClass = (itemsSelected >= 1 && itemsSelected <= 15) ? 'good' : 'bad'
    return (
      <div>
        <h4>Add your items to the coin flip</h4>
        <p>Min bet $1.00 - Max items 15</p>
        <a className="noselect" onClick={this.props.forceRefreshInventory}>
          <span>Force Refresh</span>
          <div>
            <i className="fa fa-refresh" />
          </div>
        </a>
        <div className="Modal__TradeURL-Items">
          { this.renderItems() }
        </div>
        <div className="Modal__TradeURL-Input">
          <p className="InputHeader"><span>Values</span></p>
          <div className="Modal__TradeURL-Values">
            <p className="BetValue">Bet Value <span className={betClass}>{`$${betValue}`}</span></p>
            <p className="ItemsSelected">Items Selected <span className={itemClass}>{`${itemsSelected}/15`}</span></p>
            <p className="InventoryValue">Inventory Value <span>{`$${this.getTotalInventoryPrice()}`}</span></p>
          </div>
          <p className="InputHeader"><span>Options</span></p>
          <div className="Modal__TradeURL-Options">
            <div>
              <a className="ClearItems" onClick={this.clearItems}>Clear</a>
              <a onClick={this.requestClose}>Close</a>
            </div>
            <input type="checkbox" ref="autoCancel" />
            <p>Auto cancel after 30 minutes</p>
          </div>
          <a onClick={this.submitGame} className="CreateGame">Create</a>
        </div>
      </div>
    )
  }

  clearItems() {
    this.setState({
      selectedItems: []
    })
  }

  renderItems() {
    const { items, error, loading } = this.props.inventory
    if (loading) {
       return (
         <i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
       )
    } else if (error) {
      return (
        <div className="Modal__TradeURL-Error">
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
        disabled={item.price < 0.10}
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

  getSelectedCount() {
    return this.state.selectedItems.length
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

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        onRequestClose={this.requestClose}
        closeTimeoutMS={200}
        contentLabel="Modal"
        className={'Modal__TradeURL ' + (this.state.created ? 'Modal__TradeURL-Created' : '')}
        overlayClassName={'Modal__Overlay'}
      >
        <div className="Modal__TradeURL-Header">
          <h1>Create a Game</h1>
          <a onClick={this.requestClose}><i className="fa fa-times" /></a>
        </div>
        <div className={'Modal__TradeURL-Content'}>
          { this.renderModal() }
        </div>
      </Modal>
    )
  }

}
