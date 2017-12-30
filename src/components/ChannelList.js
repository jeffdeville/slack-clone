import React, { Component } from 'react'
import './ChannelList.css'
import AllChannels from '../Queries/AllChannels'
import { graphql } from 'react-apollo'

class ChannelList extends Component {
  renderList() {
    return this.props.data.allChannels.map((channel) => {
      return (
        <li key={channel.name}>
          <a onClick={() => this.props.selectChannel(channel)}>{channel.name}</a>
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
      <ul id="channel-list">
        { this.renderList() }
      </ul>
    )
  }
}

export default graphql(AllChannels)(ChannelList)
