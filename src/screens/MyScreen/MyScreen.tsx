import React, { useCallback, useMemo } from 'react';

import {
  Avatar,
  Box,
  Button,
  HStack,
  ScrollView,
  Text,
  VStack,
} from 'native-base';

import { useNavigation } from '@react-navigation/core';
import { NavigationProp } from '@react-navigation/native';

import { useAuthLogoutMutation } from '@/apis/auth/auth-api.mutation';
import { useGetMyInfoByRefrigeratorQuery } from '@/apis/refrigerator-user/refrigerator-user-api.query';

import CustomIcon from '@/components/@common/CustomIcon';
import useCustomModal from '@/contexts/Modal/useCustomModal';
import { useGlobalContext } from '@/contexts/global/useGlobalStoreContext';
import useCustomToast from '@/hooks/useCustomToast';
import { SettingStackParamList } from '@/navigations/type';

import { deleteToken } from '@/utils/async-storage/token';

import AuthInfoWrapper from './components/AuthInfoWrapper';

type MyNavigationProps = NavigationProp<SettingStackParamList, 'My'>;

const MyScreen = () => {
  const navigation = useNavigation<MyNavigationProps>();
  const Toast = useCustomToast();
  const Modal = useCustomModal();
  const { refrigeratorId } = useGlobalContext((ctx) => ctx.state);
  const dispatch = useGlobalContext((ctx) => ctx.dispatch);

  const { data: myInfoByRefrigeratorData } = useGetMyInfoByRefrigeratorQuery({
    variables: {
      refrigeratorId: refrigeratorId || -1,
    },
    options: {
      enabled: !!refrigeratorId,
      onError: (err: any) => {
        console.log(
          '$######## 이 냉장고의 내 정보 불러오기 에러',
          err.response.data?.message,
        );

        Toast.show({
          title: err.response.data?.message || '',
          status: 'error',
        });
      },
    },
  });

  const { mutate: authLogoutMutate } = useAuthLogoutMutation({
    options: {
      onSuccess: () => {
        dispatch({ type: 'LOGOUT' });
        deleteToken();
        Toast.show({
          title: '로그아웃 되었어요.',
        });
      },
      onError: (err) => {
        console.log('@@@ 로그아웃 에러', err);
      },
    },
  });

  const myInfoByRefrigeratorInfo = useMemo(
    () => myInfoByRefrigeratorData?.result,
    [myInfoByRefrigeratorData?.result],
  );

  const onPressLogoutButton = useCallback(() => {
    Modal.show({
      title: '로그아웃',
      content: '현재 계정에서 로그아웃 할까요?',
      buttons: [
        { text: '아니오', isCancel: true },
        {
          text: '네',
          onPress: () => {
            authLogoutMutate({});
            Modal.close();
          },
        },
      ],
    });
  }, [Modal, authLogoutMutate]);

  return (
    <ScrollView flex={1} h="100%" bgColor="gray.100" py="24px" px="16px">
      <VStack flex={1} space="24px">
        <Text size="3xl.bold">내 정보</Text>

        {/* 상단 유저 로그인정보, 로그아웃 버튼 */}
        <AuthInfoWrapper
          myInfoByRefrigeratorInfo={myInfoByRefrigeratorInfo}
          onPressLogoutButton={onPressLogoutButton}
        />
      </VStack>
    </ScrollView>
  );
};

export default MyScreen;
