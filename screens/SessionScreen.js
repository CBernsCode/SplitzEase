import React from 'react';
import { Alert, FlatList, Modal, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { Constants } from 'expo';
import { sendChecks } from '../firebase'
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

  componentDidMount = () => {
    const { account, sessionActions } = this.props
    !!account && sessionActions.loadSessions(account.user.uid);
  }

  addGuest = (id) => {
    // add guest
    if (!this.guestIsSelected(id)) {
      let tempArr = this.state.guestList;
      tempArr.push(id)
      this.setState({ guestList: tempArr });

      // remove guest
    } else {
      let tempArr = this.state.guestList;
      let idIndex = tempArr.indexOf(id);
      tempArr.splice(idIndex, 1);

      this.setState({ guestList: tempArr });
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
      shouldRefresh: false,
    });
  }

  sendEvent = () => {
    // only do this when all fields are filled in
    const { account, sessionActions } = this.props
    if (!!this.state.restaurant && !!this.state.guestList[0]) {
      sessionId = sessionActions.createSession(account.user.uid, this.state.guestList, this.state.restaurant, this.state.paymentType);
      this.resetModalMenu();
      this.setState({ modalVisible: !this.state.modalVisible });
    } else {
      Alert.alert(
        'No Invites Sent',
        'Please fill in all fields before sending invites',
        [
          { text: 'OK', onPress: () => { } },
        ],
        { cancelable: true },
      );
    }
  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  setPaymentType = () => {
    this.setState({ payForGuests: !this.state.payForGuests })

    if (this.state.payForGuests) {
      this.setState({ paymentType: PayTypes.single });
    } else {
      this.setState({ paymentType: PayTypes.self });
    }
  }

  setRestaurant = (rest) => {
    // console.log(rest);
    this.setState({ restaurant: rest });
  }

  setShouldRefresh = (refresh) => {
    this.setState({ shouldRefresh: refresh });
  }

  getShouldRefresh = () => {
    return this.state.shouldRefresh;
  }

  render() {
    return (
      <View style={styles.container}>
        <Body getShouldRefresh={this.getShouldRefresh.bind(this)} setShouldRefresh={this.setShouldRefresh.bind(this)} {...this.props} />
        
        <TouchableOpacity
          style={styles.customButton}
          onPress={() => this.setModalVisible(!this.state.modalVisible)}>
          <Text style={styles.buttonText}>Create Event</Text>
        </TouchableOpacity>

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
              <View style={styles.friendsList}>
                <Text style={styles.friendsListHeader}>Friends List</Text>
                <FriendsList
                  addGuest={this.addGuest.bind(this)} // makes addGuest available to FriendsList... adds it to this.props
                  guestIsSelected={this.guestIsSelected.bind(this)}
                  {...this.props}
                />
              </View>
              <View style={styles.switchBar}>
                <Text style={styles.switchBarLabel}>Pay for guests?</Text>
                <Switch style={styles.switch} onValueChange={() => this.setPaymentType()} value={this.state.payForGuests} />
              </View>
              <TouchableOpacity
                onPress={() => this.sendEvent()}
                style={styles.modalPosButton}>
                <Text style={styles.buttonText}>Send Event</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.resetModalMenu()}
                style={styles.modalNegButton}>
                <Text style={styles.modalNegText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

class Body extends React.Component {
  render() {
    return (
      <EventList // getShouldRefresh={this.props.getShouldRefresh.bind(this)} setShouldRefresh={this.props.setShouldRefresh.bind(this)} 
        {...this.props} />
    );
  }
}

class EventList extends React.Component {
  render() {
    const { account, sessionActions } = this.props;
    if (!!this.props.session.arr[0]) {
      return (
        <FlatList
          data={this.props.session.arr}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) =>
            <Event
              index={index}
              {...item}
              {...this.props}
            />
          }
        />
      );
    } else {
      return (
        <View style={styles.body}>
          <Text style={styles.noEvents}>You currently have no sessions.</Text>
          <TouchableOpacity
            onPress={() => { !account && sessionActions.loadSessions(account.user.uid) }}>
            <Text style={styles.refreshButton}>Push to refresh.</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}

class Event extends React.Component {
  state = {
    shouldDisplay: true,
  }

  cancelEvent = (hostId, sessionId) => {
    const { sessionActions } = this.props;

    sessionActions.changeSessionState(hostId, sessionId, SessionStatuses.cancelled);
    this.setState({shouldDisplay: false});
  }

  finishEvent = (hostId, sessionId, inviteList, restaurant, payType) => {
    const { sessionActions } = this.props;

    let billGenerator = new BillGenerator(hostId, restaurant, inviteList);
    sendChecks(billGenerator.makeCheck(sessionId, payType));
    sessionActions.changeSessionState(hostId, sessionId, SessionStatuses.done);
    this.setState({shouldDisplay: true});
  }

  sendInvites = (hostId, sessionId) => {
    const { sessionActions } = this.props;
    
    this.props.inviteActions.MOCK_inviteAccept(hostId, sessionId);
    sessionActions.changeSessionState(hostId, sessionId, SessionStatuses.pending);
    this.setState({shouldDisplay: true});
  }

  render () {
    if(this.props.status == SessionStatuses.pending && this.state.shouldDisplay) {
      return (
        <View style={styles.eventWrapper}>
          <View style={styles.event}>
            <Text style={styles.eventHeader}>Event #: {this.props.index+1 || "1"}</Text>
            <Text style={styles.tabbedText}>Restaurant: {this.props.restaurant || "Some Restaurant"}</Text>
            <Text style={styles.tabbedText}>Status: {this.props.status || "Some Status"}</Text>
            <Text style={styles.tabbedText}>Payment Type: {this.props.paytype || "Payment"}</Text>
            <Text style={styles.tabbedText}>Guest List:</Text>
            <GuestList inviteList={this.props.inviteList} />
  
            <View style={styles.eventButtons}>
              <TouchableOpacity
                onPress={() => this.cancelEvent(this.props.host, this.props.sessionId)}
                style={styles.modalNegButton}>
                <Text style={styles.modalNegText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.finishEvent(this.props.host, this.props.sessionId, this.props.inviteList, this.props.restaurant, this.props.paytype)}
                style={styles.modalPosButton}>
                <Text style={styles.buttonText}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    } else if (this.props.status == SessionStatuses.done && this.state.shouldDisplay) {
      return (
        <View style={styles.eventWrapper}>
          <View style={styles.event}>
            <Text style={styles.eventHeader}>Event #: {this.props.index+1 || "1"}</Text>
            <Text style={styles.tabbedText}>Restaurant: {this.props.restaurant || "Some Restaurant"}</Text>
            <Text style={styles.tabbedText}>Status: {this.props.status || "Some Status"}</Text>
            <Text style={styles.tabbedText}>Payment Type: {this.props.paytype || "Payment"}</Text>
            <Text style={styles.tabbedText}>Guest List:</Text>
            <GuestList inviteList={this.props.inviteList} />
          </View>
        </View>
      );
    } else if(this.props.status == SessionStatuses.started && this.state.shouldDisplay) {
      return (
        <View style={styles.eventWrapper}>
          <View style={styles.event}>
            <Text style={styles.eventHeader}>Event #: {this.props.index+1 || "1"}</Text>
            <Text style={styles.tabbedText}>Restaurant: {this.props.restaurant || "Some Restaurant"}</Text>
            <Text style={styles.tabbedText}>Status: {this.props.status || "Some Status"}</Text>
            <Text style={styles.tabbedText}>Payment Type: {this.props.paytype || "Payment"}</Text>
            <Text style={styles.tabbedText}>Guest List:</Text>
            <GuestList inviteList={this.props.inviteList}/>
  
            <View style={styles.eventButtons}>
              <TouchableOpacity
                onPress={() => this.cancelEvent(this.props.host, this.props.sessionId)}
                style={styles.modalNegButton}>
                <Text style={styles.modalNegText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.sendInvites(this.props.host, this.props.sessionId)}
                style={styles.modalPosButton}>
                <Text style={styles.buttonText}>Send Invites</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    } else {
      return (
        <View></View>
      );
    }
  }
}

class GuestList extends React.Component {
  render() {
    return (
      <FlatList
        data={this.props.inviteList}
        keyExtractor={(item, index) => item.id.toString()}
        renderItem={({ item, index }) =>
          <Text style={styles.guestList}>{item.guest}</Text>
        }
      />
    );
  }
}

class FriendsList extends React.Component {
  componentDidMount() {
    const { account } = this.props;
    !!account && !!account.user && this.props.frndActions.getFriends(account.user.uid);
  }

  render() {
    return (
      <FlatList
        data={this.props.friends.arr}
        keyExtractor={(item, index) => item.id.toString()}
        renderItem={({ item, index }) =>
          index % 2 == 0 ?
            <TouchableOpacity
              style={[styles.friend, { backgroundColor: this.props.guestIsSelected(item.id) ? Colors.secondaryLightColor : Colors.primaryLightColor }]}
              id={item.id}
              index={index}
              name={item.name}
              onPress={() => this.props.addGuest(item.id)}
              {...item}
            ><Text>{item.name}</Text></TouchableOpacity>
            :
            <TouchableOpacity
              style={[styles.friend, { backgroundColor: this.props.guestIsSelected(item.id) ? Colors.secondaryLightColor : Colors.primaryColor }]}
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
  
  customButton: {
    alignItems: 'center',
    backgroundColor: Colors.button,
    borderRadius: 5,
    bottom: 0,
    marginHorizontal: 10,
    marginVertical: 10,
    padding: 10,
  },

  modalNegButton: {
    alignItems: 'center',
    borderRadius: 5,
    color: Colors.button,
    marginHorizontal: 10,
    marginVertical: 10,
    padding: 10,
  },

  modalNegText: {
    color: Colors.button,
    fontSize: 15,
  },

  modalPosButton: {
    alignItems: 'center',
    backgroundColor: Colors.button,
    borderRadius: 5,
    marginHorizontal: 10,
    marginVertical: 10,
    padding: 10,
  },

  buttonText: {
    color: "#ffffff",
    fontSize: 15,
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

  modalInner: {
    backgroundColor: Colors.background,
    borderRadius: 20,
    height: Layout.window.height - 200,
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

  refreshButton: {
    color: Colors.secondaryColor,
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

  eventButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  eventPosButton : {
    alignItems: 'center',
    backgroundColor: Colors.button,
    borderRadius: 5,
    marginHorizontal: 10,
    marginVertical: 10,
    padding: 10,
  },

  eventNegButton: {
    alignItems: 'center',
    borderRadius: 5,
    color: Colors.button,
    marginHorizontal: 10,
    marginVertical: 10,
    padding: 10,
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
