import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeStackNavigation from '@/navigations/stack/home';
import MypageNavigation from '@/navigations/stack/mypage';

import { BottomTabParamList } from './types/bottom-tab-param-list';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigation() {
  return (
    <BottomTab.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="HomeTab"
    >
      <BottomTab.Screen name="HomeTab" component={HomeStackNavigation} />
      <BottomTab.Screen name="MypageTab" component={MypageNavigation} />
    </BottomTab.Navigator>
  );
}
