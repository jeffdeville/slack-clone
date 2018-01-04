import React from 'react'
import moment from 'moment'

export default function ({ message }) {
  const { content, nickname, email, picture, createdAt } = message
  return <li className="message-container">
      <img src={picture} className="profile-img" />
      <div className="message-text">
        <h3>
          {nickname}
          <small>{moment(createdAt).fromNow()}</small>
        </h3>
        <p>{content}</p>
      </div>
    </li>;
}


