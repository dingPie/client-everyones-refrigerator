import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { BottomTabParamList } from '@/navigations/type';

import HomeStackNavigation from './Home/HomeStackNavigation';
import MyPageStackNavigation from './MyPage/MyPageStackNavigation';
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
      <BottomTab.Screen name="MyPageTab" component={MyPageStackNavigation} />
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigation;
