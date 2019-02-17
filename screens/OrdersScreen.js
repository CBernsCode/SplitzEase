import * as React from 'react';
import { Button, Card, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Constants } from 'expo';
import Colors from '../constants/Colors';

/*
  Orders Screen
    [ ] Should be used for pending invites
*/

export default class OrderScreen extends React.Component {
    static navigationOptions = {
      title: 'Orders',
      headerStyle: {
        backgroundColor: Colors.altSecondary,
      },
      headerTintColor: Colors.primaryHeader,
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    };
  render() {
    return (
      <View style={styles.container}>
        <Body {...this.props}/>
        <View style={styles.fab}><Button style={styles.fabButton} color={Colors.fabButton} title='+' onPress={() => console.log("this should open a modal menu to create a new order")}/></View>
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
    
  },
  {
    key: '0000000002',
  },
  {
    key: '0000000003',
  },
];

class Body extends React.Component {
  render() {
    console.log(this.props);
    return (
        <FlatList
          data={order_data}
          renderItem={({item}) => <Order id={item.key} restaurant={item.restaurant} description={item.description} amount={item.amount} tax={item.tax} total={item.total} {...item}/>}
          style={styles.body}
        />
    );
  }
}

class Order extends React.Component {
  render() {
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
    backgroundColor: Colors.mainSecondary,
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

  order: {
    backgroundColor: Colors.altSecondary,
    borderRadius: 20,
    margin: 10,
    paddingBottom: 50,
    overflow: 'hidden',
  },

  orderHeader: {
    backgroundColor: Colors.primary,
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
