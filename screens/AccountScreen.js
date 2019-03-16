import React from 'react';
import { Button, Dimensions, Image, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { Constants, WebBrowser } from 'expo';
import { MonoText } from '../components/StyledText';

import { invites } from '../firebase.js'
import Colors from '../constants/Colors';

export default class AccountScreen extends React.Component {
  static navigationOptions = {
    title: 'Account',
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
      <View style={styles.screen}>
        <View style={styles.container}>
          <View style={styles.userInfo}>
            <View style={styles.horizontalView}>
              <Image style={styles.userImage} source={require('../assets/images/logo.png')}/>
              <Text style={styles.userName}>Username Here</Text>
            </View>
            <TextInput style={styles.input} editable={false} placeholder='Email Address Here'></TextInput>
            <Text>{/* used to create a space between buttons... margin isn't working */}</Text>
            <TextInput style={styles.input} editable={false} placeholder='Phone Number Here'></TextInput>
          </View>

          <View style={styles.buttons}>
            <Button color={Colors.button} title='Edit' onPress={() => console.log('Edit button pressed on Account Screen')}/>
            <Text>{/* used to create a space between buttons... margin isn't working */}</Text>
            <Button color={Colors.button} title='Save' onPress={() => console.log('Save button pressed on Account Screen')}/>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttons: {
    bottom: 0,
    margin: 10,
  },

  container: {
    flex: 1,
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
    margin: 10,
    paddingLeft: 20,
  },

  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  userImage: {
    flex: 1,
    height: 100,
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
