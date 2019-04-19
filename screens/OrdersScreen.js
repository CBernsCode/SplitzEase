import React from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';

import { Constants } from 'expo';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import { InviteStatus, PayTypes } from '../constants/Enums';

export default class OrderScreen extends React.Component {
  static navigationOptions = {
    title: 'Invites',
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <Body {...this.props} />
      </View>
    );
  }
}

// const invite_data = [
//   {
//     key: '0000000001',
//     host: 'user_id',
//     restaurant: 'Applebee\'s',
//     accepted: 'true',
//     slot: '0',
//     sessionId: 'aaabbb123',
//     ts: "041519104900",
//     payType: PayTypes.unknown,

//   },
//   {
//     key: '0000000002',
//     payType: PayTypes.single,
//   },
//   {
//     key: '0000000003',
//     payType: PayTypes.unknown,
//   },
// ];

class Body extends React.PureComponent {
  componentDidMount () {
    const { account } = this.props;
    !!account && !!account.user && this.props.inviteActions.getInvites(account.user.uid.toString());
  }

  acceptInvite = (uid, sessionId, payType) => {
    this.props.inviteActions.acceptInvite(uid, sessionId, payType);
    !!account && !!account.user && this.props.inviteActions.getInvites(account.user.uid.toString());
  }

  declineInvite = (uid, sessionId) => {
    this.props.inviteActions.declineInvite(uid, sessionId);
    !!account && !!account.user && this.props.inviteActions.getInvites(account.user.uid.toString());
  }

  render() {
    if(!!this.props.invites.arr) {
      return (
        <FlatList
          data={this.props.invites.arr}
          keyExtractor={(item, index) => item.id.toString()}
          renderItem={({ item }) => {
            return <Order acceptInvite={this.acceptInvite.bind(this)} declineInvite={this.declineInvite.bind(this)} uid={this.props.account.user.uid} {...item}/>
          }}
          style={styles.body}
        />
      );
    } else {
      return (
        <View style={styles.body}>
          <Text style={styles.noInvites}>You currently have no invites.</Text>
        </View>
      );
    }
  }
}

class Order extends React.Component {
  render() {
    if(this.props.status == InviteStatus.pending) {
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
              <View style={styles.horizontalView}>
                <Button
                  color={Colors.cardAffirmButton}
                  title='Accept Free Meal'
                  onPress={() => {
                    this.props.acceptInvite(
                      this.props.uid,
                      this.props.sessionId,
                      this.props.payType
                    )
                  }}>
                </Button>
                <Button
                  color={Colors.cardNegaButton}
                  title='Decline'
                  onPress={() => {
                    this.props.declineInvite(
                      this.props.uid,
                      this.props.sessionId,
                    )
                  }}>
                </Button>
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
              <View style={styles.horizontalView}>
                <Button
                  color={Colors.cardAffirmButton}
                  title='Accept Self'
                  onPress={() => {
                    this.props.acceptInvite(
                      this.props.uid,
                      this.props.sessionId,
                      PayTypes.self
                    )
                  }}>
                </Button>
                <Button
                  color={Colors.cardAffirmButton}
                  title='Accept Share'
                  onPress={() => {
                    this.props.acceptInvite(
                      this.props.uid,
                      this.props.sessionId,
                      PayTypes.share
                    )
                  }}>
                </Button>
                <Button
                  color={Colors.cardNegaButton}
                  title='Decline'
                  onPress={() => {
                    this.props.declineInvite(
                      this.props.uid,
                      this.props.sessionId
                    )
                  }}>
                </Button>
              </View>
            </View>
          </View>  
        );
      }
    } else {
      return false;
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
});
