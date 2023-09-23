import React from 'react';

import { useFlipper } from '@react-navigation/devtools';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import BottomTabNavigation from '../../tab/bottomtab';
import AuthStackNavigation from '../auth';
import { RootStackParamList } from './types/root-stack-param-list';

/**
 *
 * 각 스크린의 이름은 항상 고유해야 합니다.
 * stack, tab navigation 을 분리하여 구조를 생성해주세요.
 *
 * @see https://reactnavigation.org/docs/getting-started
 *
 */
const Root = createStackNavigator<RootStackParamList>();

export default function Navigations() {
  const navigationRef = useNavigationContainerRef();
  useFlipper(navigationRef);

  return (
    <NavigationContainer ref={navigationRef}>
      <Root.Navigator
        initialRouteName="AuthStackNavigation"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Root.Screen
          name="AuthStackNavigation"
          component={AuthStackNavigation}
        />
        <Root.Screen name="BottomTab" component={BottomTabNavigation} />
      </Root.Navigator>
    </NavigationContainer>
  );
}
