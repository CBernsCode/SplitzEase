import React from 'react';
import { Button, Image, KeyboardAvoidingView, ScrollView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { Constants } from 'expo';
import Colors from '../constants/Colors';
import * as firebase from 'firebase';

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Login',
    header: null,
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container}>
        {/*<Image source={require('../assets/images/logo.png')} style={styles.logo}/>*/}
        <Form {...this.props} />
      </KeyboardAvoidingView>
    );
  }
}

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      login: true,
    };
  }

  changeForm = () => {
    this.setState((state) => { return { login: !state.login, }; });
  }

  render() {
    if (this.state.login) {
      return (
        <View>
          <View style={styles.switchBar}>
            <Text style={styles.switchBarText}>Login</Text>
            <Switch onValueChange={this.changeForm} value={this.state.login} style={styles.switchBarText}></Switch>
          </View>
          <LoginForm {...this.props}  />
        </View>
      );
    } else {
      return (
        <View>
          <View style={styles.switchBar}>
            <Text styles={styles.switchBarText}>Register</Text>
            <Switch onValueChange={this.changeForm} value={this.state.login} style={styles.switchBarText} />
          </View>
          <RegisterForm  {...this.props} />
        </View>
      );
    }
  }
}

class LoginForm extends React.Component {
  constructor(props) {
    super(props)
  }
  state = {
    email: "",
    password: "",
  }

  login = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.props.acctActions.login(user)
        this.props.navigation.navigate('Main')
      })
      .catch(err => {console.log("Error at LoginForm.login(): Failed to sign user into Firebase.")})
  }

  render() {
    return (
      <View enabled style={styles.form} keyboardVerticalOffset={100}>
        <TextInput
          style={styles.formField}
          autoComplete='email'
          autoCorrect={false}
          enablesReturnKeyAutomatically={true}
          label='Email'
          onChangeText={(text) => { this.setState({ email: text }) }}
          placeholder='Email Address'
          returnKeyType='next'
          textContentType='emailAddress'
        />
        <TextInput
          style={styles.formField}
          autoComplete='password'
          enablesReturnKeyAutomatically={true}
          label='Password'
          onChangeText={(text) => { this.setState({ password: text }) }}
          placeholder='Password'
          returnKeyType='send'
          secureTextEntry={true}
          textContentType='password'
        />
        <View style={styles.buttons}>
          <Button color={Colors.button} mode='outlined' title='Login' onPress={() => this.login(this.state.email, this.state.password)}></Button>
        </View>
      </View>
    );
  }
}

class RegisterForm extends React.Component {
  register = (username, password, email, phone) => {
    // console.log(email + " " + password);
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.props.acctActions.login(user)
        this.props.navigation.navigate('Main')
      })
      .catch((err) => {console.log("Error at RegisterForm.register(): Failed to create user.")})
  }

  render() {
    return (
      <View behavior="padding" enabled style={styles.form} keyboardVerticalOffset={100}>
        <TextInput
          style={styles.formField}
          autoComplete='username'
          autoCorrect={false}
          enablesReturnKeyAutomatically={true}
          label='Username'
          onChangeText={(text) => { this.setState({ username: text }) }}
          placeholder='Username'
          returnKeyType='next'
          textContentType='username'
        />
        <TextInput
          style={styles.formField}
          autoComplete='email'
          autoCorrect={false}
          enablesReturnKeyAutomatically={true}
          label='Email Address'
          onChangeText={(text) => { this.setState({ email: text }) }}
          placeholder='Email Address'
          returnKeyType='next'
          textContentType='emailAddress'
        />
        <TextInput
          style={styles.formField}
          autoComplete='phone'
          autoCorrect={false}
          enablesReturnKeyAutomatically={true}
          label='Phone Number'
          onChangeText={(text) => { this.setState({ phone: text }) }}
          placeholder='Phone Number'
          returnKeyType='next'
          textContentType='telephoneNumber'
        />
        <TextInput
          style={styles.formField}
          autoComplete='password'
          enablesReturnKeyAutomatically={true}
          label='Password'
          onChangeText={(text) => { this.setState({ password: text }) }}
          placeholder='Password'
          returnKeyType='next'
          secureTextEntry={true}
          textContentType='password'
        />
        <View style={styles.buttons}>
          <Button color={Colors.button} mode='outlined' title='Register' onPress={() => this.register(this.state.username, this.state.password, this.state.email, this.state.phone)}></Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttons: {
    //bottom: 0,
    // margin: 10,
  },

  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: Colors.background,
    padding: 10,
  },

  form: {
    justifyContent: 'center',
  },

  formField: {
    backgroundColor: Colors.primaryLightColor,
    borderColor: Colors.secondaryColor,
    borderRadius: 5,
    borderStyle: 'solid',
    borderWidth: 1,
    color: Colors.text,
    fontSize: 20,
    height: 40,
    margin: 10,
    paddingLeft: 10,
  },

  logo: {
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingBottom: 30,
    paddingTop: 30,

    height: 300,
    width: 300,
  },

  switchBar: {
    flexDirection: 'row',
    justifyContent: 'center',
  },

  switchBarText: {
    flex: 1,
    padding: 5,
  }
});
