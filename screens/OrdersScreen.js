import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Constants } from 'expo';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import { InviteStatus, PayTypes } from '../constants/Enums';

export default class OrderScreen extends React.Component {
  static navigationOptions = {
    title: 'Invites',
    header: null,
  };

  componentDidMount = () => {
    const { account, inviteActions } = this.props
    !!account && inviteActions.getInvites(account.user.uid);
  }

  render() {
    return (
      <View style={styles.container}>
        <Body {...this.props} />
      </View>
    );
  }
}

class Body extends React.PureComponent {
  render() {
    const { account, inviteActions } = this.props;

    if(!!this.props.invites.arr) {
      return (
        <FlatList
          data={this.props.invites.arr}
          keyExtractor={(item, index) => item.id.toString()}
          renderItem={({ item }) => {
            return <Order uid={this.props.account.user.uid} {...item} {...this.props}/>
          }}
          style={styles.body}
        />
      );
    } else {
      return (
        <View style={styles.body}>
          <Text style={styles.noInvites}>You currently have no invites.</Text>
          <TouchableOpacity
            onPress={() => { !account && inviteActions.getInvites(account.user.uid.toString())}} >
            <Text style={styles.refreshButton}>Push to refresh.</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}

class Order extends React.Component {
  state = {
    shouldDisplay: true,
  }

  acceptInvite = (uid, sessionId, payType) => {
    console.log(this.props);
    const { inviteActions } = this.props;
    inviteActions.acceptInvite(uid, sessionId, payType);
    this.setState({shouldDisplay: true});
  }

  declineInvite = (uid, sessionId) => {
    console.log(this.props);
    const { inviteActions } = this.props;
    inviteActions.declineInvite(uid, sessionId);
    this.setState({shouldDisplay: false});
  }

  render() {
    if(this.props.status == InviteStatus.pending && this.state.shouldDisplay) {
      // host is paying
      if(this.props.payType == PayTypes.single) {
        return (
          <View style={styles.orderWrapper}>
            <View style={styles.order} key={this.props.id}>
              <Text style={styles.orderHeader}>
                Invite #: {this.props.id || '0000000000'}
              </Text>
              <Text style={styles.tabbedText}>
                User # {this.props.host || 'Host'} has invited you to order food from {this.props.restaurant || 'some restaurant'}!
              </Text>
              <View style={styles.inviteButtons}>
                <TouchableOpacity
                  style={styles.inviteNegButton}
                  onPress={() => {
                    this.declineInvite(
                      this.props.uid,
                      this.props.id
                    )
                  }}>
                  <Text style={styles.inviteNegText}>Decline</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.invitePosButton}
                  onPress={() => {
                    this.acceptInvite(
                      this.props.uid,
                      this.props.id,
                      this.props.payType
                    )
                  }}>
                  <Text style={styles.invitePosText}>Accept Free Meal</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>  
        );

      // user decides how they want to pay
      } else {
        return (
          <View style={styles.orderWrapper}>
            <View style={styles.order} key={this.props.id}>
              <Text style={styles.orderHeader}>
                Invite #: {this.props.id || '0000000000'}
              </Text>
              <Text style={styles.tabbedText}>
                User # {this.props.host || 'Host'} has invited you to order food from {this.props.restaurant || 'some restaurant'}!
              </Text>
              <View style={styles.inviteButtons}>
                <TouchableOpacity
                  style={styles.inviteNegButton}
                  onPress={() => {
                    this.declineInvite(
                      this.props.uid,
                      this.props.id
                    )
                  }}>
                  <Text style={styles.inviteNegText}>Decline</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.invitePosButton}
                  onPress={() => {
                    this.acceptInvite(
                      this.props.uid,
                      this.props.id,
                      PayTypes.share
                    )
                  }}>
                  <Text style={styles.invitePosText}>Accept Share</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.invitePosButton}
                  onPress={() => {
                    this.acceptInvite(
                      this.props.uid,
                      this.props.id,
                      PayTypes.self
                    )
                  }}>
                  <Text style={styles.invitePosText}>Accept Self</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>  
        );
      }
    } else {
      return (
        <View style={styles.orderWrapper}>
          <View style={styles.order} key={this.props.id}>
            <Text style={styles.oldOrderHeader}>
              Invite #: {this.props.id || '0000000000'} [Expired]
            </Text>
            <Text style={styles.tabbedText}>
              User # {this.props.host || 'Host'} invited you to order food at {new Date(Number(this.props.sent)).toLocaleString()}.
            </Text>
          </View>
        </View>  
      );
    }
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 10,
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.background,
    paddingTop: Constants.statusBarHeight,
  },

  fab: {
    backgroundColor: Colors.fabButton,
    bottom: 20,
    color: Colors.fabButtonText,
    fontSize: 20,
    height: 30,
    justifyContent: 'center',
    margin: 5,
    position: 'absolute',
    right: 20,
    width: 30,
  },

  fabButton: {
    height: 5,
    width: 5,
  },

  horizontalRule: {
    borderStyle: 'solid',
    borderBottomWidth: 1,
    marginBottom: 5,
    marginTop: 5,
  },

  horizontalView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },

  modalButton: {
    bottom: 20,
    justifyContent: 'center',
    position: 'absolute',
    width: 300,
  },

  modalInner: {
    backgroundColor: Colors.background,
    borderRadius: 20,
    height: 300,
    padding: 20,
    width: 300,
  },

  modalInput: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 5,
    color: Colors.text,
    fontSize: 20,
    height: 40,
    marginBottom: 10,
    paddingLeft: 20,
  },

  modalMultilineInput: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 5,
    color: Colors.text,
    fontSize: 20,
    height: 40,
    marginBottom: 10,
    paddingLeft: 20,
  },

  modalOuter: {
    alignItems: 'center',
    backgroundColor: Colors.transparentBackDrop,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 20,
  },

  modalTitle: {
    fontSize: 25,
  },

  noInvites: {
    padding: 10,
    textAlign: 'center',
    width: Layout.window.width,
  },

  order: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 20,
    borderColor: Colors.cardHeader,
    borderWidth: 1,
    margin: 10,
    paddingBottom: 10,
    overflow: 'hidden',
  },

  orderHeader: {
    backgroundColor: Colors.cardHeader,
    color: Colors.cardHeaderText,
    padding: 10,
  },

  oldOrderHeader: {
    backgroundColor: '#999999',
    color: Colors.cardHeaderText,
    padding: 10,
  },

  orderWrapper: {
    /* shadowColor: Colors.shadowColor,*/
    /* shadowOffset: { width: -3, height: 3 }, */
    /* shadowOpacity: 0.5, */
  },

  switchWrapper: {

  },

  tabbedText: {
    paddingLeft: 10,
    paddingTop: 10,
  },

  titleBarText: {
    fontFamily: 'PingFangSC-Thin',
    fontSize: 50,
    justifyContent: 'center',
    margin: 3,
    padding: 5,
  },

  inviteButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  invitePosButton : {
    alignItems: 'center',
    backgroundColor: Colors.button,
    borderRadius: 5,
    marginHorizontal: 10,
    marginVertical: 10,
    padding: 10,
  },

  invitePosText: {
    color: "#ffffff",
    fontSize: 15,
  },

  inviteNegButton: {
    alignItems: 'center',
    borderRadius: 5,
    color: Colors.button,
    marginHorizontal: 10,
    marginVertical: 10,
    padding: 10,
  },

  inviteNegText: {
    color: Colors.button,
    fontSize: 15,
  },
});
