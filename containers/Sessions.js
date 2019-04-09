import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import SessionScreen from '../screens/SessionScreen';
import {
  AcctActions,
  CheckActions,
  FriendActions,
  InviteActions,
} from '../actions/'


const mapStateToProps = store => ({
  checks: store.checkReducer,
  account: store.acctReducer,
  friends: store.frndReducer,
  invites: store.inviteReducer,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  acctActions: bindActionCreators(AcctActions, dispatch),
  chkActions: bindActionCreators(CheckActions, dispatch),
  frndActions: bindActionCreators(FriendActions, dispatch),
  inviteActions: bindActionCreators(InviteActions, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SessionScreen);
