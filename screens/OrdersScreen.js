import * as React from 'react';
import { Button, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';

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
    restaurant: 'Applebees',
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
  render() {
    console.log(this.props);
    return (
        <FlatList
          data={order_data}
          renderItem={({item}) => <Order id={item.key} restaurant={item.restaurant} />}
          style={styles.body}
        />
    );
  }
}

class Order extends React.Component {
  render() {
    return (
      <View style={styles.order}>
        <Text style={styles.orderHeader}>Order Number: {this.props.id || '0000000000'}</Text>
        <Text style={styles.tabbedText}>{this.props.host || 'Host'} has invited you to order food from {this.props.restaurant || 'some restaurant'}!</Text>
        <View style={styles.horizontalView}>
          <Button color={Colors.cardAffirmButton} title='Accept' onPress={() => console.log('User accepted invite!')}></Button>
          <Button color ={Colors.cardNegaButton} title='Decline' onPress={() => console.log('User declined invite!')}></Button>
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

  order: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 20,
    margin: 10,
    paddingBottom: 10,
    overflow: 'hidden',
  },

  orderHeader: {
    backgroundColor: Colors.cardHeader,
    borderRadius: 20,
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
