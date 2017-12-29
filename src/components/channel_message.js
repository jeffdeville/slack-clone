import React from 'react'

export default function (props) {
  const message = props.message
  return (
    <li className="message">
      <img
        src={ message.author.img }
        className="user-avatar"
      />
      <div className="message-text">
        <h3>{ message.author.name }</h3>
        <p>{ message.message }</p>
      </div>
    </li>
  )
}


