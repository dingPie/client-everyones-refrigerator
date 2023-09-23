import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { IntroStackParamList } from '@/navigations/type';

import CreateRefrigeratorScreen from '@/screens/CreateRefrigeratorScreen';
import SelectRefrigeratorScreen from '@/screens/SelectRefrigeratorScreen';

const Intro = createStackNavigator<IntroStackParamList>();

const IntroStackNavigation = () => {
  return (
    <Intro.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="SelectRefrigerator"
    >
      {/* P_TODO: 냉장고 선택 페이지 */}
      <Intro.Screen
        name="SelectRefrigerator"
        component={SelectRefrigeratorScreen}
      />
      {/* P_TODO: 냉장고 추가 페이지  */}
      <Intro.Screen
        name="CreateRefrigerator"
        component={CreateRefrigeratorScreen}
      />
    </Intro.Navigator>
  );
};

export default IntroStackNavigation;
