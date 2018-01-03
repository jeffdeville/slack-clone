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

      this.unsubscribe = nextProps.data.subscribeToMore({
        document: SubscriptionNewChannel,
        updateQuery: (prev, { subscriptionData: { data: { putChannel } } }) => {
          // This will only work for putChannel, not deleteChannel
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
  }

  renderList(channelId) {
    return this.props.data.allChannels.map((channel) => {
      const linkClass = channelId === channel.id ? 'active' : ''

      return (
        <li key={channel.id}>
          <Link to={`/channels/${channel.id}`} className={ linkClass } >{channel.name}</Link>
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
        <div>
          <h1>Channels</h1>
          <ul id="channel-list" className="list-unstyled">
            { this.renderList(this.props.channelId) }
          </ul>
        </div>
        <CreateChannel />
      </div>
    )
  }
}

export default graphql(AllChannels)(ChannelList)
