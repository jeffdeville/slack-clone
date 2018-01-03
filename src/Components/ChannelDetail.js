import React, { Component } from "react";
import { graphql } from 'react-apollo'

import GetChannel from '../GraphQL/GetChannel'
import ChannelList from './ChannelList'
import ChannelMessages from './ChannelMessages'
import CreateMessage from './CreateMessage'
import "./ChannelDetail.css"

class ChannelDetail extends Component {
  render() {
    if (this.props.loading) {
      return <div></div>
    }
    console.log('ChannelDetails', this.props)
    const { name } = this.props
    const channelId = this.props.match.params.id
    return (
      <div className="main">
        <ChannelList channelId={channelId} />
        <div id="channel-detail">
          <h1>{ name }</h1>
          <ChannelMessages channelId={channelId} />
          <CreateMessage channelId={channelId} />
        </div>
      </div>
    )
  }
}

export default graphql(GetChannel, {
  options: ({ match: { params: { id } } }) => ({
    variables: { id }
  }),
  props: props => ({
    loading: props.data.loading,
    name: props.data.getChannel.name
  })
})(ChannelDetail)

