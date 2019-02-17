import * as React from 'react';
import { Button, Image, KeyboardAvoidingView, ScrollView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { Constants } from 'expo';
import Colors from '../constants/Colors';

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Login',
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
        <View>
          <Image style={styles.logo} source={require('../assets/images/logo.png')}/>
          <Form/>
        </View>
      </View>
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
    this.setState((state) => { return {login: !state.login,}; });
  }

  render() {
    if(this.state.login) {
      return (
        <View>
          <View style={styles.switchBar}><Text styles={styles.switchBarText}>Login</Text><Switch onValueChange={this.changeForm} value={this.state.login} style={styles.switchBarText} /></View>
          <LoginForm/>
        </View>
      );
    } else {
      return (
        <View>
          <View style={styles.switchBar}><Switch onValueChange={this.changeForm} value={this.state.login} /><Text styles={styles.switchBarText}>Register</Text></View>
          <RegisterForm/>
        </View>
      );
    }
  }
}

class LoginForm extends React.Component {
  render() {
    return (
      <KeyboardAvoidingView contentContainerStyle={styles.form} behavior='position' enabled='true'>
        <TextInput
          style={styles.formField}

          autoComplete='username'
          autoCorrect={false}
          enablesReturnKeyAutomatically={true}
          label='Username'
          mode='outlined'
          placeholder='Username'
          returnKeyType='next'
          textContentType='username'
        />
        <TextInput
          style={styles.formField}

          autoComplete='password'
          enablesReturnKeyAutomatically={true}
          label='Password'
          placeholder='Password'
          returnKeyType='send'
          secureTextEntry={true}
          textContentType='password'
        />
        <Button mode='outlined' style={styles.button} title='Login' onPress={() => {this.props.navigation.navigate('Orders')}}></Button>
      </KeyboardAvoidingView>
    );
  }
}

class RegisterForm extends React.Component {
  render () {
    return (
      <KeyboardAvoidingView contentContainerStyle={styles.form} behavior='padding' enabled='true'>
        <TextInput
          style={styles.formField}

          autoComplete='username'
          autoCorrect={false}
          enablesReturnKeyAutomatically={true}
          label='Username'
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
          placeholder='Phone Number'
          returnKeyType='next'
          textContentType='telephoneNumber'
        />
        <TextInput
          style={styles.formField}

          autoComplete='password'
          enablesReturnKeyAutomatically={true}
          label='Password'
          placeholder='Password'
          returnKeyType='next'
          secureTextEntry={true}
          textContentType='password'
        />
        <TextInput
          style={styles.formField}

          autoComplete='password'
          enablesReturnKeyAutomatically={true}
          label='Confirm Password'
          placeholder='Confirm Password'
          returnKeyType='send'
          secureTextEntry={true}
          textContentType='password'
        />
        <Button mode='outlined' style={styles.button} title='Register' onPress={() => {this.props.navigation.navigate('Orders')}}></Button>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.button,
  },

  container: {
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: Colors.background,
    padding: 8,
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
    fontSize: 30,
    height: 40,
    margin: 20,
    paddingLeft: 20,
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
