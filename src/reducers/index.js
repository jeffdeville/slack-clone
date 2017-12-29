import { combineReducers } from 'redux'
import Channels from './channels'
import CurrentChannel from './current_channel'
import Messages from './messages'

const rootReducer = combineReducers({
  channels: Channels,
  currentChannel: CurrentChannel,
  messages: Messages,
})

export default rootReducer
