import React from 'react'

export default function ({ message }) {
  const { content } = message
  return (
    <li className="message">
      <div className="message-text">
        <p>{ content }</p>
      </div>
    </li>
  )
}


