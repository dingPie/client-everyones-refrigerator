import React from 'react';

import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';

import ExampleModalScreen from '@/screens/auth/ExampleModalScreen';
import LoginScreen from '@/screens/auth/LoginScreen';
import SignupScreen from '@/screens/auth/SignupScreen';

import { AuthStackParamList } from './types/auth-stack-param-list';

const Auth = createStackNavigator<AuthStackParamList>();

function AuthStackNavigation() {
  return (
    <Auth.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Auth.Screen name="Login" component={LoginScreen} />
      <Auth.Screen name="Signup" component={SignupScreen} />
      <Auth.Group
        screenOptions={{
          cardStyle: { backgroundColor: 'transparent' },
          headerShown: false,
          presentation: 'transparentModal',
          cardOverlayEnabled: true,
          cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
        }}
      >
        <Auth.Screen name="Modal" component={ExampleModalScreen} />
      </Auth.Group>
    </Auth.Navigator>
  );
}

export default AuthStackNavigation;
