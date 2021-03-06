import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { v4 as uuid } from 'uuid'
import moment from 'moment'

import PutMessage from '../GraphQL/PutMessage'
import QueryGetChannelMessages from "../GraphQL/QueryGetChannelMessages";

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
    this.props
      .mutate({
        variables: {
          content: this.state.content,
          messageId: uuid(),
          channelId: this.props.channelId,
          createdAt: moment.utc().format(),
        },
        refetchQueries: [
          {
            query: QueryGetChannelMessages,
            variables: { channelId: this.props.channelId }
          }
        ]
      })
      .then(() => this.setState({ content: "" }))
      .catch(error => console.log(error));
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit} className="input-group channel-input bottom-form">
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
