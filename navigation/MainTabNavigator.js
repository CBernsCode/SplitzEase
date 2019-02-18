import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import AccountScreen from '../screens/AccountScreen';
import OrdersScreen from '../screens/OrdersScreen';
import SettingsScreen from '../screens/SettingsScreen';
import LoginScreen from '../screens/LoginScreen';

import Checks from '../containers/Checks';
import Account from '../containers/Account';
import Orders from '../containers/Orders';
import Colors from '../constants/Colors';

const LoginStack = createStackNavigator({
  Login: LoginScreen,
});

LoginStack.navigationOptions = {
  tabBarLabel: 'Login',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
  tabBarOptions: {
    activeTintColor: Colors.tabBarSelectedBorder,
  },
};

const AccountStack = createStackNavigator({
  Account: Account,
});

AccountStack.navigationOptions = {
  tabBarLabel: 'Account',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
  tabBarOptions: {
    activeTintColor: Colors.tabBarSelectedBorder,
  },
};

const OrderStack = createStackNavigator({
  Orders: Orders,
});

OrderStack.navigationOptions = {
  tabBarLabel: 'Orders',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
  tabBarOptions: {
    activeTintColor: Colors.tabBarSelectedBorder,
  },
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
  tabBarOptions: {
    activeTintColor: Colors.tabBarSelectedBorder,
  },
};

const CheckStack = createStackNavigator({
  Checks: Checks,
});

CheckStack.navigationOptions = {
  tabBarLabel: 'Checks',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
  tabBarOptions: {
    activeTintColor: Colors.tabBarSelectedBorder,
  },
};

export default createBottomTabNavigator(
  {
    LoginStack,
    AccountStack,
    OrderStack,
    CheckStack,
    SettingsStack
  },
);
