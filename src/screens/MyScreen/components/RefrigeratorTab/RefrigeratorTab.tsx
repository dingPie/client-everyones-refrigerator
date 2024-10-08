import React, { memo, useCallback } from 'react';

import { Button, Flex, HStack, Text, VStack, useDisclose } from 'native-base';
import { FormProvider } from 'react-hook-form';

import { useNavigation } from '@react-navigation/core';
import { NavigationProp } from '@react-navigation/native';
import { useQueryClient } from '@tanstack/react-query';

import { REFRIGERATOR_SPACE_API_QUERY_KEY } from '@/apis/refrigerator-space/refrigerator-space-api.query';
import { ListModel } from '@/apis/refrigerator-space/types/model/list-model';
import { useRefrigeratorUpdateMutation } from '@/apis/refrigerator/refrigerator-api.mutation';
import {
  REFRIGERATOR_API_QUERY_KEY,
  useGetRefrigeratorByIdQuery,
} from '@/apis/refrigerator/refrigerator-api.query';
import { ApiResponseType } from '@/apis/type';

import { useGlobalContext } from '@/contexts/global/useGlobalStoreContext';
import useCustomToast from '@/hooks/useCustomToast';
import useGetMyAuthority from '@/hooks/useGetMyAuthority';
import useHandleError from '@/hooks/useHandleError';
import { SettingStackParamList } from '@/navigations/type';

import useEditRefrigeratorForm from '../../useEditRefrigeratorForm';
import EditRefrigeratorWrapper from './EditRefrigeratorWrapper';

type MyNavigationProps = NavigationProp<SettingStackParamList, 'My'>;

const RefrigeratorTab = () => {
  const navigation = useNavigation<MyNavigationProps>();
  const queryClient = useQueryClient();
  const Toast = useCustomToast();
  const { refrigeratorId } = useGlobalContext((ctx) => ctx.state);

  const editRefrigeratorMethod = useEditRefrigeratorForm();
  const { getValues, setValue } = editRefrigeratorMethod;

  const { handleApiError, handleFormError } = useHandleError();

  const { isAdmin } = useGetMyAuthority();

  // P_MEMO: 여긴 최신화해서 정보 불러와야 할 듯.
  const { data: refrigeratorData } = useGetRefrigeratorByIdQuery({
    variables: {
      id: refrigeratorId || -1,
    },
    options: {
      enabled: !!refrigeratorId,
      onError: handleApiError,
    },
  });

  const refrigeratorSpaceData = queryClient.getQueryData<
    ApiResponseType<ListModel>
  >(
    REFRIGERATOR_SPACE_API_QUERY_KEY.GET_WITH_ITEM_LIST({
      refrigeratorId: refrigeratorId || -1,
    }),
  );
  const maxStoragePeriod = refrigeratorSpaceData?.result[0]?.maxStoragePeriod;

  const { mutate: updateRefrigeratorMutate } = useRefrigeratorUpdateMutation({
    options: {
      onSuccess: () => {
        queryClient.invalidateQueries(
          REFRIGERATOR_API_QUERY_KEY.GET_BY_ID({ id: refrigeratorId || -1 }),
        );
        Toast.show({
          title: '냉장고 정보 수정이 완료되었어요.',
        });
      },
      onError: handleApiError,
    },
  });

  const {
    isOpen: isEditRefrigerator,
    onOpen: onOpenEditRefrigerator,
    onClose: onCloseEditRefrigerator,
  } = useDisclose();

  const onPressOnEditRefrigeratorButton = useCallback(() => {
    if (!refrigeratorData) return;
    onOpenEditRefrigerator();
    setValue('name', refrigeratorData?.result.name);
    setValue('code', refrigeratorData?.result.code.split('_')[0]);
    setValue('isShowUserName', refrigeratorData?.result.isShowUserName);
  }, [onOpenEditRefrigerator, refrigeratorData, setValue]);

  const onPressSaveEditRefrigeratorButton = useCallback(() => {
    updateRefrigeratorMutate({
      id: refrigeratorData?.result.id || -1,
      ...getValues(),
    });
    onCloseEditRefrigerator();
  }, [
    getValues,
    onCloseEditRefrigerator,
    refrigeratorData?.result.id,
    updateRefrigeratorMutate,
  ]);

  return (
    <VStack flex={1} bgColor="gray.100" px="16px" py="24px" space="16px">
      <HStack
        alignItems="center"
        justifyContent="space-between"
        // h="40px"
        bgColor="white"
        px="8px"
        py="12px"
        borderRadius="8px"
      >
        <Text size="2xl.bold"> 냉장고 정보 </Text>
        {isAdmin && (
          <Button
            onPress={
              isEditRefrigerator
                ? onPressSaveEditRefrigeratorButton
                : onPressOnEditRefrigeratorButton
            }
            size="sm"
          >
            <Text color="white">
              {isEditRefrigerator ? '수정 완료' : '정보 수정'}
            </Text>
          </Button>
        )}
      </HStack>

      <FormProvider {...editRefrigeratorMethod}>
        <EditRefrigeratorWrapper
          isEditRefrigerator={isEditRefrigerator}
          maxStoragePeriod={maxStoragePeriod}
          refrigeratorInfo={refrigeratorData?.result}
        />
      </FormProvider>
    </VStack>
  );
};

export default memo(RefrigeratorTab);
