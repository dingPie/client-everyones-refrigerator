import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { HomeStackParamList } from '@/navigations/type';

import HomeScreen from '@/screens/HomeScreen';
import LoginScreen from '@/screens/LoginScreen';

const Home = createStackNavigator<HomeStackParamList>();

const HomeStackNavigation = () => {
  return (
    <Home.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Main"
    >
      <Home.Screen name="Main" component={HomeScreen} />
      <Home.Screen name="Space" component={LoginScreen} />
      <Home.Screen name="AddItem" component={LoginScreen} />
    </Home.Navigator>
  );
};

export default HomeStackNavigation;
