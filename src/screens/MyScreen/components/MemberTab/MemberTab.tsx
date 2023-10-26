import React, { memo, useCallback, useEffect, useMemo } from 'react';

import { Button, FlatList, Flex, Text, VStack, useDisclose } from 'native-base';

import { useNavigation } from '@react-navigation/core';
import { NavigationProp } from '@react-navigation/native';
import { useQueryClient } from '@tanstack/react-query';

import { usePatchRefrigeratorUserAuthorityMutation } from '@/apis/refrigerator-user/refrigerator-user-api.mutation';
import {
  REFRIGERATOR_USER_API_QUERY_KEY,
  useGetUserListByRefrigeratorQuery,
} from '@/apis/refrigerator-user/refrigerator-user-api.query';
import {
  GetUserListByRefrigeratorModel,
  UserListByRefrigeratorItemType,
} from '@/apis/refrigerator-user/types/model/get-user-list-by-refrigerator-model';
import { ApiResponseType } from '@/apis/type';

import { useGlobalContext } from '@/contexts/global/useGlobalStoreContext';
import useCustomToast from '@/hooks/useCustomToast';
import useGetMyAuthority from '@/hooks/useGetMyAuthority';
import useHandleError from '@/hooks/useHandleError';
import { SettingStackParamList } from '@/navigations/type';

import MemberItem from './MemberItem';

type MyNavigationProps = NavigationProp<SettingStackParamList, 'My'>;

const MemberTab = () => {
  const navigation = useNavigation<MyNavigationProps>();
  const queryClient = useQueryClient();
  const Toast = useCustomToast();
  const { refrigeratorId } = useGlobalContext((ctx) => ctx.state);
  const { handleApiError } = useHandleError();

  const { isManager } = useGetMyAuthority();

  const { data: userListByRefrigeratorData } =
    useGetUserListByRefrigeratorQuery({
      variables: {
        refrigeratorId: refrigeratorId || -1,
      },
      options: {
        enabled: !!refrigeratorId,
        onError: handleApiError,
      },
    });

  const { mutate: patchAuthorityMutate } =
    usePatchRefrigeratorUserAuthorityMutation({
      options: {
        onSuccess: (data, variables) => {
          // P_MEMO: 먜 API를 칠 때 마다 invalidQuery를 치는건 너무 API 호출이 잦음. 해당 방식으로 처리.
          queryClient.setQueryData<
            ApiResponseType<GetUserListByRefrigeratorModel>
          >(
            REFRIGERATOR_USER_API_QUERY_KEY.GET_USER_LIST_BY_REFRIGERATOR({
              refrigeratorId: refrigeratorId || -1,
            }),
            (curr) => {
              if (!curr) return;
              const newValue = curr?.result?.userList.map((user) =>
                user.userId === variables.userId
                  ? { ...user, authority: variables.authority }
                  : user,
              );
              return {
                ...curr,
                result: {
                  userList: newValue,
                },
              };
            },
          );
        },

        onError: handleApiError,
      },
    });

  const userListByRefrigerator = useMemo(
    () => userListByRefrigeratorData?.result.userList,
    [userListByRefrigeratorData?.result],
  );

  const { isOpen: isEditAuthority, onToggle: onToggleEditAuthority } =
    useDisclose();

  const onChangeUserAuthority = useCallback(
    ({
      userId,
      authority,
    }: Omit<UserListByRefrigeratorItemType, 'id' | 'userName'>) => {
      patchAuthorityMutate({
        userId,
        refrigeratorId: refrigeratorId || -1,
        authority,
      });
    },
    [patchAuthorityMutate, refrigeratorId],
  );

  return (
    <FlatList
      data={userListByRefrigerator}
      renderItem={({ item }) => {
        return (
          <MemberItem
            memberInfo={item}
            onChangeMemberAuthority={onChangeUserAuthority}
            isEditAuthority={isEditAuthority}
          />
        );
      }}
      bgColor="white"
      px="16px"
      py="24px"
      ListHeaderComponent={
        <Flex flexDir="row" justifyContent="space-between" mb="12px" h="40px">
          <Text size="2xl.bold"> 참여 인원 목록 </Text>
          {isManager && (
            <Button onPress={onToggleEditAuthority} size="sm">
              <Text color="white">
                {isEditAuthority ? '권한 수정 완료' : '권한 수정'}
              </Text>
            </Button>
          )}
        </Flex>
      }
    />
  );
};

export default memo(MemberTab);
