export function selectChannel(channel) {
  return {
    type: 'CHANNEL_SELECTED',
    payload: channel
  }
}

export function addMessage(message) {
  console.log(`Adding a message: ${message}`)
  return {
    type: 'CHANNEL_ADD_MESSAGE',
    payload: message
  }
}
