import * as React from 'react';
import { Button, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Constants } from 'expo';

export default class OrdersScreen extends React.Component {
    static navigationOptions = {
      title: 'Orders',
    };

  render() {
    return (
      <View style={styles.container}>
        <Body />
      </View>
    );
  }
}

const order_data = [
    {
      key: '0000000001',
      amountDue: 24,
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

class Body extends React.Component {
  render() {
    return (
        <FlatList
            style = {styles.body}
            data = {order_data}
            renderItem = {
                (it => (
                    <Order {...it}/>
                ))
            }
        />
    );
  }


}

class Order extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <View style={styles.orderWrapper}>
            <View style={styles.order}>
                <Text style={styles.orderHeader}>Order #{this.props.id || ""}</Text>
                <Text style={styles.tabbedText}>Amount Due:</Text>
                <Text style={{ marginLeft: 20 }}>{this.props.amountDue || "$0.00"}</Text>
                <Text style={styles.tabbedText}>Description:</Text>
                <Text style={{ marginLeft: 20 }}>{this.props.description || "" }</Text>
                {/*<Button title="Pay" />*/}
            </View>
      </View>
    );
  }
}

Order.defaultProps = {
  amountDue: '$0.00',
  description: 'Some food that was ordered.',
  id: '',
};

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
