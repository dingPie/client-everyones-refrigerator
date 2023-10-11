import React, { useCallback, useEffect, useMemo } from 'react';

import { ScrollView, Text, VStack } from 'native-base';
import { FormProvider } from 'react-hook-form';
import { Provider } from 'react-redux';

import { useNavigation } from '@react-navigation/core';
import { NavigationProp } from '@react-navigation/native';
import { useQueryClient } from '@tanstack/react-query';

import { useAuthLogoutMutation } from '@/apis/auth/auth-api.mutation';
import { usePatchRefrigeratorUserMyInfoByRefrigeratorMutation } from '@/apis/refrigerator-user/refrigerator-user-api.mutation';
import {
  REFRIGERATOR_USER_API_QUERY_KEY,
  useGetMyInfoByRefrigeratorQuery,
} from '@/apis/refrigerator-user/refrigerator-user-api.query';

import useCustomModal from '@/contexts/Modal/useCustomModal';
import { useGlobalContext } from '@/contexts/global/useGlobalStoreContext';
import useCustomToast from '@/hooks/useCustomToast';
import { SettingStackParamList } from '@/navigations/type';

import { deleteToken } from '@/utils/async-storage/token';

import AuthInfoWrapper from './components/AuthInfoWrapper';
import NotificationWrapper from './components/NotificationWrapper';
import useEditNotificationForm from './useEditNotificationForm';

type MyNavigationProps = NavigationProp<SettingStackParamList, 'My'>;

const MyScreen = () => {
  const navigation = useNavigation<MyNavigationProps>();
  const queryClient = useQueryClient();
  const useEditNotificationMethod = useEditNotificationForm();
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

  const myInfoByRefrigeratorInfo = useMemo(
    () => myInfoByRefrigeratorData?.result,
    [myInfoByRefrigeratorData?.result],
  );

  const { mutate: authLogoutMutate } = useAuthLogoutMutation({
    options: {
      onSuccess: () => {
        dispatch({ type: 'LOGOUT' });
        deleteToken();
        Toast.show({
          title: '로그아웃 되었어요.',
        });
      },
      onError: (err: any) => {
        console.log('@@@ 로그아웃 에러', err);
        Toast.show({
          title: err.response.data?.message || '',
          status: 'error',
        });
      },
    },
  });

  const { mutate: patchRefrigeratorUserMyInfoByRefrigeratorMutate } =
    usePatchRefrigeratorUserMyInfoByRefrigeratorMutation({
      options: {
        onSuccess: () => {
          Toast.show({
            title: '내 권한 수정이 완료되었어요.',
          });
          queryClient.invalidateQueries([
            REFRIGERATOR_USER_API_QUERY_KEY.GET_MY_INFO_BY_REFRIGERATOR({
              refrigeratorId: refrigeratorId || -1,
            }),
          ]);
        },
        onError: (err: any) => {
          console.log('@@@ 로그아웃 에러', err);
          Toast.show({
            title: err.response.data?.message || '',
            status: 'error',
          });
        },
      },
    });

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

  const onPressSaveEditNotificationButton = useCallback(async () => {
    //  P_TODO: 저장되어야 함.

    // P_TODO: 아니 왜 defaultValue는 안먹음?

    await useEditNotificationMethod.trigger();

    console.log(
      '$$$$$$$$$$$$$$$',
      refrigeratorId,
      useEditNotificationMethod.getValues(),
    );

    patchRefrigeratorUserMyInfoByRefrigeratorMutate({
      refrigeratorId: refrigeratorId || -1,
      ...useEditNotificationMethod.getValues(),
    });
  }, [
    patchRefrigeratorUserMyInfoByRefrigeratorMutate,
    refrigeratorId,
    useEditNotificationMethod,
  ]);
  console.log(refrigeratorId);

  useEffect(() => {
    if (!myInfoByRefrigeratorInfo) return;

    console.log('ㅡ아ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ', myInfoByRefrigeratorInfo);

    useEditNotificationMethod.setValue(
      'isAlertEtc',
      myInfoByRefrigeratorInfo?.isAlertEtc,
    );
    useEditNotificationMethod.setValue(
      'isShowExpireDate',
      myInfoByRefrigeratorInfo?.isShowExpireDate,
    );
    useEditNotificationMethod.setValue(
      'lunchAlertTime',
      myInfoByRefrigeratorInfo?.lunchAlertTime,
    );
    useEditNotificationMethod.setValue(
      'beforeExpireAlertDate',
      myInfoByRefrigeratorInfo?.beforeExpireAlertDate,
    );
  }, [myInfoByRefrigeratorInfo, useEditNotificationMethod]);

  return (
    <ScrollView flex={1} h="100%" bgColor="white" py="24px" px="16px">
      <VStack flex={1} space="24px">
        <Text size="3xl.bold">내 정보</Text>

        {/* 상단 유저 로그인정보, 로그아웃 버튼 */}
        <AuthInfoWrapper
          myInfoByRefrigeratorInfo={myInfoByRefrigeratorInfo}
          onPressLogoutButton={onPressLogoutButton}
        />

        <FormProvider {...useEditNotificationMethod}>
          <NotificationWrapper
            onPressSaveEditNotificationButton={
              onPressSaveEditNotificationButton
            }
          />
        </FormProvider>
      </VStack>
    </ScrollView>
  );
};

export default MyScreen;
