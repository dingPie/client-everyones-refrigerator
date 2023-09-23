import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import MypageScreen from '@/screens/mypage/MypageScreen';

import { MypageStackParamList } from './types/mypage-stack-param.list';

const Home = createStackNavigator<MypageStackParamList>();

function MypageStackNavigation() {
  return (
    <Home.Navigator>
      <Home.Screen name="Mypage" component={MypageScreen} />
    </Home.Navigator>
  );
}

export default MypageStackNavigation;
