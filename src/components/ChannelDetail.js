import React, { Component } from "react";
import { graphql } from 'react-apollo'

import GetChannel from '../GraphQL/GetChannel'
import SubscriptionNewMessage from '../GraphQL/SubscriptionNewMessage'
import ChannelList from './ChannelList'
import ChannelMessage from './ChannelMessage'
import CreateMessage from './CreateMessage'
import "./ChannelDetail.css"

class ChannelDetail extends Component {
  componentWillReceiveProps(nextProps) {
    if (!nextProps.data.loading) {
      if (this.unsubscribe) { return }
      this.unsubscribe = nextProps.data.subscribeToMore({
        document: SubscriptionNewMessage,
        variables: { channelId: nextProps.match.params.id },
        updateQuery: (prev, { subscriptionData: subData }) => {
          console.log(subData)
          return prev
          // return Object.assign({}, prev, {
          //   getChannel: {
          //     name: prev.getChannel.name,
          //     message: [
          //       ...prevMessages.filter(({id}) => id !== putMessage.id),
          //       putMessage
          //     ]
          //   }
          // })
        }
      })
    }
  }
  render() {
    if (this.props.data.loading) {
      return <div></div>
    }
    const { name, messages } = this.props.data.getChannel
    const messageHTML = messages.map((message) => {
      return <ChannelMessage key={ message.messageId } message={message} />
    })
    return (
      <div className="main">
        <ChannelList channelId={this.props.match.params.id} />
        <div id="channel-detail">
          <h1>{ name }</h1>
          <ul className="channel-messages">
            { messageHTML }
          </ul>
          <CreateMessage channelId={this.props.match.params.id} />
        </div>
      </div>
    )
  }
}

export default graphql(GetChannel, {
  options: ({ match: { params: { id } } }) => ({
    variables: { id }
   })
})(ChannelDetail)

