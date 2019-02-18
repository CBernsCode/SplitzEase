import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import AccountScreen from '../screens/AccountScreen';
import {
  AcctActions,
  CheckActions,
  FriendActions
} from '../actions/'


const mapStateToProps = store => ({
  checks: store.checkReducer,
  account: store.acctReducer,
  friends: store.frndReducer
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  acctActions: bindActionCreators(AcctActions, dispatch),
  chkActions: bindActionCreators(CheckActions, dispatch),
  frndActions: bindActionCreators(FriendActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountScreen);
