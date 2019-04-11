import React from 'react';
import { Button, FlatList, Modal, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { Constants } from 'expo';
import { invites } from '../firebase.js'
import Colors from '../constants/Colors';
// import console = require('console');

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
    restaurant: '',
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

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible});
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
              <View style={styles.switchWrapper}>
                <Text>Pay for guests?</Text>
                <Switch onValueChange={() => this.setState({payForGuests: !this.state.payForGuests})} value={this.state.payForGuests}/>
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
                <Button color={Colors.fabButton} title='Send Invites' onPress={() => this.setModalVisible(!this.state.modalVisible)} />
                <Button color={Colors.fabButton} title='Cancel' onPress={() => this.setModalVisible(!this.state.modalVisible)} />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

class Event extends React.Component {
  render() {
    return(
      <View><Text>Some Event</Text></View>
    );
  }
}

const event_data = [
  {
    key: '0000000001',
    host: 'user_id',
    restaurant: 'Applebee\'s',
    accepted: 'true',

  },
  {
    key: '0000000002',
  },
  {
    key: '0000000003',
  },
];

class Body extends React.PureComponent {
  componentDidMount () {
    const { account } = this.props;
    !!account && !!account.user && this.props.chkActions.getChecks(account.user.uid);
  }

  render() {
    return (
      <FlatList
        data={event_data}
        renderItem={({ item }) => {
          let obj = { ...this.props, ...item }
          return <Event id={item.key} {...obj} />
        }}
        style={styles.body}
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
