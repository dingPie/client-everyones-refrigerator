import React from 'react';

import { Box, Button, Input, Text } from 'native-base';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { useAuthLogoutMutation } from '@/apis/auth/auth-api.mutation';

import { useGlobalContext } from '@/contexts/global/useGlobalStoreContext';
import { MainStackParamList } from '@/navigations/type';

import { deleteToken } from '@/utils/async-storage/token';

type MainNavigationProp = StackNavigationProp<MainStackParamList>;

const SelectRefrigeratorScreen = () => {
  const navigation = useNavigation<MainNavigationProp>();
  const { dispatch } = useGlobalContext((ctx) => ctx);

  const { mutate: authLogoutMutate } = useAuthLogoutMutation({
    options: {
      onSuccess: () => {
        dispatch({ type: 'LOGOUT' });
        deleteToken();
      },
      onError: (err) => {
        console.log('@@@ 로그아웃 에러', err);
      },
    },
  });

  return (
    <Box
      flex={1}
      h="100%"
      borderRadius="10px"
      borderColor="white"
      color="primary.400"
    >
      <Text size="xl">냉장고 선택 페이지</Text>

      <Button onPress={async () => authLogoutMutate({})}>
        <Text>임시 로그아웃 버튼</Text>
      </Button>

      <Button onPress={() => navigation.navigate('BottomTab')}>
        <Text>바텀탭으로 가기</Text>
      </Button>
    </Box>
  );
};

export default SelectRefrigeratorScreen;
