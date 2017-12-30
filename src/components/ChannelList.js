import React, { Component } from 'react'
import './ChannelList.css'
import AllChannels from '../Queries/AllChannels'
import { graphql } from 'react-apollo'
import { Link } from "react-router-dom";

class ChannelList extends Component {
  renderList() {
    return this.props.data.allChannels.map((channel) => {
      return (
        <li key={channel.name} className="list-group-item">
          <Link to={`/channels/${channel.id}`}>{channel.name}</Link>
        </li>
      )
    })
  }

  render() {
    console.log(this.props)
    if (this.props.data.loading) {
      return <div></div>
    }
    return (
      <ul id="channel-list" className="list-group">
        { this.renderList() }
      </ul>
    )
  }
}

export default graphql(AllChannels)(ChannelList)
