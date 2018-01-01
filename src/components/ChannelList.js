import React, { Component } from 'react'
import './ChannelList.css'
import AllChannels from '../Queries/AllChannels'
import { graphql } from 'react-apollo'
import { Link } from "react-router-dom";

import CreateChannel from './CreateChannel'

class ChannelList extends Component {
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
