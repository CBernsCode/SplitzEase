import React from 'react';
import { Button, Dimensions, Image, Platform, ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { Constants, WebBrowser } from 'expo';
import { MonoText } from '../components/StyledText';

import { invites } from '../firebase.js'
import Colors from '../constants/Colors';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings',
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
      <View style={styles.screen}>
        <View style={styles.container}>
          <View style={styles.settings}>
            <View style={styles.horizontalView}>
              <Text style={styles.label}>Notifications?</Text>
              <Switch></Switch>
            </View>
            <View style={styles.horizontalView}>
              <Text style={styles.label}>Dark Mode?</Text>
              <Switch></Switch>
            </View>
          </View>
          <View style={styles.buttons}>
            <Button color={Colors.button} title='Reset' onPress={() => console.log('Reset button pressed on Settings Screen')}/>
            <Text>{/* used to create a space between buttons... margin isn't working */}</Text>
            <Button color={Colors.button} title='Save' onPress={() => console.log('Save button pressed on Settings Screen')}/>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttons: {
    bottom: 0,
  },

  container: {
    flex: 1,
    margin: 20,
    paddingTop: Constants.statusBarHeight,
  },

  horizontalView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },

  label: {
    fontSize: 20,
    marginRight: 50,
  },

  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  settings: {
    flex: 1,
  }
});
