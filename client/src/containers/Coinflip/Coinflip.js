import React, { Component } from 'react'
import { Popup } from 'semantic-ui-react'
import { Row, Col } from 'react-bootstrap'
import CoinflipItem from './CoinflipItem'
import heads from '../../static/coin-heads.png'
import tails from '../../static/coin-tails.png'
import './Coinflip.css'

class Coinflip extends Component {

  render() {
    const image = 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/e2/e2bf4ecf3eca35e844a4794b7454dc2b75bb9a44_full.jpg'
    return (
      <div className="Coinflip">
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
              <a className="noselect create">
                <span>Create</span>
                <div>
                  <i className="fa fa-plus-square-o"></i>
                </div>
              </a>
              <a className="noselect history">
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
                  <img src={tails} alt="tails" />
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
                  <CoinflipItem name={'Heavy Assault Military Backpack'} image={'https://steamcommunity-a.opskins.media/economy/image/iGm5OjgdO5r8OoJ7TJjS39tTyGCTzzQwmWl1QPRXu8oaf69-NOHLAbqw_23aLe8AcRQ8-3uyKA7_CGvsJYds9U65FMF7i6AbXTJ8PDm57EliZdK7KLPuuh3czSv-yXAQjDkuxf673vhVj5Cw8JupOXr1VwETXYyVTLJ8gg/256fx256f'} price={13.22} />
                  <CoinflipItem name={'Heavy Assault Military Backpack'} image={'https://steamcommunity-a.opskins.media/economy/image/iGm5OjgdO5r8OoJ7TJjS39tTyGCTzzQwmWl1QPRXu8oaf69-NOHLAbqw_23aLe8AcRQ8-3uyKA7_CGvsJYds9U65FMF7i6AbXTJ8PDm57EliZdK7KLPuuh3czSv-yXAQjDkuxf673vhVj5Cw8JupOXr1VwETXYyVTLJ8gg/256fx256f'} price={13.22} />
                  <CoinflipItem name={'Heavy Assault Military Backpack'} image={'https://steamcommunity-a.opskins.media/economy/image/iGm5OjgdO5r8OoJ7TJjS39tTyGCTzzQwmWl1QPRXu8oaf69-NOHLAbqw_23aLe8AcRQ8-3uyKA7_CGvsJYds9U65FMF7i6AbXTJ8PDm57EliZdK7KLPuuh3czSv-yXAQjDkuxf673vhVj5Cw8JupOXr1VwETXYyVTLJ8gg/256fx256f'} price={13.22} />
                  <CoinflipItem name={'Skin: Police Shirt'} price={66.92} image={'https://steamcommunity-a.opskins.media/economy/image/iGm5OjgdO5r8OoJ7TJjS39tTyGCTzzQwmWl1QPRXu8oaf69-NOHLAbqw_23aLe8AcRQ8-3uyKA7_CGvsJYds9U65FMF7i6AZVjpoDBihwW9kf9SqAI3Rqyf_wWbl-FXZw-xMsg/256fx256f'} />
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
                  <img src={tails} alt="tails" />
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
                  <CoinflipItem name={'Heavy Assault Military Backpack'} image={'https://steamcommunity-a.opskins.media/economy/image/iGm5OjgdO5r8OoJ7TJjS39tTyGCTzzQwmWl1QPRXu8oaf69-NOHLAbqw_23aLe8AcRQ8-3uyKA7_CGvsJYds9U65FMF7i6AbXTJ8PDm57EliZdK7KLPuuh3czSv-yXAQjDkuxf673vhVj5Cw8JupOXr1VwETXYyVTLJ8gg/256fx256f'} price={13.22} />
                  <CoinflipItem name={'Heavy Assault Military Backpack'} image={'https://steamcommunity-a.opskins.media/economy/image/iGm5OjgdO5r8OoJ7TJjS39tTyGCTzzQwmWl1QPRXu8oaf69-NOHLAbqw_23aLe8AcRQ8-3uyKA7_CGvsJYds9U65FMF7i6AbXTJ8PDm57EliZdK7KLPuuh3czSv-yXAQjDkuxf673vhVj5Cw8JupOXr1VwETXYyVTLJ8gg/256fx256f'} price={13.22} />
                  <CoinflipItem name={'Heavy Assault Military Backpack'} image={'https://steamcommunity-a.opskins.media/economy/image/iGm5OjgdO5r8OoJ7TJjS39tTyGCTzzQwmWl1QPRXu8oaf69-NOHLAbqw_23aLe8AcRQ8-3uyKA7_CGvsJYds9U65FMF7i6AbXTJ8PDm57EliZdK7KLPuuh3czSv-yXAQjDkuxf673vhVj5Cw8JupOXr1VwETXYyVTLJ8gg/256fx256f'} price={13.22} />
                  <CoinflipItem name={'Skin: Police Shirt'} price={66.92} image={'https://steamcommunity-a.opskins.media/economy/image/iGm5OjgdO5r8OoJ7TJjS39tTyGCTzzQwmWl1QPRXu8oaf69-NOHLAbqw_23aLe8AcRQ8-3uyKA7_CGvsJYds9U65FMF7i6AZVjpoDBihwW9kf9SqAI3Rqyf_wWbl-FXZw-xMsg/256fx256f'} />
                  <CoinflipItem name={'Skin: Police Shirt'} price={66.92} image={'https://steamcommunity-a.opskins.media/economy/image/iGm5OjgdO5r8OoJ7TJjS39tTyGCTzzQwmWl1QPRXu8oaf69-NOHLAbqw_23aLe8AcRQ8-3uyKA7_CGvsJYds9U65FMF7i6AZVjpoDBihwW9kf9SqAI3Rqyf_wWbl-FXZw-xMsg/256fx256f'} />
                  <CoinflipItem name={'Skin: Police Shirt'} price={66.92} image={'https://steamcommunity-a.opskins.media/economy/image/iGm5OjgdO5r8OoJ7TJjS39tTyGCTzzQwmWl1QPRXu8oaf69-NOHLAbqw_23aLe8AcRQ8-3uyKA7_CGvsJYds9U65FMF7i6AZVjpoDBihwW9kf9SqAI3Rqyf_wWbl-FXZw-xMsg/256fx256f'} />
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
                  <img src={tails} alt="tails" />
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
                  <CoinflipItem name={'Skin: Police Shirt'} price={66.92} image={'https://steamcommunity-a.opskins.media/economy/image/iGm5OjgdO5r8OoJ7TJjS39tTyGCTzzQwmWl1QPRXu8oaf69-NOHLAbqw_23aLe8AcRQ8-3uyKA7_CGvsJYds9U65FMF7i6AZVjpoDBihwW9kf9SqAI3Rqyf_wWbl-FXZw-xMsg/256fx256f'} />
                  <CoinflipItem name={'Skin: Police Shirt'} price={66.92} image={'https://steamcommunity-a.opskins.media/economy/image/iGm5OjgdO5r8OoJ7TJjS39tTyGCTzzQwmWl1QPRXu8oaf69-NOHLAbqw_23aLe8AcRQ8-3uyKA7_CGvsJYds9U65FMF7i6AZVjpoDBihwW9kf9SqAI3Rqyf_wWbl-FXZw-xMsg/256fx256f'} />
                  <CoinflipItem name={'Skin: Police Shirt'} price={66.92} image={'https://steamcommunity-a.opskins.media/economy/image/iGm5OjgdO5r8OoJ7TJjS39tTyGCTzzQwmWl1QPRXu8oaf69-NOHLAbqw_23aLe8AcRQ8-3uyKA7_CGvsJYds9U65FMF7i6AZVjpoDBihwW9kf9SqAI3Rqyf_wWbl-FXZw-xMsg/256fx256f'} />
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

export default Coinflip
