import * as React from 'react';
import { Button, FlatList, Modal, StyleSheet, Text, TextInput, View } from 'react-native';

import { Constants } from 'expo';
import { invites } from '../firebase.js'
import Colors from '../constants/Colors';

/*
  Orders Screen
    [ ] Should be used for pending invites

  componentDidMount = () => {
    // This is an example of how to grab an invite
    invites.doc('N8Ur2NvmqBBUmynPQvZ3').get().then(doc => {
      let defObj = { hostname: "", hostid: "", partymembers: []}
      let data = { ... defObj, ...doc.data() }
      console.log(data);
    })
  }
*/

// change to drop shadow like Checks Screen

export default class OrderScreen extends React.Component {
  state = {
    modalVisible: false,
  };

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible, });
  }

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
  };

  render() {
    return (
      <View style={styles.container}>
        <Body {...this.props} />
        <View style={styles.button}><Button color={Colors.fabButton} title='Create Invite' onPress={() => this.setModalVisible(!this.state.modalVisible)} /></View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => this.setState({ modalVisible: false })}
        >
          <View style={styles.modalOuter}>
            <View style={styles.modalInner}>
              <TextInput
                style={styles.modalInput}

                autoCorrect={false}
                enablesReturnKeyAutomatically={true}
                label='Restaurant'
                placeholder='Restaurant'
                returnKeyType='next'
              />
              <TextInput
                style={styles.modalMultilineInput}

                autoCorrect={false}
                enablesReturnKeyAutomatically={true}
                label='Friends'
                multiline={true}
                numberOfLines={3}
                placeholder='friend@splitzease.com'
                returnKeyType='next'
              />
              <View style={styles.modalButton}>
                <Button color={Colors.fabButton} title='Send Invite' onPress={() => this.setModalVisible(!this.state.modalVisible)} />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}



const order_data = [
  {
    id: '0000000001',
    host: 'user_id',
    restaurant: 'Applebee\'s',
    accepted: 'true',

  },
  {
    id: '0000000002',
  },
  {
    id: '0000000003',
  },
];

class Body extends React.PureComponent {
  render() {
    return (
      <FlatList
        data={order_data}
        renderItem={({ item }) => {
          let obj = {...this.props, ...item}
          return <Order {...obj} />
        }}
        style={styles.body}
      />
    );
  }
}

class Order extends React.Component {

  accept = (id) => {
    let inviteRef = invites.doc(this.props.account.uid).collection('invites');
    inviteRef.doc(id).set({
      ts: Date.now(),
      host: 'user_id',
      restaurant: 'Applebees',
      accepted: true
    })
  }

  render() {
    return (
      <View style={styles.order} key={this.props.id}>
        <Text style={styles.orderHeader}>
          Order Number: {this.props.id || '0000000000'}
        </Text>
        <Text style={styles.tabbedText}>
          {this.props.host || 'Host'} has invited you to order food from {this.props.restaurant || 'some restaurant'}!
        </Text>
        <View style={styles.horizontalView}>
          <Button
            color={Colors.cardAffirmButton}
            title='Accept'
            onPress={() => this.accept(this.props.id)}>
          </Button>
          <Button
            color={Colors.cardNegaButton}
            title='Decline'
            onPress={() => console.log('User declined invite!')}>
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 10,
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: Colors.background,
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
    shadowColor: '#000000',
    shadowOffset: { width: -3, height: 3 },
    shadowOpacity: 0.5,
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
