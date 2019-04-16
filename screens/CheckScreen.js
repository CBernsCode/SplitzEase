import React from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { Constants } from 'expo';
import Colors from '../constants/Colors'
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
    !!account && !!account.user && this.props.chkActions.getChecks(account.user.uid);
  }

  render() {
    if(this.props.checks.arr[0] != undefined) {
      return (
        <View style={styles.body}>
          <FlatList
              data={this.props.checks.arr}
              keyExtractor={(item, _) => item.id.toString()}
              renderItem={({item}) => <Check id={item.id} uid={this.props.account.user.uid} {...this.props} {...item}/>}
              style={styles.body}
          />
          <Text>{this.props.account.balance}</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.body}>
          <Text>{this.props.account.balance}</Text>
          <Text>Loading...</Text>
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

  pay = () => {
    const { cost, chkActions, acctActions, id } = this.props
    const { balance } = this.props.account
    const { uid } = this.props.account.user

    if(balance >  Number(cost)){
      console.log("Can pay")
      acctActions.setBalance(balance - Number(cost))
      chkActions.payCheck(uid, id)
      this.setState({ isPaid : true });
    }
  }

  render() {
    const { cost} = this.props
    if(!this.state.isPaid) {
      return (
        <View style={styles.checkWrapper}>
            <View style={styles.check}>
                <Text style={styles.checkHeader}>Check #: {this.props.id || "0000000000"}</Text>
                <Text style={styles.tabbedText}>Restaurant: {this.props.restaurant || "Some Restaurant"}</Text>
                <Text style={styles.tabbedText}>Description: {this.props.description || "Some food that was ordered." }</Text>
                <Text style={styles.tabbedText}>Amount Due:</Text>
                <Text style={styles.total}>${cost || "0.00"}</Text>
                <View style={styles.button}><Button color={Colors.button} onPress={() => this.pay(cost)} title="Pay"></Button></View>
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
    paddingBottom: 50,
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
    margin: 10,
    textAlign: 'center',
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
