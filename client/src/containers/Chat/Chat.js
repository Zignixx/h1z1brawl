import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { NotificationManager } from 'react-notifications'
import FontAwesome from 'react-fontawesome'
import { Popup } from 'semantic-ui-react'
import { Message } from '../../components'
import { sendChat, receiveChat, loadChat, sendNotification } from '../../actions/'
import { api } from '../../../../config'
import giveaway from '../../static/giveaway.png'
import './Chat.css'

class Chat extends Component {

  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
    this.submitChat = this.submitChat.bind(this)
    this.clearChat = this.clearChat.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)

    this.state = {
      open: false
    }
  }

  componentWillMount() {
    this.props.secureSocket.on('RECEIVE_CHAT', (data) => {
      this.props.receiveChat(data)
    })

    if (!this.props.chat.loaded) {
      this.props.loadChat()
    }
  }

  componentWillUnmount() {
    this.props.secureSocket.off('RECEIVE_CHAT')
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

  renderMessage() {
    return this.props.chat.messages.slice(0).reverse().map((message, key) => {
      return <Message key={key} user={message.user} message={message.message} />
    })
  }

  submitChat() {
    const message = this.refs.messageText.value
    if (!message || message.length === 0) {
      this.props.sendNotification({
        message: 'Enter a message before submitting',
        type: 'error'
      })
      return;
    }

    if (this.props.chat.sending) {
      this.props.sendNotification({
        message: 'You are already sending a message',
        type: 'error'
      })
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
    loadChat,
    sendNotification
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat)
