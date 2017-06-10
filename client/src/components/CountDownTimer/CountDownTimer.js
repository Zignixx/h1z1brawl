import React, { Component } from 'react'
import { Circle } from 'react-progressbar.js'

export default class CountDownTimer extends Component {
  //props (seconds, color)
  constructor(props) {
    super(props)

    this.tick = this.tick.bind(this)

    this.state = {
      percent: 1,
      seconds: props.seconds
    }
    this.interval = setInterval(this.tick, 1000)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.seconds !== this.props.seconds) {
      this.setState({
        seconds: nextProps.seconds,
        percent: 1
      })
    }
  }

  tick() {
    const seconds = this.state.seconds - 1

    if (seconds <= 0) {
      this.setState({ percent: 0, seconds: 0 })
      clearInterval(this.interval)
      if (this.props.onComplete) {
        setTimeout(this.props.onComplete, 1000) /* wait for the animation to finish */
      }
    } else {
      this.setState({ percent: (seconds / this.props.seconds), seconds })
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval)
    this.setState({ percent: 0, seconds: 0 })
  }

  render() {
    const { percent, seconds } = this.state
    return (
      <Circle
        progress={percent}
        options={{duration: 1000, color: this.props.color}}
        containerStyle={{width: '40px', height: '40px'}}
        text={seconds + ''}
      />
    )
  }

}
