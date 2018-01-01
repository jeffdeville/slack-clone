import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { v4 as uuid } from 'uuid'

import PutChannel from '../Queries/PutChannel'
import AllChannels from '../Queries/AllChannels';

class CreateChannel extends Component {
  constructor(props) {
    super(props)

    this.state = { newChannel: '' }
    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  onChange(event) {
    this.setState({ newChannel: event.target.value })
  }

  onSubmit(event) {
    event.preventDefault()

    // TODO: Optimistic update?  Not here, because I'd
    // then have to make the link work too.
    this.props.mutate({
      variables: { name: this.state.newChannel, id: uuid() },
      refetchQueries: [{ query: AllChannels }]
    }).then(() => this.setState({ newChannel: '' }))
    .catch(error => console.log(error))
  }

  render() {
    return (
      <form onSubmit={this.onSubmit} className="input-group">
        <input
          className="form-control"
          type="text"
          name="newChannel"
          placeholder="Name Your Channel"
          value={this.state.newChannel}
          onChange={this.onChange} />
        <span className="input-group-btn">
          <button className="btn btn-primary">Submit</button>
        </span>
      </form>
    )
  }
}

export default graphql(PutChannel)(CreateChannel)
