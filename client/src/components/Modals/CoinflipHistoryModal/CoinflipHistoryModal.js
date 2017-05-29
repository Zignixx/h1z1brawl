import React, { Component } from 'react'
import Modal from 'react-modal'

import './CoinflipHistoryModal.css'

export default class CoinflipHistoryModal extends Component {

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        onRequestClose={this.props.onClose}
        closeTimeoutMS={200}
        contentLabel="Modal"
        className={'Modal__Coinflip--History'}
        overlayClassName={'Modal__Overlay'}
      >
        <p>sike</p>
      </Modal>
    )
  }

}
