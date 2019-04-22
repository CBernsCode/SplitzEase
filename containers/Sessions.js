import SessionScreen from '../screens/SessionScreen';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  AcctActions,
  CheckActions,
  FriendActions,
  InviteActions,
  SessionActions,
} from '../actions/'


const mapStateToProps = store => ({
  checks: store.checkReducer,
  account: store.acctReducer,
  friends: store.frndReducer,
  invites: store.inviteReducer,
  session: store.sessionReducer,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  acctActions: bindActionCreators(AcctActions, dispatch),
  chkActions: bindActionCreators(CheckActions, dispatch),
  frndActions: bindActionCreators(FriendActions, dispatch),
  inviteActions: bindActionCreators(InviteActions, dispatch),
  sessionActions: bindActionCreators(SessionActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SessionScreen);
