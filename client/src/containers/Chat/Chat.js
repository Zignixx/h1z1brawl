import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import FontAwesome from 'react-fontawesome'

import { Message } from '../../components'
import { api } from '../../../../config'

import './Chat.css'

const fakeImage = 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/a4/a4d240b1f27f74e60cbe41f1421702f33c46d0fa.jpg'
const fakeMessage = [
  {id: 1, user: {name: 'kathryn wolf', image: fakeImage, level: 5}, message: 'hello my name is mason'},
  {id: 11, user: {name: 'kathryn wolf', image: fakeImage, level: 5}, message: 'hello my name is mason'},
  {id: 13, user: {name: 'kathryn wolf', image: fakeImage, level: 5}, message: 'hello my name is mason'},
  {id: 12, user: {name: 'kathryn wolf', image: fakeImage, level: 5}, message: 'hello my name is mason'},
  {id: 14, user: {name: 'kathryn wolf', image: fakeImage, level: 5}, message: 'hello my name is mason'},
  {id: 15, user: {name: 'kathryn wolf', image: fakeImage, level: 5}, message: 'hello my name is mason'},
  {id: 16, user: {name: 'kathryn wolf', image: fakeImage, level: 5}, message: 'hello my name is mason'},
  {id: 17, user: {name: 'kathryn wolf', image: fakeImage, level: 5}, message: 'hello my name is mason'},
  {id: 18, user: {name: 'kathryn wolf', image: fakeImage, level: 5}, message: 'hello my name is mason'},
  {id: 19, user: {name: 'kathryn wolf', image: fakeImage, level: 5}, message: 'hello my name is mason'},
  {id: 21, user: {name: 'kathryn wolf', image: fakeImage, level: 5}, message: 'hello my name is mason'},
  {id: 4, user: {name: 'kathryn wolf', image: fakeImage, level: 5}, message: 'hello my name is mason'}
]

class Chat extends Component {

  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)

    this.state = {
      open: true
    }
  }

  handleClick(e) {
    this.setState({
      open: !this.state.open
    })
  }

  scrollToBottom() {
    const node = ReactDOM.findDOMNode(this.messagesEnd);
    node.scrollIntoView({behavior: "smooth"});
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  renderMessage() {
    return fakeMessage.map((message) => (
      <Message key={message.id} user={message.user} message={message.message} />
    ))
  }

  render() {
    const { open } = this.state
    const { user, users } = this.props
    const iconClass = open ? 'compress' : 'expand'
    const chatClass = open ? 'open' : ''

    return (
      <div>
        <div className="Chat__Toggle">
          <FontAwesome name={iconClass} onClick={this.handleClick} />
        </div>
        <div className={`Chat ${chatClass}`}>
          <div className="Chat__Advertisement">
            TODO MAKE IMAGE OF GIVEAWAY
          </div>
          <div className="Chat__Header">
            <span className="Chat__Header-Wrapper">
              <FontAwesome name="users" className="Chat__Header-Icon" />
              Online - <span className="Chat__Header-Online">{ users }</span>
            </span>
          </div>
          <div className="Chat__Box">
            { this.renderMessage() }
            <div style={{float:"left", clear: "both"}} ref={(el) => { this.messagesEnd = el; }}></div>
          </div>
          <div className="Chat__Input">
            { user ? (
              <p>hi</p>
            ) : (
              <div className="Chat__Input-Anon">
                <a href={`${api.host}api/auth/steam`}>Login to Chat</a>
              </div>
            ) }
          </div>
        </div>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    users: state.app.users
  }
}

export default connect(
  mapStateToProps
)(Chat)
