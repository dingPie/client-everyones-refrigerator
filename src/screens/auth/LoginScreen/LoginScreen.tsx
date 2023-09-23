import React from 'react';

import { Box, Button, Text } from 'native-base';

import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';

import CommonLayout from '@/components/@Layout/CommonLayout';
import { AuthStackParamList } from '@/navigations/stack/auth/types/auth-stack-param-list';

type LoginNavigationProps = StackNavigationProp<AuthStackParamList, 'Login'>;

const LoginScreen = () => {
  const navigation = useNavigation<LoginNavigationProps>();
  return (
    <CommonLayout withCustomHeader bgColor="white">
      <Box bgColor="white" flex={1}>
        <Text size="title">text style</Text>
        <Button
          bgColor="primary.300"
          onPress={() => navigation.navigate('Signup')}
        >
          go to signup
        </Button>
      </Box>
    </CommonLayout>
  );
};

export default LoginScreen;
