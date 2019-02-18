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
        <Body />
      </View>
    );
  }
}



const check_data = [
  {
    key: '0000000001',
    restaurant: 'Applebee\'s',
    description: "1x BLT",

    amount: '22.00',
    tax: '2.00',
    total: '24.00',
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
    return (
        <FlatList
            data={check_data}
            renderItem={({item}) => <Check id={item.key} restaurant={item.restaurant} description={item.description} amount={item.amount} tax={item.tax} total={item.total} {...item}/>}
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
                <Text style={styles.tabbedText}>Restaurant: {this.props.restaurant || "Some Restaurant"}</Text>
                <Text style={styles.tabbedText}>Description: {this.props.description || "Some food that was ordered." }</Text>
                <Text style={styles.tabbedText}>Amount Due: ${this.props.amount || "0.00"}</Text>
                <Text style={styles.tabbedText}>Tax: ${this.props.tax || "0.00"}</Text>
                <Text style={styles.tabbedText}>Total Due:</Text>
                <Text style={styles.total}>${this.props.total || "0.00"}</Text>
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

  total: {
    fontSize: 20,
    paddingLeft: 30,
  },
});
