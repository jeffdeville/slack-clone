import React, { Component } from "react";
import { graphql } from 'react-apollo'

import GetChannel from '../Queries/GetChannel'
import ChannelMessage from './ChannelMessage'
import CreateMessage from './CreateMessage'
import "./ChannelDetail.css"

class ChannelDetail extends Component {
  render() {
    if (this.props.data.loading) {
      return <div></div>
    }
    const { name, messages } = this.props.data.getChannel
    const messageHTML = messages.map((message) => {
      return <ChannelMessage key={ message.messageId } message={message} />
    })

    return (
      <div id="channel-detail">
        <div className="channel-header">
          <h1>{ name }</h1>
        </div>
        <ul className="channel-messages">
          { messageHTML }
        </ul>
        <CreateMessage addMessage={this.props.addMessage} />
      </div>
    )
  }
}

export default graphql(GetChannel, {
  options: ({ match: { params: { id } } }) => ({
    variables: { id },
    fetchPolicy: 'cache-and-network'
   })
})(ChannelDetail)

