import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import QueryGetChannelMessages from '../GraphQL/QueryGetChannelMessages'
import SubscriptionNewMessage from '../GraphQL/SubscriptionNewMessage'
import ChannelMessage from './ChannelMessage'

class ChannelMessages extends Component {
  subscription;

  componentDidMount() {
    console.log("Subscribing to message");
    this.subscription = this.props.subscribeToMessages();
  }

  componentWillUnmount() {
    this.subscribeToMessages();
  }

  render() {
    const { loading, messages } = this.props
    if (loading) { return <div></div> }

    const messageHTML = messages.map(message => {
      return <ChannelMessage key={message.messageId} message={message} />;
    });

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
      console.log(props)
      return {
        messages: props.data.getChannelMessages,
        loading: props.data.loading,
        subscribeToMessages: () => {
          console.log("SubToMessagesParams", {
            document: SubscriptionNewMessage,
            variables: {
              channelId: props.ownProps.channelId
            }
          })
          return props.data.subscribeToMore({
            document: SubscriptionNewMessage,
            variables: {
              channelId: props.ownProps.channelId
            },
            updateQuery: ((prev, updated) => {
              console.log(["I win again", prev, updated])
              return prev
            })
          })
        }
      }
    }
  }
})(ChannelMessages);
