import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Row, Col } from 'react-bootstrap'
import CoinflipGame from './CoinflipGame'
import { NotificationManager } from 'react-notifications'
import { loadCoinflipGames, receiveCoinflipOffers, requestInventory, forceRefreshInventory, sendNotification, createCoinflipGame, addCoinflipGame, requestCoinflipOffers, cancelCoinflipOffer, resendCoinflipOffer } from '../../actions'
import { CoinflipJoinModal, CoinflipOffersModal, CoinflipCreateModal, TradeOfferModal } from '../../components'
import './Coinflip.css'

class Coinflip extends Component {

  constructor(props) {
    super(props)

    this.openCreateModal = this.openCreateModal.bind(this)
    this.renderGames = this.renderGames.bind(this)
    this.cancelOffer = this.cancelOffer.bind(this)
    this.resendOffer = this.resendOffer.bind(this)

    this.state = {
      createModal: false,
      offersModal: false,
      tradeOfferModal: false,
      tradeOfferObject: null,
      joining: {
        open: false,
        game: null
      },
      watching: {
        open: false,
        game: null
      }
    }
  }

  componentWillMount() {
    if (!this.props.coinflip.loaded) {
      this.props.loadCoinflipGames()
    }

    this.props.secureSocket.on('COINFLIP_OFFER_ERROR', ({ error }) => {
      NotificationManager.error(`Error creating trade offer: ${error}`)
    })

    this.props.secureSocket.on('COINFLIP_OFFER', (offer) => {
      this.setState({
        tradeOfferModal: true,
        tradeOfferObject: offer
      })
    })

    this.props.publicSocket.on('COINFLIP_NEW_GAME', (game) => {
      this.props.addCoinflipGame(game)
    })

    this.props.secureSocket.on('COINFLIP_RECEIVE_OFFERS', (offers) => {
      this.props.receiveCoinflipOffers(offers)
    })
  }

  componentWillUnmount() {
    this.props.secureSocket.off('COINFLIP_OFFER_ERROR')
    this.props.publicSocket.off('COINFLIP_NEW_GAME')
    this.props.secureSocket.off('COINFLIP_OFFER')
    this.props.secureSocket.off('COINFLIP_RECEIVE_OFFERS')
  }

  openCreateModal() {
    if (this.props.user && this.props.user.tradeUrl) {
      return this.setState({ createModal: true })
    }
    NotificationManager.error('You must set your trade URL before creating a game')
  }

  renderGames() {
    const games = this.sortedGames()
    return games.map((game, key) => (
      <CoinflipGame
        game={game}
        key={key}
        onWatch={() => this.setState({ watching: { open: true, game: game } })}
        onJoin={() => this.setState({ joining: { open: true, game: game } })} />
    ))
  }

  sortedGames() {
    return this.props.coinflip.games.sort((a, b) => {
      const aTotal = this.getTotalGameValue(a), bTotal = this.getTotalGameValue(b)
      return aTotal - bTotal
    })
  }

  getTotalGameValue({ creator, joiner }) {
    let total = 0.00
    for (let i = 0; i < creator.items.length; i++) {
      const item = creator.items[i]
      total += item ? (item.price ? Number(item.price) : 0.00) : 0.00
    }
    for (let i = 0; i < joiner.items.length; i++) {
      const item = joiner.items[i]
      total += item ? (item.price ? Number(item.price) : 0.00) : 0.00
    }
    return Number(total).toFixed(2)
  }

  cancelOffer(offer) {
    if (offer && offer.botId) {
      this.props.cancelCoinflipOffer(offer)
    }
  }

  resendOffer(offer) {
    if (offer && offer.botId) {
      this.props.resendCoinflipOffer(offer)
    }
  }

  render() {
    return (
      <div className="Coinflip">
        <CoinflipJoinModal
          isOpen={this.state.joining.open}
          onClose={() => this.setState({ joining: { open: false, game: null } })}
          inventory={this.props.inventory}
          loadInventory={this.props.requestInventory}
          forceRefreshInventory={this.props.forceRefreshInventory}
          game={this.state.joining.game}
          joinGame={null}
        />
        <CoinflipOffersModal
          isOpen={this.state.offersModal}
          onClose={() => this.setState({ offersModal: false })}
          requestOffers={this.props.requestCoinflipOffers}
          offers={this.props.coinflip.offers}
          cancelOffer={this.cancelOffer}
          resendOffer={this.resendOffer}
        />
        <TradeOfferModal
          isOpen={this.state.tradeOfferModal}
          onClose={() => this.setState({ tradeOfferModal: false, tradeOfferObject: null })}
          tradeOffer={this.state.tradeOfferObject}
        />
        <CoinflipCreateModal
          isOpen={this.state.createModal}
          onClose={() => this.setState({ createModal: false })}
          inventory={this.props.inventory}
          loadInventory={this.props.requestInventory}
          forceRefreshInventory={this.props.forceRefreshInventory}
          createGame={this.props.createCoinflipGame}
        />
        <div className="Coinflip__Header">
          <Row>
            <Col md={3} sm={4} className="Coinflip__Header-Stat">
              <h1>
                <p>12</p>
                <span>Current Games</span>
              </h1>
            </Col>
            <Col md={3} sm={4} className="Coinflip__Header-Stat">
            <h1>
              <p>56</p>
              <span>Total Items</span>
            </h1>
            </Col>
            <Col md={3} sm={4} className="Coinflip__Header-Stat">
            <h1>
              <p>$502.53</p>
              <span>Total Value</span>
            </h1>
            </Col>
            <Col md={3} sm={12} className="Coinflip__Header-Buttons">
              <a className="noselect create" onClick={this.openCreateModal}>
                <span>Create</span>
                <div>
                  <i className="fa fa-plus-square-o"></i>
                </div>
              </a>
              <a className="noselect history" onClick={() => this.setState({ offersModal: true })}>
                <span>Offers</span>
                <div>
                  <i className="fa fa-wrench"></i>
                </div>
              </a>
            </Col>
          </Row>
        </div>

        <div className="Coinflip__Body">
          <table>
            <thead>
              <tr>
                <th><span>Side</span></th>
                <th><span>Players</span></th>
                <th><span>Items</span></th>
                <th><span>Value</span></th>
                <th><span>Status</span></th>
                <th><span>Actions</span></th>
              </tr>
            </thead>
            <tbody>
              { this.renderGames() }
            </tbody>
          </table>
          {this.props.coinflip.loading &&
            <div className="Coinflip--Loading">
              <i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
            </div>
          }
        </div>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    inventory: state.user.inventory,
    user: state.auth.user,
    coinflip: state.coinflip,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    requestInventory,
    forceRefreshInventory,
    sendNotification,
    createCoinflipGame,
    addCoinflipGame,
    requestCoinflipOffers,
    cancelCoinflipOffer,
    resendCoinflipOffer,
    receiveCoinflipOffers,
    loadCoinflipGames
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Coinflip)
