import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { selectChannel } from '../actions'
import ChannelList from '../components/channel_list'

function mapStateToProps(state) {
  return { channels: state.channels }
}

// Anything returned will wind up as props on Channel List
function mapDispatchToProps(dispatch) {
  // whenever selectBook is called, the result should be passed to
  // all of our reducers.
  return bindActionCreators({ selectChannel: selectChannel }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelList)
