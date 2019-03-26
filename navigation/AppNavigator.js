import React from 'react';
import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import LoginScreen from '../screens/LoginScreen';
import OrderScreen from '../screens/OrdersScreen';

const AuthStack = createStackNavigator({Login: LoginScreen});
const MainStack = createStackNavigator({Invites: OrderScreen});

export default createAppContainer(createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Auth: AuthStack,
  Main: MainTabNavigator,
  App: MainStack,
},
{
  initialRouteName: 'Auth',
}

));