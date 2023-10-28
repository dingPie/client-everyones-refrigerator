import React, { useCallback, useEffect, useMemo } from 'react';

import {
  Button,
  HStack,
  Pressable,
  ScrollView,
  Text,
  VStack,
} from 'native-base';
import { FormProvider } from 'react-hook-form';

import { useNavigation } from '@react-navigation/core';
import { NavigationProp } from '@react-navigation/native';
import { useQueryClient } from '@tanstack/react-query';

import { useAuthLogoutMutation } from '@/apis/auth/auth-api.mutation';
import {
  usePatchRefrigeratorUserMyInfoByRefrigeratorMutation,
  useRefrigeratorWithdrawalMutation,
} from '@/apis/refrigerator-user/refrigerator-user-api.mutation';
import {
  REFRIGERATOR_USER_API_QUERY_KEY,
  useGetMyInfoByRefrigeratorQuery,
} from '@/apis/refrigerator-user/refrigerator-user-api.query';

import useCustomModal from '@/contexts/Modal/useCustomModal';
import { useGlobalContext } from '@/contexts/global/useGlobalStoreContext';
import useCustomToast from '@/hooks/useCustomToast';
import useHandleError from '@/hooks/useHandleError';
import { SettingStackParamList } from '@/navigations/type';

import { deleteToken } from '@/utils/async-storage/token';

import useEditNotificationForm from '../../useEditNotificationForm';
import AuthInfoWrapper from './AuthInfoWrapper';
import NotificationWrapper from './NotificationWrapper';

type MyNavigationProps = NavigationProp<SettingStackParamList, 'My'>;

const MyInfoTab = () => {
  const navigation = useNavigation<MyNavigationProps>();
  const queryClient = useQueryClient();
  const editNotificationMethod = useEditNotificationForm();
  const { setValue, getValues, handleSubmit } = editNotificationMethod;
  const Toast = useCustomToast();
  const Modal = useCustomModal();
  const { handleApiError } = useHandleError();

  const { refrigeratorId } = useGlobalContext((ctx) => ctx.state);
  const dispatch = useGlobalContext((ctx) => ctx.dispatch);

  const { data: myInfoByRefrigeratorData } = useGetMyInfoByRefrigeratorQuery({
    variables: {
      refrigeratorId: refrigeratorId || -1,
    },
    options: {
      enabled: !!refrigeratorId,
      onError: handleApiError,
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
      onError: handleApiError,
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
        onError: handleApiError,
      },
    });

  const { mutate: withdrawalMutate } = useRefrigeratorWithdrawalMutation({
    options: {
      onSuccess: (data) => {
        if (data.result) {
          Toast.show({
            title: '냉장고 탈퇴가 완료되었어요.',
          });
          queryClient.invalidateQueries([
            REFRIGERATOR_USER_API_QUERY_KEY.GET_MY_INFO_BY_REFRIGERATOR({
              refrigeratorId: refrigeratorId || -1,
            }),
          ]);
          deleteToken();
          dispatch({ type: 'LOGOUT' });
        } else {
          // 이미 보관중인 상품이 있을 떄 실패
          Toast.show({
            status: 'error',
            title: data.message,
          });
        }
      },
      onError: handleApiError,
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
    patchRefrigeratorUserMyInfoByRefrigeratorMutate({
      refrigeratorId: refrigeratorId || -1,
      ...getValues(),
    });
  }, [
    getValues,
    patchRefrigeratorUserMyInfoByRefrigeratorMutate,
    refrigeratorId,
  ]);

  const onPressWithdrawalButton = useCallback(() => {
    Modal.show({
      title: '냉장고 탈퇴',
      content:
        '현재 냉장고에서 나갈까요?\n보관중인 상품이 있다면 탈퇴가 불가능해요.',
      buttons: [
        {
          text: '아니오',
          isCancel: true,
        },
        {
          text: '네',
          onPress: () => {
            Modal.close();
            withdrawalMutate({
              refrigeratorId: refrigeratorId || -1,
            });
          },
        },
      ],
    });
  }, [Modal, refrigeratorId, withdrawalMutate]);

  useEffect(() => {
    if (!myInfoByRefrigeratorInfo) return;
    setValue('isAlertEtc', myInfoByRefrigeratorInfo?.isAlertEtc);
    setValue('isShowExpireDate', myInfoByRefrigeratorInfo?.isShowExpireDate);
    setValue('lunchAlertTime', myInfoByRefrigeratorInfo?.lunchAlertTime);
    setValue(
      'beforeExpireAlertDate',
      myInfoByRefrigeratorInfo?.beforeExpireAlertDate,
    );
  }, [myInfoByRefrigeratorInfo, setValue]);

  return (
    <ScrollView flex={1} h="100%" bgColor="gray.100" py="24px" px="16px">
      <VStack flex={1} space="24px">
        {/* 상단 유저 로그인정보, 로그아웃 버튼 */}
        <AuthInfoWrapper
          myInfoByRefrigeratorInfo={myInfoByRefrigeratorInfo}
          onPressLogoutButton={onPressLogoutButton}
        />

        <FormProvider {...editNotificationMethod}>
          <NotificationWrapper
            onPressSaveEditNotificationButton={
              onPressSaveEditNotificationButton
            }
          />
        </FormProvider>

        <HStack justifyContent="flex-end">
          <Pressable onPress={() => onPressWithdrawalButton()}>
            <Text size="md" color="gray.800">
              냉장고 나가기
            </Text>
          </Pressable>
        </HStack>
      </VStack>
    </ScrollView>
  );
};

export default MyInfoTab;
