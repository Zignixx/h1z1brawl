import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
import { Row, Col } from 'react-bootstrap'
import heads from '../../static/coin-heads.png'
import tails from '../../static/coin-tails.png'
import './Coinflip.css'

class Coinflip extends Component {

  render() {
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

                </td>
                <td className="Coinflip__Items">

                </td>
                <td className="Coinflip__Value">

                </td>
                <td className="Coinflip__Status">

                </td>
                <td className="Coinflip__Actions">

                </td>
              </tr>
              <tr className="Coinflip__Game">
                <td className="Coinflip__Side">
                  <img src={tails} alt="tails" />
                </td>
                <td className="Coinflip__Players">

                </td>
                <td className="Coinflip__Items">

                </td>
                <td className="Coinflip__Value">

                </td>
                <td className="Coinflip__Status">

                </td>
                <td className="Coinflip__Actions">

                </td>
              </tr>
              <tr className="Coinflip__Game">
                <td className="Coinflip__Side">
                  <img src={heads} alt="heads" />
                </td>
                <td className="Coinflip__Players">

                </td>
                <td className="Coinflip__Items">

                </td>
                <td className="Coinflip__Value">

                </td>
                <td className="Coinflip__Status">

                </td>
                <td className="Coinflip__Actions">

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
