import React from 'react';

import { Button } from 'native-base';

import { useNavigation } from '@react-navigation/core';

import CommonLayout from '@/components/@Layout/CommonLayout';
import { AuthStackParamList } from '@/navigations/stack/auth/types/auth-stack-param-list';
import { RootStackParamList } from '@/navigations/stack/root/types/root-stack-param-list';
import { GenCompositeNavigationProp } from '@/navigations/types/navigation-type';

const SignupScreen = () => {
  const navigation =
    useNavigation<
      GenCompositeNavigationProp<
        'HomeTab',
        AuthStackParamList & RootStackParamList
      >
    >();
  return (
    <CommonLayout withCustomHeader bgColor="white">
      <Button
        bgColor="primary.400"
        onPress={() =>
          navigation.navigate('BottomTab', {
            screen: 'HomeTab',
            params: {
              screen: 'Home',
            },
          })
        }
      >
        go to HomeTabs
      </Button>
    </CommonLayout>
  );
};

export default SignupScreen;
