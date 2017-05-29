import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Popup } from 'semantic-ui-react'
import { Row, Col } from 'react-bootstrap'
import CoinflipGameItem from './CoinflipGameItem'
import black from '../../static/coin-heads.png'
import red from '../../static/coin-tails.png'
import { requestInventory, forceRefreshInventory, sendNotification, createCoinflipGame } from '../../actions'
import { CoinflipHistoryModal, CoinflipCreateModal } from '../../components'
import './Coinflip.css'

class Coinflip extends Component {

  constructor(props) {
    super(props)
    
    this.state = {
      createModal: false,
      historyModal: false
    }
  }

  render() {
    const image = 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/e2/e2bf4ecf3eca35e844a4794b7454dc2b75bb9a44_full.jpg'
    return (
      <div className="Coinflip">
        <CoinflipHistoryModal
          isOpen={this.state.historyModal}
          onClose={() => this.setState({ historyModal: false })}
        />
        <CoinflipCreateModal
          isOpen={this.state.createModal}
          onClose={() => this.setState({ createModal: false })}
          inventory={this.props.inventory}
          loadInventory={this.props.requestInventory}
          forceRefreshInventory={this.props.forceRefreshInventory}
          notify={this.props.sendNotification}
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
              <a className="noselect create" onClick={() => this.setState({ createModal: true })}>
                <span>Create</span>
                <div>
                  <i className="fa fa-plus-square-o"></i>
                </div>
              </a>
              <a className="noselect history" onClick={() => this.setState({ historyModal: true })}>
                <span>History</span>
                <div>
                  <i className="fa fa-history"></i>
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
              <tr className="Coinflip__Game">
                <td className="Coinflip__Side">
                  <img src={red} alt="red" />
                </td>
                <td className="Coinflip__Players">
                  <Popup
                    inverted
                    content="mprey csgocact.us"
                    trigger={<img src={image} alt="user1" />} />
                  <span>vs.</span>
                  <Popup
                    inverted
                    content="mprey csgocact.us"
                    trigger={<img src={image} alt="user1" />} />
                </td>
                <td className="Coinflip__Items">
                  <CoinflipGameItem name={'Heavy Assault Military Backpack'} image={'https://steamcommunity-a.opskins.media/economy/image/iGm5OjgdO5r8OoJ7TJjS39tTyGCTzzQwmWl1QPRXu8oaf69-NOHLAbqw_23aLe8AcRQ8-3uyKA7_CGvsJYds9U65FMF7i6AbXTJ8PDm57EliZdK7KLPuuh3czSv-yXAQjDkuxf673vhVj5Cw8JupOXr1VwETXYyVTLJ8gg/256fx256f'} price={13.22} />
                  <CoinflipGameItem name={'Heavy Assault Military Backpack'} image={'https://steamcommunity-a.opskins.media/economy/image/iGm5OjgdO5r8OoJ7TJjS39tTyGCTzzQwmWl1QPRXu8oaf69-NOHLAbqw_23aLe8AcRQ8-3uyKA7_CGvsJYds9U65FMF7i6AbXTJ8PDm57EliZdK7KLPuuh3czSv-yXAQjDkuxf673vhVj5Cw8JupOXr1VwETXYyVTLJ8gg/256fx256f'} price={13.22} />
                  <CoinflipGameItem name={'Heavy Assault Military Backpack'} image={'https://steamcommunity-a.opskins.media/economy/image/iGm5OjgdO5r8OoJ7TJjS39tTyGCTzzQwmWl1QPRXu8oaf69-NOHLAbqw_23aLe8AcRQ8-3uyKA7_CGvsJYds9U65FMF7i6AbXTJ8PDm57EliZdK7KLPuuh3czSv-yXAQjDkuxf673vhVj5Cw8JupOXr1VwETXYyVTLJ8gg/256fx256f'} price={13.22} />
                  <CoinflipGameItem name={'Skin: Police Shirt'} price={66.92} image={'https://steamcommunity-a.opskins.media/economy/image/iGm5OjgdO5r8OoJ7TJjS39tTyGCTzzQwmWl1QPRXu8oaf69-NOHLAbqw_23aLe8AcRQ8-3uyKA7_CGvsJYds9U65FMF7i6AZVjpoDBihwW9kf9SqAI3Rqyf_wWbl-FXZw-xMsg/256fx256f'} />
                </td>
                <td className="Coinflip__Value">
                  <span>$59.43</span>
                  <p><span>55.42 - 63.29</span></p>
                </td>
                <td className="Coinflip__Status">
                  <span>Open</span>
                </td>
                <td className="Coinflip__Actions">
                  <a className="noselect create">
                    <span>Join</span>
                    <div>
                      <i className="fa fa-sign-in"></i>
                    </div>
                  </a>
                  <a className="noselect watch">
                    <span>Watch</span>
                    <div>
                      <i className="fa fa-eye"></i>
                    </div>
                  </a>
                </td>
              </tr>
              <tr className="Coinflip__Game">
                <td className="Coinflip__Side">
                  <img src={red} alt="red" />
                </td>
                <td className="Coinflip__Players">
                  <Popup
                    inverted
                    content="mprey csgocact.us"
                    trigger={<img src={image} alt="user1" />} />
                  <span>vs.</span>
                  <Popup
                    inverted
                    content="mprey csgocact.us"
                    trigger={<img src={image} alt="user1" />} />
                </td>
                <td className="Coinflip__Items">
                  <CoinflipGameItem name={'Heavy Assault Military Backpack'} image={'https://steamcommunity-a.opskins.media/economy/image/iGm5OjgdO5r8OoJ7TJjS39tTyGCTzzQwmWl1QPRXu8oaf69-NOHLAbqw_23aLe8AcRQ8-3uyKA7_CGvsJYds9U65FMF7i6AbXTJ8PDm57EliZdK7KLPuuh3czSv-yXAQjDkuxf673vhVj5Cw8JupOXr1VwETXYyVTLJ8gg/256fx256f'} price={13.22} />
                  <CoinflipGameItem name={'Heavy Assault Military Backpack'} image={'https://steamcommunity-a.opskins.media/economy/image/iGm5OjgdO5r8OoJ7TJjS39tTyGCTzzQwmWl1QPRXu8oaf69-NOHLAbqw_23aLe8AcRQ8-3uyKA7_CGvsJYds9U65FMF7i6AbXTJ8PDm57EliZdK7KLPuuh3czSv-yXAQjDkuxf673vhVj5Cw8JupOXr1VwETXYyVTLJ8gg/256fx256f'} price={13.22} />
                  <CoinflipGameItem name={'Heavy Assault Military Backpack'} image={'https://steamcommunity-a.opskins.media/economy/image/iGm5OjgdO5r8OoJ7TJjS39tTyGCTzzQwmWl1QPRXu8oaf69-NOHLAbqw_23aLe8AcRQ8-3uyKA7_CGvsJYds9U65FMF7i6AbXTJ8PDm57EliZdK7KLPuuh3czSv-yXAQjDkuxf673vhVj5Cw8JupOXr1VwETXYyVTLJ8gg/256fx256f'} price={13.22} />
                  <CoinflipGameItem name={'Skin: Police Shirt'} price={66.92} image={'https://steamcommunity-a.opskins.media/economy/image/iGm5OjgdO5r8OoJ7TJjS39tTyGCTzzQwmWl1QPRXu8oaf69-NOHLAbqw_23aLe8AcRQ8-3uyKA7_CGvsJYds9U65FMF7i6AZVjpoDBihwW9kf9SqAI3Rqyf_wWbl-FXZw-xMsg/256fx256f'} />
                  <CoinflipGameItem name={'Skin: Police Shirt'} price={66.92} image={'https://steamcommunity-a.opskins.media/economy/image/iGm5OjgdO5r8OoJ7TJjS39tTyGCTzzQwmWl1QPRXu8oaf69-NOHLAbqw_23aLe8AcRQ8-3uyKA7_CGvsJYds9U65FMF7i6AZVjpoDBihwW9kf9SqAI3Rqyf_wWbl-FXZw-xMsg/256fx256f'} />
                  <CoinflipGameItem name={'Skin: Police Shirt'} price={66.92} image={'https://steamcommunity-a.opskins.media/economy/image/iGm5OjgdO5r8OoJ7TJjS39tTyGCTzzQwmWl1QPRXu8oaf69-NOHLAbqw_23aLe8AcRQ8-3uyKA7_CGvsJYds9U65FMF7i6AZVjpoDBihwW9kf9SqAI3Rqyf_wWbl-FXZw-xMsg/256fx256f'} />
                  <span>+4 more items...</span>
                </td>
                <td className="Coinflip__Value">
                  <span>$59.43</span>
                  <p><span>55.42 - 63.29</span></p>
                </td>
                <td className="Coinflip__Status">
                  <span>Open</span>
                </td>
                <td className="Coinflip__Actions">
                  <a className="noselect create">
                    <span>Join</span>
                    <div>
                      <i className="fa fa-sign-in"></i>
                    </div>
                  </a>
                  <a className="noselect watch">
                    <span>Watch</span>
                    <div>
                      <i className="fa fa-eye"></i>
                    </div>
                  </a>
                </td>
              </tr>
              <tr className="Coinflip__Game">
                <td className="Coinflip__Side">
                  <img src={red} alt="red" />
                </td>
                <td className="Coinflip__Players">
                  <Popup
                    inverted
                    content="mprey csgocact.us"
                    trigger={<img src={image} alt="user1" />} />
                  <span>vs.</span>
                  <Popup
                    inverted
                    content="mprey csgocact.us"
                    trigger={<img src={image} alt="user1" />} />
                </td>
                <td className="Coinflip__Items">
                  <CoinflipGameItem name={'Skin: Police Shirt'} price={66.92} image={'https://steamcommunity-a.opskins.media/economy/image/iGm5OjgdO5r8OoJ7TJjS39tTyGCTzzQwmWl1QPRXu8oaf69-NOHLAbqw_23aLe8AcRQ8-3uyKA7_CGvsJYds9U65FMF7i6AZVjpoDBihwW9kf9SqAI3Rqyf_wWbl-FXZw-xMsg/256fx256f'} />
                  <CoinflipGameItem name={'Skin: Police Shirt'} price={66.92} image={'https://steamcommunity-a.opskins.media/economy/image/iGm5OjgdO5r8OoJ7TJjS39tTyGCTzzQwmWl1QPRXu8oaf69-NOHLAbqw_23aLe8AcRQ8-3uyKA7_CGvsJYds9U65FMF7i6AZVjpoDBihwW9kf9SqAI3Rqyf_wWbl-FXZw-xMsg/256fx256f'} />
                  <CoinflipGameItem name={'Skin: Police Shirt'} price={66.92} image={'https://steamcommunity-a.opskins.media/economy/image/iGm5OjgdO5r8OoJ7TJjS39tTyGCTzzQwmWl1QPRXu8oaf69-NOHLAbqw_23aLe8AcRQ8-3uyKA7_CGvsJYds9U65FMF7i6AZVjpoDBihwW9kf9SqAI3Rqyf_wWbl-FXZw-xMsg/256fx256f'} />
                </td>
                <td className="Coinflip__Value">
                  <span>$59.43</span>
                  <p><span>55.42 - 63.29</span></p>
                </td>
                <td className="Coinflip__Status">
                  <span>Open</span>
                </td>
                <td className="Coinflip__Actions">
                  <a className="noselect create">
                    <span>Join</span>
                    <div>
                      <i className="fa fa-sign-in"></i>
                    </div>
                  </a>
                  <a className="noselect watch">
                    <span>Watch</span>
                    <div>
                      <i className="fa fa-eye"></i>
                    </div>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    inventory: state.user.inventory
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    requestInventory,
    forceRefreshInventory,
    sendNotification,
    createCoinflipGame
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Coinflip)
