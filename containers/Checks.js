import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import CheckScreen from '../screens/CheckScreen';
import * as CheckActions from '../actions/Check'
import * as  AcctActions  from '../actions/Account'

const mapStateToProps = store => ({
  checks: store.checkReducer,
  account: store.acctReducer
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  acctActions: bindActionCreators(AcctActions, dispatch),
  chkActions: bindActionCreators(CheckActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckScreen);
