import React from 'react';

import { Button, Text } from 'native-base';

import { useNavigation } from '@react-navigation/core';

import CommonLayout from '@/components/@Layout/CommonLayout';
import { useGlobalState } from '@/contexts/global/hooks/useGlobalState';
import { AuthStackParamList } from '@/navigations/stack/auth/types/auth-stack-param-list';
import { GenCompositeNavigationProp } from '@/navigations/types/navigation-type';

const CountScreen = () => {
  const { state, dispatch } = useGlobalState();

  const navigation =
    useNavigation<GenCompositeNavigationProp<'HomeTab', AuthStackParamList>>();

  return (
    <CommonLayout toCenter>
      <Button
        w="50px"
        h="50px"
        bgColor="primary.100"
        onPress={() => dispatch({ type: 'DECREMENT', payload: state.count })}
      >
        -
      </Button>
      <Text>{state.count}</Text>
      <Button
        w="50px"
        h="50px"
        bgColor="primary.100"
        onPress={() => dispatch({ type: 'INCREMENT', payload: state.count })}
      >
        +
      </Button>
      <Button onPress={() => navigation.navigate('Modal')}>modal open!</Button>
    </CommonLayout>
  );
};

export default CountScreen;
