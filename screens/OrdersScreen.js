import React from 'react';
import { Button, ButtonGroup, FlatList, Modal, StyleSheet, Switch, Text, TextInput, View } from 'react-native';

import { Constants } from 'expo';
import { invites } from '../firebase.js'
import Colors from '../constants/Colors';
import { PayTypes } from '../constants/Enums';

export default class OrderScreen extends React.Component {
  static navigationOptions = {
    title: 'Invites',
    headerStyle: {
      backgroundColor: Colors.primaryHeader,
      elevation: 0,
    },
    headerTintColor: Colors.text,
    headerTitleStyle: {
      fontWeight: 'bold',
    },
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

const order_data = [
  {
    key: '0000000001',
    host: 'user_id',
    restaurant: 'Applebee\'s',
    accepted: 'true',
    slot: '0',
    sessionId: 'aaabbb123',
    ts: "041519104900",
    payType: PayTypes.unknown,

  },
  {
    key: '0000000002',
    payType: PayTypes.single,
  },
  {
    key: '0000000003',
    payType: PayTypes.unknown,
  },
];

class Body extends React.PureComponent {
  render() {
    return (
      <FlatList
        data={order_data}
        renderItem={({ item }) => {
          let obj = { ...this.props, ...item }
          return <Order id={item.key} {...obj} />
        }}
        style={styles.body}
      />
    );
  }
}

class Order extends React.Component {
  render() {
    // host is paying
    if(this.props.payType == PayTypes.single) {
      return (
        <View style={styles.orderWrapper}>
          <View style={styles.order} key={this.props.id}>
            <Text style={styles.orderHeader}>
              Invite Number: {this.props.id || '0000000000'}
            </Text>
            <Text style={styles.tabbedText}>
              {this.props.host || 'Host'} has invited you to order food from {this.props.restaurant || 'some restaurant'}!
            </Text>
            <View style={styles.horizontalView}>
              <Button
                color={Colors.cardAffirmButton}
                title='Accept Free Meal'
                onPress={() => {
                  this.props.inviteActions.acceptInvite(
                    this.props.account.uid,
                    this.props.id,
                    this.props.payType
                  )
                }}>
              </Button>
              <Button
                color={Colors.cardNegaButton}
                title='Decline'
                onPress={() => {
                  this.props.inviteActions.declineInvite(
                    this.props.account.uid,
                    this.props.id,
                  )
                }}>
              </Button>
            </View>
          </View>
        </View>  
      );

    // user decides how they want to pay
    } else if (this.props.payType == PayTypes.unknown) {
      return (
        <View style={styles.orderWrapper}>
          <View style={styles.order} key={this.props.id}>
            <Text style={styles.orderHeader}>
              Invite Number: {this.props.id || '0000000000'}
            </Text>
            <Text style={styles.tabbedText}>
              {this.props.host || 'Host'} has invited you to order food from {this.props.restaurant || 'some restaurant'}!
            </Text>
            <View style={styles.horizontalView}>
              <Button
                color={Colors.cardAffirmButton}
                title='Accept Self'
                onPress={() => {
                  this.props.inviteActions.acceptInvite(
                    this.props.account.uid,
                    this.props.id,
                    PayTypes.self
                  )
                }}>
              </Button>
              <Button
                color={Colors.cardAffirmButton}
                title='Accept Share'
                onPress={() => {
                  this.props.inviteActions.acceptInvite(
                    this.props.account.uid,
                    this.props.id,
                    PayTypes.share
                  )
                }}>
              </Button>
              <Button
                color={Colors.cardNegaButton}
                title='Decline'
                onPress={() => {
                  this.props.inviteActions.declineInvite(
                    this.props.account.uid,
                    this.props.id,
                  )
                }}>
              </Button>
            </View>
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
