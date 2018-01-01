import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { v4 as uuid } from 'uuid'

import PutMessage from '../Queries/PutMessage'
import GetChannel from '../Queries/GetChannel'
import './CreateMessage.css'

class CreateMessage extends Component {
  constructor(props) {
    super(props)

    this.state = { content: '' }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onTextChange = this.onTextChange.bind(this)
  }

  onTextChange(event) {
    this.setState({ content: event.target.value })
  }

  onFormSubmit(event) {
    event.preventDefault()
    // TODO: Implement an optimistic update
    this.props.mutate({
      variables: { content: this.state.content, messageId: uuid(), channelId: "1" },
      refetchQueries: [{ query: GetChannel, variables: { id: "1"} }]
    }).then(() => this.setState({ content: '' }))
    .catch(error => console.log(error))
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit} className="input-group channel-input">
        <input
          type="text"
          className="form-control"
          placeholder="Message..."
          onChange={ this.onTextChange }
          value={ this.state.content }
          />
        <span className="input-group-btn">
          <button className="btn btn-primary">Submit</button>
        </span>
      </form>
    )
  }
}

export default graphql(PutMessage)(CreateMessage)
