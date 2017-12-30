import React, { Component } from 'react'
import './CreateMessage.css'

export default class CreateMessage extends Component {
  constructor(props) {
    super(props)

    this.state = { message: '' }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onTextChange = this.onTextChange.bind(this)
  }

  onTextChange(event) {
    this.setState({ message: event.target.value })
  }

  onFormSubmit(event) {
    event.preventDefault()
    this.props.addMessage(this.state.message)
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit} className="input-group channel-input">
        <input
          type="text"
          className="form-control"
          onChange={ this.onTextChange }
          value={ this.state.value }
          />
        <span className="input-group-btn">
          <button className="btn btn-primary">Submit</button>
        </span>
      </form>
    )
  }
}
