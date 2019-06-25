import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import HistoricScreen from '../screens/HistoricScreen';
import SearchScreen from '../screens/SearchScreen';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const HistoricStack = createStackNavigator({
  Links: HistoricScreen,
});

HistoricStack.navigationOptions = {
  tabBarLabel: 'Historic',
  tabBarIcon: ({ focused }) => (
    <MaterialCommunityIcons
      name={'history'}
      size={26}
      style={{ marginBottom: -3 }}
      color={focused ? '#2f95dc' : '#ccc'}
    />
  ),
};

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <MaterialCommunityIcons
      name={'barcode-scan'}
      size={26}
      style={{ marginBottom: -3 }}
      color={focused ? '#2f95dc' : '#ccc'}
    />
  ),
};

const SearchStack = createStackNavigator({
  Settings: SearchScreen,
});

SearchStack.navigationOptions = {
  tabBarLabel: 'Search',
  tabBarIcon: ({ focused }) => (
    <Ionicons
      name={Platform.OS === 'ios' ? 'ios-search' : 'md-search'}
      size={26}
      style={{ marginBottom: -3 }}
      color={focused ? '#2f95dc' : '#ccc'}
    />
  ),
};

export default createBottomTabNavigator({
  HistoricStack,
  HomeStack,
  SearchStack,
},
{
  tabBarOptions: {
      showLabel: false,
      style: {
          backgroundColor: '#181F31'
      }
  }
});
