import React, { useCallback, useEffect, useMemo } from 'react';

import {
  Button,
  FlatList,
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

import { useGetUserListByRefrigeratorQuery } from '@/apis/refrigerator-user/refrigerator-user-api.query';

import useCustomModal from '@/contexts/Modal/useCustomModal';
import { useGlobalContext } from '@/contexts/global/useGlobalStoreContext';
import useCustomToast from '@/hooks/useCustomToast';
import { SettingStackParamList } from '@/navigations/type';

import { deleteToken } from '@/utils/async-storage/token';

import useEditNotificationForm from '../useEditNotificationForm';
import AuthInfoWrapper from './AuthInfoWrapper';
import NotificationWrapper from './NotificationWrapper';

type MyNavigationProps = NavigationProp<SettingStackParamList, 'My'>;

const MemberTab = () => {
  const navigation = useNavigation<MyNavigationProps>();
  const queryClient = useQueryClient();
  const useEditNotificationMethod = useEditNotificationForm();
  const Toast = useCustomToast();
  const Modal = useCustomModal();
  const { refrigeratorId } = useGlobalContext((ctx) => ctx.state);
  const dispatch = useGlobalContext((ctx) => ctx.dispatch);

  const { data: userListByRefrigeratorData } =
    useGetUserListByRefrigeratorQuery({
      variables: {
        refrigeratorId: refrigeratorId || -1,
      },
      options: {
        enabled: !!refrigeratorId,
        onError: (err: any) => {
          console.log('유저목록 불러오기 에러 :', err.response.data?.message);
          Toast.show({
            title: err.response.data?.message || '',
            status: 'error',
          });
        },
      },
    });

  const userListByRefrigerator = useMemo(
    () => userListByRefrigeratorData?.result.userList,
    [userListByRefrigeratorData?.result],
  );

  return (
    <FlatList
      data={[]}
      renderItem={({}) => {
        return <></>;
      }}
    />
  );
};

export default MemberTab;
