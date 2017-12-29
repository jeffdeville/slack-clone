export default function(state = null, action) {
  switch(action.type) {
    case 'CHANNEL_SELECTED':
      return action.payload
    default:
      return state
  }
}
