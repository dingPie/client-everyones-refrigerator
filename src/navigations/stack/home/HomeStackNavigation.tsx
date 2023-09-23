import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import CountScreen from '@/screens/home/CountScreen';
import HomeScreen from '@/screens/home/HomeScreen';

import { HomeStackParamList } from './types/home-stack-param-list';

const Home = createStackNavigator<HomeStackParamList>();

function HomeStackNavigation() {
  return (
    <Home.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Home.Screen name="Home" component={HomeScreen} />
      <Home.Screen name="Count" component={CountScreen} />
    </Home.Navigator>
  );
}

export default HomeStackNavigation;
