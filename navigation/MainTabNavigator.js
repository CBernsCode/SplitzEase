import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
// import AccountScreen from '../screens/AccountScreen';
// import OrdersScreen from '../screens/OrdersScreen';
// import SettingsScreen from '../screens/SettingsScreen';
// import LoginScreen from '../screens/LoginScreen';

import Checks from '../containers/Checks';
import Account from '../containers/Account';
import Orders from '../containers/Orders';
import Colors from '../constants/Colors';
import Sessions from '../containers/Sessions'
import FirebaseTesting from '../containers/FirebaseTesting'

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
          ? 'ios-happy'
          : 'md-happy'
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
  tabBarLabel: 'Invites',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? 'ios-mail'
          : 'md-mail'
      }
    />
  ),
  tabBarOptions: {
    activeTintColor: Colors.tabBarSelectedBorder,
  },
};

// const SettingsStack = createStackNavigator({
//   Settings: SettingsScreen,
// });

// SettingsStack.navigationOptions = {
//   tabBarLabel: 'Settings',
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name={
//         Platform.OS === 'ios'
//           ? 'ios-settings'
//           : 'md-settings'
//       }
//     />
//   ),
//   tabBarOptions: {
//     activeTintColor: Colors.tabBarSelectedBorder,
//   },
// };

const CheckStack = createStackNavigator({
  Checks: Checks,
});

CheckStack.navigationOptions = {
  tabBarLabel: 'Checks',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? 'ios-cash'
          : 'md-cash'
      }
    />
  ),
  tabBarOptions: {
    activeTintColor: Colors.tabBarSelectedBorder,
  },
};

const FirebaseStack = createStackNavigator({
  FirebaseTesting: FirebaseTesting,
});

FirebaseStack.navigationOptions = {
  tabBarLabel: 'Firebase Test',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? 'ios-flame'
          : 'md-flame'
      }
    />
  ),
  tabBarOptions: {
    activeTintColor: Colors.tabBarSelectedBorder,
  },
};

const SessionStack = createStackNavigator({
  Sessions: Sessions,
});

SessionStack.navigationOptions = {
  tabBarLabel: 'Events',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? 'ios-restaurant'
          : 'md-restaurant'
      }
    />
  ),
  tabBarOptions: {
    activeTintColor: Colors.tabBarSelectedBorder,
  },
};

export default createBottomTabNavigator(
  {
    AccountStack,
    OrderStack,
    SessionStack,
    CheckStack,
    // SettingsStack,
    FirebaseStack
  },
);
