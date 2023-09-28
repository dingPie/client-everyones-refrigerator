import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { BottomTabParamList } from '@/navigations/type';

import HomeStackNavigation from './Home/HomeStackNavigation';
import SettingStackNavigation from './Setting/SettingStackNavigation';
import UnStorageStackNavigation from './UnStorage/UnStorageStackNavigation';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigation = () => {
  return (
    <BottomTab.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="HomeTab"
    >
      <BottomTab.Screen
        name="UnStorageTab"
        component={UnStorageStackNavigation}
      />
      <BottomTab.Screen name="HomeTab" component={HomeStackNavigation} />
      <BottomTab.Screen name="SettingTab" component={SettingStackNavigation} />
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigation;
