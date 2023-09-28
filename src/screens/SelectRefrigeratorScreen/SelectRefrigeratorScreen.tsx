import React, { useCallback, useMemo, useState } from 'react';

import { Box, Button, Flex, Input, Text } from 'native-base';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { useAuthLogoutMutation } from '@/apis/auth/auth-api.mutation';
import { useGetMyRefrigeratorListQuery } from '@/apis/refrigerator-user/refrigerator-user-api.query';
import { MyRefrigeratorItemType } from '@/apis/refrigerator-user/types/model/my-refrigerator-list-model';

import { useGlobalContext } from '@/contexts/global/useGlobalStoreContext';
import { MainStackParamList } from '@/navigations/type';

import { deleteToken } from '@/utils/async-storage/token';

import RefrigeratorCarousel from './components/RefrigeratorCarousel';

type MainNavigationProp = StackNavigationProp<MainStackParamList>;

const SelectRefrigeratorScreen = () => {
  const navigation = useNavigation<MainNavigationProp>();
  const { dispatch } = useGlobalContext((ctx) => ctx);

  const { data: myRefrigeratorData } = useGetMyRefrigeratorListQuery({
    options: {
      onSuccess: (data) => {
        console.log(
          '내가 참여중인 냉장고 목록',
          data.result.myRefrigeratorList,
        );
      },
      onError: (err) => {
        console.log('내가 참여중인 냉장고 목록 불러오기 오류', err);
      },
    },
  });

  const myRefrigeratorList = useMemo(() => {
    const result = myRefrigeratorData?.result?.myRefrigeratorList || [];
    result.push({
      authority: 'admin',
      refrigerator: { id: -1, name: '추가용 카드' },
    });
    return result;
  }, [myRefrigeratorData]);

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

  const onPressMyRefrigeratorCard = useCallback(
    (refrigeratorItem: MyRefrigeratorItemType) => {
      console.log('@@@ 이냉장고 눌림. route 해야함.', refrigeratorItem);
    },
    [],
  );

  const onPressCreateRefrigeratorButton = useCallback(() => {
    console.log('냉장고 생성 페이지로 이동해야 함 =');
  }, []);

  const onPressJoinOtherRefrigeratorButton = useCallback(() => {
    console.log('참여 코드 입력 모달을 띄워야 함. Modal Setup도 해야겠네 ..');
  }, []);

  return (
    <Flex
      flex={1}
      h="100%"
      borderRadius="10px"
      borderColor="white"
      color="primary.400"
      justifyContent="center"
      bgColor="primary.100"
    >
      {/* <Text size="xl">냉장고 선택 페이지</Text> */}

      <RefrigeratorCarousel
        refrigeratorList={myRefrigeratorList}
        onPressMyRefrigeratorCard={onPressMyRefrigeratorCard}
        onPressCreateRefrigeratorButton={onPressCreateRefrigeratorButton}
        onPressJoinOtherRefrigeratorButton={onPressJoinOtherRefrigeratorButton}
      />

      {/* <Button onPress={async () => authLogoutMutate({})}>
        <Text>임시 로그아웃 버튼</Text>
      </Button>

      <Button onPress={() => navigation.navigate('BottomTab')}>
        <Text>바텀탭으로 가기</Text>
      </Button> */}
    </Flex>
  );
};

export default SelectRefrigeratorScreen;
