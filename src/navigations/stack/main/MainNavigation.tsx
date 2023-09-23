import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { MainStackParamList } from '@/navigations/type';

import BottomTabNavigation from './bottom-tab/BottomTabNavigation';
import IntroStackNavigation from './intro';

const Main = createStackNavigator<MainStackParamList>();

const MainNavigation = () => {
  return (
    <Main.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Intro"
    >
      <Main.Screen name="Intro" component={IntroStackNavigation} />
      <Main.Screen name="BottomTab" component={BottomTabNavigation} />
    </Main.Navigator>
  );
};

export default MainNavigation;
