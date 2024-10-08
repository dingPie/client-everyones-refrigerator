import React from 'react';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { useGlobalContext } from '@/contexts/global/useGlobalStoreContext';

import AuthStackNavigation from './stack/auth';
import MainNavigation from './stack/main/MainNavigation';
import { RootStackParamList } from './type';

const Root = createStackNavigator<RootStackParamList>();

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

const Navigations = () => {
  const { isLogin } = useGlobalContext((ctx) => ctx.state);

  const { top } = useSafeAreaInsets();

  return (
    <NavigationContainer
      ref={navigationRef}
      // onReady={() => {
      //   // setBackgroundMessageHandler();
      //   onNotificationOpenedApp();
      //   getInitialNotification();
      // }}
    >
      {/* P_TODO: 로그인 안했으면 로그인 스크린 */}
      {/* P_TODO: 냉장고 선택 화면. */}
      <Root.Navigator initialRouteName="AuthStackNavigation">
        {!isLogin ? (
          <Root.Screen
            name="AuthStackNavigation"
            component={AuthStackNavigation}
            options={{ headerShown: false }}
          />
        ) : (
          <Root.Screen
            name="MainStackNavigation"
            component={MainNavigation}
            options={{
              headerShown: false,
              headerStyle: {
                // width: Dimensions.get('window').width,
                // height: constants.navigationBarHeight + top,
                // backgroundColor: 'red',
              },
            }}
          />
        )}
      </Root.Navigator>
    </NavigationContainer>
  );
};

export default Navigations;
