import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addMessage } from '../actions'
import ChannelDetail from '../components/channel_detail'

function mapStateToProps(state) {
  return {
    channel: state.currentChannel || state.channels[0]
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addMessage: addMessage}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelDetail)
