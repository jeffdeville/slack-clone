import React, { Component } from 'react'
import './channel_list.css'

export default class ChannelList extends Component {
  renderList() {
    return this.props.channels.map((channel) => {
      return (
        <li key={channel.name}>
          <a onClick={() => this.props.selectChannel(channel)}>{channel.name}</a>
        </li>
      )
    })
  }

  render() {
    return (
      <ul id="channel-list">
        { this.renderList() }
      </ul>
    )
  }
}
