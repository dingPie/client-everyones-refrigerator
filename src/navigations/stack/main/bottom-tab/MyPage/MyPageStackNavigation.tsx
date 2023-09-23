import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { HomeStackParamList, MyPageStackParamList } from '@/navigations/type';

import LoginScreen from '@/screens/LoginScreen';

const Auth = createStackNavigator<MyPageStackParamList>();

const MyPageStackNavigation = () => {
  return (
    <Auth.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="MySetting"
    >
      <Auth.Screen name="MySetting" component={LoginScreen} />
      <Auth.Screen name="RefrigeratorSetting" component={LoginScreen} />
      <Auth.Screen name="UserListSetting" component={LoginScreen} />
    </Auth.Navigator>
  );
};

export default MyPageStackNavigation;
