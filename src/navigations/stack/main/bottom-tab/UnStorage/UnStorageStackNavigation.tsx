import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { UnStorageStackParamList } from '@/navigations/type';

import LoginScreen from '@/screens/LoginScreen';

const Auth = createStackNavigator<UnStorageStackParamList>();

const UnStorageStackNavigation = () => {
  return (
    <Auth.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="UnStorage"
    >
      <Auth.Screen name="UnStorage" component={LoginScreen} />
    </Auth.Navigator>
  );
};

export default UnStorageStackNavigation;
