import React from 'react';
import { Button, FlatList, Image, Modal, StyleSheet, Text, TextInput, View } from 'react-native';
import Colors from '../constants/Colors';

import { Constants } from 'expo';

export default class AccountScreen extends React.Component {
  static navigationOptions = {
    title: 'Account',
    header: null,
    headerStyle: {
      backgroundColor: Colors.primaryHeader,
    },
  };

  state = {
    modalVisible: false,
  };

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible, });
  }

  addFriend = (uid, friend) => {
    this.setModalVisible(!this.state.modalVisible)
    this.props.frndActions.addFriend(uid, friend)
  }

  render() {
    // console.log(this.props.account.user)

    return (
      <View style={styles.screen}>
        <View style={styles.container}>
          <View style={styles.userInfo}>
            <View style={styles.horizontalView}>
              <Image style={styles.userImage} source={require('../assets/images/logo.png')}/>
              <Text style={styles.userName}>{this.props.account.user.email}</Text>
            </View>
            <TextInput style={styles.input} editable={false} placeholder='Email Address Here'></TextInput>
            <Text>{/* used to create a space between buttons... margin isn't working */}</Text>
            <TextInput style={styles.input} editable={false} placeholder='Phone Number Here'></TextInput>
          </View>

          {/*
            <View style={styles.buttons}>
              <Button color={Colors.button} title='Edit' onPress={() => console.log('Edit button pressed on Account Screen')}/>
              <Text></Text>
              <Button color={Colors.button} title='Save' onPress={() => console.log('Save button pressed on Account Screen')}/>
            </View>
          */}
        </View>
        <View style={styles.friendsList}>
          <Text style={styles.friendsListHeader}>Friends List</Text>
          <FriendsList {...this.props}/>
        </View>
        <Button color={Colors.button} title="Add Friend" onPress={() => this.setModalVisible(!this.state.modalVisible)} />
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => this.setState({ modalVisible: false })}
        >
          <View style={styles.modalOuter}>
            <View style={styles.modalInner}>
              <TextInput
                style={styles.modalMultilineInput}

                autoCorrect={false}
                enablesReturnKeyAutomatically={true}
                label='Friends'
                onChange={(friend_email) => this.setState({friend: friend_email,})}
                placeholder='friend@splitzease.com'
                returnKeyType='send'
              />
              <View style={styles.modalButton}>
                <Button color={Colors.fabButton} title='Add Friend' onPress={() => this.setModalVisible(!this.state.modalVisible)} />
                <Button color={Colors.fabButton} title='Cancel' onPress={() => this.setModalVisible(!this.state.modalVisible)} />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

class FriendsList extends React.Component {
  componentDidMount () {
    const { account } = this.props;

    !!account && !!account.user && this.props.frndActions.getFriends(account.user.uid);
  }

  render () {
    // console.log(this.props.frndActions.getFriends(this.props.account.user.uid));

    return (
      <FlatList
        data={this.props.friends.arr}
        keyExtractor={(item, index) => item.id.toString()}
        renderItem={({item, index}) => <Friend id={item.id} index={index} name={item.name} {...item}/>}
      />
    );
  }
}

class Friend extends React.Component {
  render () {
    if(this.props.index % 2 == 0) {
      return(
        <View style={styles.evenFriend}>
          <Text>{this.props.name}</Text>
        </View>
      );
    } else {
      return(
        <View style={styles.oddFriend}>
          <Text>{this.props.name}</Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  buttons: {
    bottom: 0,
    margin: 10,
  },

  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },

  evenFriend: {
    backgroundColor: Colors.primaryLightColor,
    flex: 1,
    fontSize: 20,
    padding: 10,
    paddingBottom: 15,
    paddingTop: 15,
  },

  oddFriend: {
    backgroundColor: Colors.primaryColor,
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
    flex: 1,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    overflow: 'hidden',
  },

  friendsListHeader: {
    backgroundColor: Colors.secondaryDarkColor,
    color: Colors.primaryLightColor,
    fontSize: 30,
    padding: 10,
  },

  horizontalView: {
    flexDirection: 'row'
  },

  input: {
    backgroundColor: Colors.primaryLightColor,
    borderColor: Colors.secondaryColor,
    borderRadius: 5,
    borderStyle: 'solid',
    borderWidth: 1,
    color: Colors.text,
    fontSize: 20,
    height: 40,
    paddingLeft: 10,
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

  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  userImage: {
    flex: 1,
    height: 100,
    marginBottom: 10,
    width: 100,
  },

  userInfo: {
    flex: 1,
    alignItems: 'stretch',
    flexDirection: 'column',
    margin: 10,
  },

  userName: {
    flex: 2,
    fontSize: 20,
    marginTop: 30,
  }
});
