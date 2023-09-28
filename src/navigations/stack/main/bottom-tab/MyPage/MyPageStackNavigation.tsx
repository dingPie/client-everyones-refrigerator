import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { HomeStackParamList, MyPageStackParamList } from '@/navigations/type';

import LoginScreen from '@/screens/LoginScreen';
import MemberSettingScreen from '@/screens/MemberSettingScreen';
import MySettingScreen from '@/screens/MySettingScreen';
import RefrigeratorSettingScreen from '@/screens/RefrigeratorSettingScreen';

const Auth = createStackNavigator<MyPageStackParamList>();

const MyPageStackNavigation = () => {
  return (
    <Auth.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="MySetting"
    >
      <Auth.Screen name="MySetting" component={MySettingScreen} />
      <Auth.Screen
        name="RefrigeratorSetting"
        component={RefrigeratorSettingScreen}
      />
      <Auth.Screen name="MemberSetting" component={MemberSettingScreen} />
    </Auth.Navigator>
  );
};

export default MyPageStackNavigation;
