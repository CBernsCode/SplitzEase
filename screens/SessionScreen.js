import React from 'react';
import { Alert, Button, FlatList, Modal, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { Constants } from 'expo';
import { changeSessionState, createSession, sendChecks } from '../firebase'
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import { PayTypes, SessionStatuses } from '../constants/Enums'
import { BillGenerator } from '../utils/BillGenerator'

export default class SessionScreen extends React.Component {
  static navigationOptions = {
    title: 'Events',
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

  state = {
    guestList: new Array(),
    modalVisible: false,
    payForGuests: false,
    paymentType: PayTypes.self,
    restaurant: '',
    shouldRefresh: false,
  };

  addGuest = (id) => {
    // add guest
    if(!this.guestIsSelected(id)) {
      let tempArr = this.state.guestList;
      tempArr.push(id)
      this.setState({guestList: tempArr});

    // remove guest
    } else {
      let tempArr = this.state.guestList;
      let idIndex = tempArr.indexOf(id);
      tempArr.splice(idIndex, 1);

      this.setState({guestList: tempArr});
    }
  }

  guestIsSelected = (id) => {
    // console.log(this.state.guestList);
    return this.state.guestList.includes(id)
  }

  resetModalMenu = () => {
    this.setModalVisible(!this.state.modalVisible);

    this.setState({
      guestList: new Array(),
      modalVisible: false,
      payForGuests: false,
      paymentType: PayTypes.self,
      restaurant: '',
    });
  }

  sendInvites = () => {
    // only do this when all fields are filled in
    if(!!this.state.restaurant && !!this.state.guestList[0]) {
      sessionId = createSession(this.props.account.user.uid, this.state.guestList, this.state.restaurant, this.state.paymentType);
      changeSessionState(this.props.account.user.uid, sessionId, SessionStatuses.pending);
      !!this.props.account && !this.props.account.user && this.props.SessionActions.loadSessions(account.user.uid);
      this.resetModalMenu();
      this.setState({ modalVisible: !this.state.modalVisible});
    } else {
      Alert.alert(
        'No Invites Sent',
        'Please fill in all fields before sending invites',
        [
          {text: 'OK', onPress: () => {}},
        ],
        {cancelable: true},
      );
    }
  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible});
  }

  setPaymentType = () => {
    this.setState({payForGuests: !this.state.payForGuests})

    if(this.state.payForGuests) {
      this.setState({paymentType: PayTypes.single});
    } else {
      this.setState({paymentType: PayTypes.self});
    }
  }

  setRestaurant = (rest) => {
    // console.log(rest);
    this.setState({restaurant: rest});
  }

  render() {
    return (
      <View style={styles.container}>
        <Body {...this.props} />
        <View style={styles.button}><Button color={Colors.fabButton} title='Create Event' onPress={() => this.setModalVisible(!this.state.modalVisible)} /></View>
        <Modal
          animationType="fade"
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
                onChangeText={(rest) => this.setRestaurant(rest)}
                placeholder='Restaurant'
                returnKeyType='next'
              />
              <View style={styles.switchBar}>
                <Text style={styles.switchBarLabel}>Pay for guests?</Text>
                <Switch style={styles.switch} onValueChange={() => this.setPaymentType()} value={this.state.payForGuests}/>
              </View>
              <View style={styles.friendsList}>
                <Text style={styles.friendsListHeader}>Friends List</Text>
                <FriendsList
                  addGuest = {this.addGuest.bind(this)} // makes addGuest available to FriendsList... adds it to this.props
                  guestIsSelected = {this.guestIsSelected.bind(this)}
                  {...this.props}
                  />
              </View>
              <View style={styles.modalButton}>
                {/* Send Invite Button should actually send an invite in the future */}
                <Button color={Colors.fabButton} title='Send Invites' onPress={() => this.sendInvites()} />
                <Button color={Colors.fabButton} title='Cancel' onPress={() => this.resetModalMenu()} />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

class Body extends React.PureComponent {
  componentDidMount () {
    const { account, SessionActions } = this.props;
    !!account && !!account.user && SessionActions.loadSessions(account.user.uid);
  }

  render() {
    return (
      <EventList {...this.props}/>
    );
  }
}

class EventList extends React.Component {
  render() {
    if(!!this.props.session.arr) {
      return(
        <FlatList
          data = {this.props.session.arr}
          keyExtractor={(item, index) => index.toString()}
          renderItem = {({item}) =>
            <Event
              {...item}
            />
          }
        />
      );
    } else {
      return(
        <View style={styles.body}>
          <Text style={styles.noEvents}>You currently have no sessions.</Text>
        </View>
      );
    }
  }
}

class Event extends React.Component {
  cancelEvent = (hostId, sessionId) => {
    changeSessionState(hostId, sessionId, SessionStatuses.cancelled);
    !!this.props.account && !!this.props.account.user && this.props.SessionActions.loadSessions(account.user.uid);
  }

  finishEvent = (hostId, sessionId, inviteList, restaurant, payType) => {
    let billGenerator = new BillGenerator(hostId, restaurant, inviteList);
    sendChecks(billGenerator.makeCheck(sessionId, payType));
    changeSessionState(hostId, sessionId, SessionStatuses.done);
    !!this.props.account && !!this.props.account.user && this.props.SessionActions.loadSessions(account.user.uid);
  }

  render () {
    if(this.props.status == SessionStatuses.pending) {
      return (
        <View style={styles.eventWrapper}>
          <View style={styles.event}>
            <Text style={styles.eventHeader}>Event ID: {this.props.sessionId || "000000000"}</Text>
            <Text style={styles.tabbedText}>Restaurant: {this.props.restaurant || "Some Restaurant"}</Text>
            <Text style={styles.tabbedText}>Status: {this.props.status || "Some Status"}</Text>
            <Text style={styles.tabbedText}>Payment Type: {this.props.payType || "Payment"}</Text>
            <Text style={styles.tabbedText}>Guest List:</Text>
            <GuestList inviteList={this.props.inviteList}/>
            <Button
              color={Colors.cardAffirmButton}
              title='Done'
              onPress={() => this.finishEvent(this.props.host, this.props.sessionId, this.props.inviteList, this.props.restaurant, this.props.payType)}>
            </Button>
            <Button
              color={Colors.cardNegaButton}
              title='Cancel'
              onPress={() => this.cancelEvent(this.props.host, this.props.sessionId)}>
            </Button>
          </View>
        </View>
      );
    } else if (this.props.status == SessionStatuses.done) {
      return (
        <View style={styles.eventWrapper}>
          <View style={styles.event}>
            <Text style={styles.eventHeader}>Event ID: {this.props.sessionId || "000000000"}</Text>
            <Text style={styles.tabbedText}>Restaurant: {this.props.restaurant || "Some Restaurant"}</Text>
            <Text style={styles.tabbedText}>Status: {this.props.status || "Some Status"}</Text>
            <Text style={styles.tabbedText}>Payment Type: {this.props.payType || "Payment"}</Text>
            <Text style={styles.tabbedText}>Guest List:</Text>
            <GuestList inviteList={this.props.inviteList}/>
          </View>
        </View>
      );
    } else {
      return(
        <View></View>
      );
    }
  }
}

class GuestList extends React.Component {
  render () {
    return (
      <FlatList
        data={this.props.inviteList}
        keyExtractor={(item, index) => item.id.toString()}
        renderItem={({item, index}) => 
          <Text style={styles.guestList}>{item.guest}</Text>
        }
      />
    );
  }
}

class FriendsList extends React.Component {
  componentDidMount () {
    const { account } = this.props;

    !!account && !!account.user && this.props.frndActions.getFriends(account.user.uid);
  }

  render () {
    return (
      <FlatList
        data={this.props.friends.arr}
        keyExtractor={(item, index) => item.id.toString()}
        renderItem={({item, index}) => 
          index % 2 == 0 ?
            <TouchableOpacity
              style={[styles.friend, {backgroundColor: this.props.guestIsSelected(item.id) ? Colors.secondaryLightColor: Colors.primaryLightColor}]}
              id={item.id}
              index={index}
              name={item.name}
              onPress={() => this.props.addGuest(item.id)}
              {...item}
            ><Text>{item.name}</Text></TouchableOpacity>  
            :
            <TouchableOpacity
              style={[styles.friend, {backgroundColor: this.props.guestIsSelected(item.id) ? Colors.secondaryLightColor: Colors.primaryColor}]}
              id={item.id}
              index={index}
              name={item.name}
              {...item}
              onPress={() => this.props.addGuest(item.id)}
            ><Text>{item.name}</Text></TouchableOpacity>
          }
      />
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

  friend: {
    flex: 1,
    fontSize: 20,
    padding: 10,
    paddingBottom: 15,
    paddingTop: 15,
  },
  
  friendsList: {
    backgroundColor: Colors.cardBackground,
    borderColor: Colors.cardAffirmButton,
    borderRadius: 20,
    borderStyle: 'solid',
    borderWidth: 1,
    height: 175,
    marginBottom: 10,
    marginTop: 10,
    overflow: 'hidden',
  },

  friendsListHeader: {
    backgroundColor: Colors.secondaryDarkColor,
    color: Colors.primaryLightColor,
    fontSize: 15,
    padding: 5,
    paddingLeft: 10,
  },

  guestList: {
    paddingLeft: 25,
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
    bottom: 10,
    justifyContent: 'center',
    marginBottom: 5,
    position: 'absolute',
    width: 300,
  },

  modalInner: {
    backgroundColor: Colors.background,
    borderRadius: 20,
    height: 400,
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

  noEvents: {
    padding: 10,
    textAlign: 'center',
    width: Layout.window.width,
  },

  event: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 20,
    borderColor: Colors.cardHeader,
    borderWidth: 1,
    margin: 10,
    paddingBottom: 10,
    overflow: 'hidden',
  },

  eventHeader: {
    backgroundColor: Colors.cardHeader,
    color: Colors.cardHeaderText,
    padding: 10,
  },

  eventWrapper: {
    /* shadowColor: Colors.shadowColor,*/
    /* shadowOffset: { width: -3, height: 3 }, */
    /* shadowOpacity: 0.5, */
  },

  switchBar: {
    alignItems: 'stretch',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 5,
    width: Layout.window.width,
  },

  switchBarLabel: {
    paddingRight: 5,
  },

  switch: {
    
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
