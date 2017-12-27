import React, { Component } from 'react'

export default class CreateMessage extends Component {
  render() {
    return (
      // Need to create the container, the text, and the button
      <div className="row">
        <div className="col">
          <input type="text" />
          <button className="btn btn-primary">
            Send
          </button>
        </div>
      </div>
    )
  }
}
