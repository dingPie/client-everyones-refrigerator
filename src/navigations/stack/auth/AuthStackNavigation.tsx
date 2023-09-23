import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { AuthStackParamList } from '@/navigations/type';

import LoginScreen from '@/screens/LoginScreen';

const Auth = createStackNavigator<AuthStackParamList>();

const AuthStackNavigation = () => {
  return (
    <Auth.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Auth.Screen name="Login" component={LoginScreen} />
    </Auth.Navigator>
  );
};

export default AuthStackNavigation;
