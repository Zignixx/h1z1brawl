import React, { Component } from 'react'

import './Message.css'

const userTooltip = {
  content: {
    backgroundColor: 'red',
    color: '#eee'
  },
  tooltip: {
    backgroundColor: 'red',
    borderRadius: '8px'
  },
  arrow: {
    borderTop: 'solid red 5px'
  }
}

class Message extends Component {

  render() {
    const { user, message } = this.props

    return (
      <div className="Message">
        <div className="Message__Header">
          <span className="Message__Header--Level">{user.level}</span>
          <img src={user.image} alt="image" />
          <span>{user.name}</span>
        </div>
        <div className="Message__Content">
          {message}
        </div>
      </div>
    )
  }

}

export default Message
