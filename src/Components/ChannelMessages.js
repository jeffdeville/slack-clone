import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import QueryGetChannelMessages from '../GraphQL/QueryGetChannelMessages'
import SubscriptionNewMessage from '../GraphQL/SubscriptionNewMessage'
import ChannelMessage from './ChannelMessage'

class ChannelMessages extends Component {
  subscription;

  componentDidMount() {
    this.subscription = this.props.subscribeToMessages();
  }

  componentWillUnmount() {
    this.subscription()
  }

  render() {
    const { loading, messages } = this.props
    if (loading) { return <div></div> }
    const messageHTML = [].concat(messages)
      .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
      .map(message => <ChannelMessage key={message.messageId} message={message} />)

    return <ul className="channel-messages">{messageHTML}</ul>;
  }
}


export default graphql(QueryGetChannelMessages, {
  options: ({ channelId }) => ({ variables: { channelId } }),
  props: props => {
    if (props.data.loading) {
      return {
        messages: [],
        loading: true,
        subscribeToMessages: () => { }
      }
    } else {
      return {
        messages: props.data.getChannelMessages,
        loading: props.data.loading,
        subscribeToMessages: () => {
          return props.data.subscribeToMore({
            document: SubscriptionNewMessage,
            variables: { channelId: props.ownProps.channelId },
            updateQuery: ((prev, { subscriptionData: { data: { subscribeToChannelMessages: newMessage } } }) => {
              return {
                getChannelMessages: [
                  ...prev.getChannelMessages.filter(({ messageId }) => messageId !== newMessage.messageId),
                  newMessage
                ]
              }
            })
          })
        }
      }
    }
  }
})(ChannelMessages);
