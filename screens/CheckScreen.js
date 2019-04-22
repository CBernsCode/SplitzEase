import React from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Constants } from 'expo';
import Colors from '../constants/Colors'
import Layout from '../constants/Layout'

export default class CheckScreen extends React.Component {
  constructor(props) {
    // console.log(props)
    super(props);
  }
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
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <Body {...this.props} />
      </View>
    );
  }
}

class Body extends React.PureComponent {
  componentDidMount () {
    const { account } = this.props;
    const { balance } = this.props.account;
    !!account && !!account.user && this.props.chkActions.getChecks(account.user.uid);
  }

  render() {
    if(!!this.props.checks.arr[0]) {
      return (
        <View style={styles.body}>
          <FlatList
              data={this.props.checks.arr}
              keyExtractor={(item, _) => item.id.toString()}
              renderItem={({item, index}) =>
                <Check
                  id={item.id}
                  index={index}
                  uid={this.props.account.user.uid}
                  {...this.props}
                  {...item}/>
              }
              style={styles.body}
          />
          <Text style={styles.balance}>Balance: ${parseFloat(this.props.account.balance).toFixed(2)}</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.body}>
          <Text style={styles.noChecks}>You currently have no checks.</Text>
          <Text style={styles.balance}>Balance: ${parseFloat(this.props.account.balance).toFixed(2)}</Text>
        </View>
      );
    }
  }
}

class Check extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isPaid : false,
    };
  }

  pay = (cost) => {
    const { chkActions, acctActions, id } = this.props
    const { balance } = this.props.account
    const { uid } = this.props.account.user

    if(balance > Number(cost)){
      // console.log("Can pay")
      acctActions.setBalance(balance - Number(cost))
      chkActions.payCheck(uid, id)
      this.setState({ isPaid : true });
    } else {
      Alert.alert(
        'Check Not Paid',
        'Please make sure you have enough money in your balance.',
        [
          { text: 'OK', onPress: () => { } },
        ],
        { cancelable: true },
      );
    }
  }

  render() {
    if(!this.state.isPaid) {
      return (
        <View style={styles.checkWrapper}>
            <View style={styles.check}>
                <Text style={styles.checkHeader}>Check #: {this.props.index+1 || "1"}</Text>
                <Text style={styles.tabbedText}>Restaurant: {this.props.restaurant || "Some Restaurant"}</Text>
                <Text style={styles.tabbedText}>Description: {this.props.description || "Some food that was ordered." }</Text>
                <Text style={styles.tabbedText}>Amount Due:</Text>
                <Text style={styles.total}>${this.props.cost || "0.00"}</Text>
                
                <View style={styles.checkButtons}>
                  <TouchableOpacity
                    onPress={() => this.pay(this.props.cost)}
                    style={styles.checkPosButton}>
                    <Text style={styles.buttonText}>Pay</Text>
                  </TouchableOpacity>
                </View>
            </View>
        </View>
      );
    } else {
      return false;
    }
  }
}

const styles = StyleSheet.create({
  balance: {
    backgroundColor: Colors.background,
    bottom: 0,
    color: Colors.secondaryColor,
    fontSize: 20,
    margin: 10,
    // paddingVertical: 5,
    textAlign: 'center',
    width: Layout.window.width,
  },

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

  buttonText: {
    color: "#ffffff",
    fontSize: 15,
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.background,
    paddingTop: Constants.statusBarHeight,
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
    borderColor: Colors.cardHeader,
    borderWidth: 1,
    margin: 10,
    overflow: 'hidden',
  },

  checkHeader: {
    backgroundColor: Colors.cardHeader,
    color: Colors.cardHeaderText,
    padding: 10,
  },

  checkWrapper: {
    /* shadowColor: Colors.shadowColor,*/
    /* shadowOffset: { width: -3, height: 3 }, */
    /* shadowOpacity: 0.5, */
  },

  noChecks: {
    flex: 1,
    padding: 10,
    textAlign: 'center',
    top: 0,
    width: Layout.window.width,
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

  checkButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  checkPosButton : {
    alignItems: 'center',
    backgroundColor: Colors.button,
    borderRadius: 5,
    marginHorizontal: 10,
    marginVertical: 10,
    padding: 10,
  },

  checkNegButton: {
    alignItems: 'center',
    borderRadius: 5,
    color: Colors.button,
    marginHorizontal: 10,
    marginVertical: 10,
    padding: 10,
  },
});
