import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { NotificationManager } from 'react-notifications'
import FontAwesome from 'react-fontawesome'
import { Popup } from 'semantic-ui-react'
import { Message } from '../../components'
import { sendChat, receiveChat, loadChat } from '../../actions/'
import { api } from '../../../../config'
import giveaway from '../../static/giveaway.png'
import logo from '../../static/logo.png'
import './Chat.css'

const messages = [
  'If you experience any bugs/problems, contact h1z1brawl@gmail.com for help.',
  'Add H1Z1Brawl.com to your name and receive 5% less tax.',
  'Join our giveaway by clicking on the banner above the chat box.'
]

class Chat extends Component {

  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
    this.submitChat = this.submitChat.bind(this)
    this.clearChat = this.clearChat.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)

    this.state = {
      open: true
    }
  }

  componentWillMount() {
    this.props.secureSocket.on('RECEIVE_CHAT', (data) => {
      this.props.receiveChat(data)
    })

    if (!this.props.chat.loaded) {
      this.props.loadChat()
    }

    this.botMessageIndex = 0

    this.botInterval = setInterval(() => {
      this.sendBotMessage(messages[this.botMessageIndex])
      this.botMessageIndex++
      if (this.botMessageIndex >= messages.length) {
        this.botMessageIndex = 0
      }
    }, 10 * 60 * 1000)
  }

  componentWillUnmount() {
    this.props.secureSocket.off('RECEIVE_CHAT')

    clearInterval(this.botInterval)
  }

  handleClick(e) {
    e.preventDefault()
    this.setState({
      open: !this.state.open
    })
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      e.preventDefault()
      this.submitChat()
    }
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

  sendBotMessage(message) {
    this.props.receiveChat({
      user: {
        level: 999,
        image: logo,
        name: 'H1Z1Brawl Bot'
      },
      message
    })
  }

  renderMessage() {
    return this.props.chat.messages.slice(0).reverse().map((message, key) => {
      return <Message key={key} user={message.user} message={message.message} />
    })
  }

  submitChat() {
    const message = this.refs.messageText.value
    if (!message || message.length === 0) {
      NotificationManager.error('Enter a message before submitting')
      return;
    }

    if (this.props.chat.sending) {
      NotificationManager.error('You are already sending a message')
    } else {
      this.props.sendChat(message)
      this.clearChat()
    }
  }

  clearChat() {
    this.refs.messageText.value = ""
  }

  render() {
    const { open } = this.state
    const { user, count } = this.props
    const iconClass = open ? 'compress' : 'expand'
    const chatClass = open ? 'open' : ''

    return (
      <div>
        <div className="Chat__Toggle">
          <FontAwesome name={iconClass} onClick={this.handleClick} />
        </div>
        <div className={`Chat ${chatClass}`}>
          <div className="Chat__Advertisement">
            <LinkContainer activeClassName="" to="/giveaway">
              <img src={giveaway} alt="giveaway" />
            </LinkContainer>
          </div>
          <div className="Chat__Header">
            <span className="Chat__Header-Wrapper">
              <FontAwesome name="users" className="Chat__Header-Icon" />
              Online - <span className="Chat__Header-Online">{ count }</span>
            </span>
          </div>
          <div className="Chat__Box">
            { this.renderMessage() }
            <div style={{float:"left", clear: "both"}} ref={(el) => { this.messagesEnd = el; }}></div>
          </div>
          <div className="Chat__Input">
            { user ? (
              <div>
                <textarea onKeyPress={this.handleKeyPress} maxLength="200" placeholder="Send a message..." ref="messageText"></textarea>
                <div className="Chat__Input-Buttons">
                  <Popup trigger={
                    <a><i className="fa fa-smile-o" aria-hidden="true"></i></a>
                  } on="click" hideOnScroll inverted offset={10}>
                    hello hello hello
                  </Popup>
                  <button type="submit" onClick={this.submitChat}>SEND</button>
                </div>
              </div>
            ) : (
              <div className="Chat__Input-Anon">
                <a href={`${api.url}api/auth/steam`}>Login to Chat</a>
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
    count: state.users.count,
    chat: state.chat
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    sendChat,
    receiveChat,
    loadChat
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat)
