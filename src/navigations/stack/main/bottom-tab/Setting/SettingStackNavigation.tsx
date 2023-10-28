import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { SettingStackParamList } from '@/navigations/type';

import MemberScreen from '@/screens/MemberScreen';
import MyScreen from '@/screens/MyScreen';
import RefrigeratorScreen from '@/screens/RefrigeratorScreen';

const Auth = createStackNavigator<SettingStackParamList>();

const SettingStackNavigation = () => {
  return (
    <Auth.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="My"
    >
      <Auth.Screen name="My" component={MyScreen} />
      {/* <Auth.Screen name="Refrigerator" component={RefrigeratorScreen} />
      <Auth.Screen name="Member" component={MemberScreen} /> */}
    </Auth.Navigator>
  );
};

export default SettingStackNavigation;
