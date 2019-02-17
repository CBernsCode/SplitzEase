import * as React from 'react';
import { Button, Card, FlatList, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { Constants } from 'expo';
import Colors from '../constants/Colors';

/*
  Check Screen
    [ ] Should be used for order history
    [ ] Should be used to display unpaid orders
*/

export default class CheckScreen extends React.Component {
  static navigationOptions = {
    title: 'Checks',
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
        <Body />
      </View>
    );
  }
}

const check_data = [
    {
      key: '0000000001',
      amountDue: '24.00',
      description: "1x BLT",
    },
    {
      key: '0000000002',
    },
    {
      key: '0000000003',
    },
    {
      key: '0000000004',
    },
    {
      key: '0000000005',
    },
    {
      key: '0000000006',
    },
    {
      key: '0000000007',
    },
];

class Body extends React.PureComponent {
  render() {
    return (
        <FlatList
            data={check_data}
            renderItem={({item}) => <Check id={item.key} amountDue={item.amountDue} description={item.description} {...item}/>}
            style={styles.body}
        />
    );
  }
}

class Check extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isPaid : false,
    };

    // this.pay = this.pay.bind(this);
    // only necessary to define "this" when using
    //    pay(){...} (Function.prototype.bind)
    //    instead of 
    //    pay = () => {...} (arrow functions)
  }

  pay = () => {
    this.setState({
      isPaid : true,
    });

    // accept payment amount
    // accept payment type
  }

  render() {
    if(!this.state.isPaid) {
      return (
        <View style={styles.checkWrapper}>
            <View style={styles.check}>
                <Text style={styles.checkHeader}>Check #{this.props.id || "0000000000"}</Text>
                <Text style={styles.tabbedText}>Amount Due:</Text>
                <Text style={{ marginLeft: 20 }}>${this.props.amountDue || "0.00"}</Text>
                <Text style={styles.tabbedText}>Description:</Text>
                <Text style={{ marginLeft: 20 }}>{this.props.description || "Some food that was ordered." }</Text>
                <View style={styles.button}><Button color={Colors.button} onPress={this.pay} title="Pay"></Button></View>
            </View>
        </View>
      );
    } else {
      return false;
    }
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 10,
  },

  button: {
    bottom: 20,
    height: 30,
    position: 'absolute',
    right: 20,
    width: 60,
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.background,
  },

  horizontalRule: {
    borderStyle: 'solid',
    borderBottomWidth: 1,
    marginBottom: 5,
    marginTop: 5,
  },

  check: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 20,
    margin: 10,
    paddingBottom: 50,
    overflow: 'hidden',
  },

  checkHeader: {
    backgroundColor: Colors.cardHeader,
    borderRadius: 20,
    color: Colors.cardHeaderText,
    padding: 10,
  },

  checkWrapper: {
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: -3, height: 3 },
    shadowOpacity: 0.5,
  },

  statusBar: {
    backgroundColor: Colors.statusBar,
  },

  tabbedText: {
      paddingLeft: 10,
      paddingTop: 10,
  },

  // titleBarText: {
  //   fontFamily: 'PingFangSC-Thin',
  //   fontSize: 50,
  //   justifyContent: 'center',
  //   margin: 3,
  //   padding: 5,
  // },
});
