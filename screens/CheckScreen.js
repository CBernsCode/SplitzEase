import * as React from 'react';
import { Button, Card, FlatList, Modal, ScrollView, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native';
import { Constants } from 'expo';
import Colors from '../constants/Colors';
import { checks } from '../firebase';

/*
  Check Screen
    [ ] Should be used for order history
    [ ] Should be used to display unpaid orders
*/

const sampleFriend = {
  added: Date.now(),
  name: "Dave",
  id: Math.random()
}

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

  state = {
    modalVisible: false,
  };

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible, });
  }

  render() {
    return (
      <View style={styles.container}>
        <Body />  
          {/*onPress={() => this.props.frndActions.addFriend('21312', sampleFriend)}*/}
          <Button
            color={Colors.button}
            title="Add Friend"
            onPress={() => this.setModalVisible(!this.state.modalVisible)}
          />
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => this.setState({ modalVisible: false })}
          >
          <View style={styles.modalOuter}>
            <View style={styles.modalInner}>
              <TextInput
                style={styles.modalMultilineInput}

                autoCorrect={false}
                enablesReturnKeyAutomatically={true}
                label='Friends'
                placeholder='friend@splitzease.com'
                returnKeyType='send'
              />
              <View style={styles.modalButton}>
                {/* Add Friend Button should actually add a friend in the future */}
                <Button color={Colors.fabButton} title='Add Friend' onPress={() => this.setModalVisible(!this.state.modalVisible)} />
                <Button color={Colors.fabButton} title='Cancel' onPress={() => this.setModalVisible(!this.state.modalVisible)} />
              </View>
            </View>
          </View>
        </Modal>
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
            renderItem={({item}) => <Check id={item.key} {...item}/>}
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

  modalButton: {
    bottom: 20,
    justifyContent: 'center',
    position: 'absolute',
    width: 300,
  },

  modalInner: {
    backgroundColor: Colors.background,
    borderRadius: 20,
    height: 300,
    padding: 20,
    width: 300,
  },

  modalInput: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 5,
    color: Colors.text,
    fontSize: 20,
    height: 40,
    marginBottom: 10,
    paddingLeft: 20,
  },

  modalMultilineInput: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 5,
    color: Colors.text,
    fontSize: 20,
    height: 40,
    marginBottom: 10,
    paddingLeft: 20,
  },

  modalOuter: {
    alignItems: 'center',
    backgroundColor: Colors.transparentBackDrop,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 20,
  },

  modalTitle: {
    fontSize: 25,
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
