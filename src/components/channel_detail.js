import React from "react";
import ChannelMessage from './channel_message'
import CreateMessage from './create_message'
import "./channel_detail.css"


const ChannelDetail = props => {
  const { name, messages } = props.channel
  const messageHTML = messages.map((message) => <ChannelMessage key={message.id} message={message} />)
  return (
    <div id="channel-detail">
      <div className="channel-header">
        <h1>{ name }</h1>
      </div>
      <ul className="channel-messages">
        { messageHTML }
      </ul>
      <CreateMessage addMessage={props.addMessage} />
    </div>
  )
}

export default ChannelDetail;
