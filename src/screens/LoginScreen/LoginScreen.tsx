import React from 'react';

import { Box, Button, Text } from 'native-base';

import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';

import CommonLayout from '@/components/@Layout/CommonLayout';
import { AuthStackParamList } from '@/navigations/type';

type LoginNavigationProps = StackNavigationProp<AuthStackParamList, 'Login'>;

const LoginScreen = () => {
  const navigation = useNavigation<LoginNavigationProps>();
  return (
    <CommonLayout withCustomHeader bgColor="white">
      <Text size="xl">로그인 페이지</Text>
    </CommonLayout>
  );
};

export default LoginScreen;
