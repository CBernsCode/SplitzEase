import * as React from 'react';
import { Button, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Constants } from 'expo';

export default class CheckScreen extends React.Component {
    static navigationOptions = {
      title: 'Checks',
    };
  render() {
    return (
      <View style={styles.container}>
        <Body {...this.props}/>
      </View>
    );
  }
}

class Body extends React.Component {
  render() {
    console.log(this.props);
    return (
        <View></View>
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
    backgroundColor: '#fcf8b3',
  },

  horizontalRule: {
    borderStyle: 'solid',
    borderBottomWidth: 1,
    marginBottom: 5,
    marginTop: 5,
  },

  order: {
    backgroundColor: '#f1f8fd',
    borderRadius: 20,
    margin: 10,
    paddingBottom: 50,
    overflow: 'hidden',
  },

  orderHeader: {
    backgroundColor: '#ab6088',
    borderRadius: 20,
    color: '#f1f8fd',
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
