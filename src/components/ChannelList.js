import React, { Component } from 'react'
import './ChannelList.css'
import AllChannels from '../GraphQL/AllChannels'
import SubscriptionNewChannel from '../GraphQL/SubscriptionNewChannel'
import { graphql } from 'react-apollo'
import { Link } from "react-router-dom";

import CreateChannel from './CreateChannel'

class ChannelList extends Component {
  componentWillReceiveProps(nextProps) {
    if (!nextProps.data.loading) {
      if (this.unsubscribe) { return }
    }
    this.unsubscribe = nextProps.data.subscribeToMore({
      document: SubscriptionNewChannel,
      updateQuery: (prev, { subscriptionData: { data: { putChannel } } }) => {
        return Object.assign({}, prev, {
          allChannels: [
            ...prev.allChannels.filter(({id}) => {
              return id !== putChannel.id
            }),
            putChannel
          ]
        })
      }
    })
  }

  renderList() {
    return this.props.data.allChannels.map((channel) => {
      return (
        <li key={channel.id} className="list-group-item">
          <Link to={`/channels/${channel.id}`}>{channel.name}</Link>
        </li>
      )
    })
  }

  render() {
    if (this.props.data.loading) {
      return <div></div>
    }
    return (
      <div className="channel-list-panel">
        <ul id="channel-list" className="list-group">
          { this.renderList() }
        </ul>
        <CreateChannel />
      </div>
    )
  }
}

export default graphql(AllChannels)(ChannelList)
