import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import LoginScreen from '../screens/LoginScreen';
import {
  AcctActions,
} from '../actions/'


const mapStateToProps = store => ({
  account: store.acctReducer,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  acctActions: bindActionCreators(AcctActions, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginScreen);
