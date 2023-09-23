import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { HomeStackParamList } from '@/navigations/type';

import AddItemScreen from '@/screens/AddItemScreen';
import LoginScreen from '@/screens/LoginScreen';
import MainScreen from '@/screens/MainScreen';
import SpaceScreen from '@/screens/SpaceScreen';

const Home = createStackNavigator<HomeStackParamList>();

const HomeStackNavigation = () => {
  return (
    <Home.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Main"
    >
      <Home.Screen name="Main" component={MainScreen} />
      <Home.Screen name="Space" component={SpaceScreen} />
      <Home.Screen name="AddItem" component={AddItemScreen} />
    </Home.Navigator>
  );
};

export default HomeStackNavigation;
