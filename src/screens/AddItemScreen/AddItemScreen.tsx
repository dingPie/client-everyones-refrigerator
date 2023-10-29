import React, { useCallback, useEffect, useMemo } from 'react';

import { Button, Flex, Text, VStack, useDisclose } from 'native-base';
import { FormProvider } from 'react-hook-form';

import { useNavigation } from '@react-navigation/core';
import { NavigationProp } from '@react-navigation/native';
import { useQueryClient } from '@tanstack/react-query';

import { useItemCreateMutation } from '@/apis/item/item-api.mutation';
import {
  REFRIGERATOR_SPACE_API_QUERY_KEY,
  useGetRefrigeratorSpaceListQuery,
} from '@/apis/refrigerator-space/refrigerator-space-api.query';
import { useGetMyInfoByRefrigeratorQuery } from '@/apis/refrigerator-user/refrigerator-user-api.query';
import { REFRIGERATOR_API_QUERY_KEY } from '@/apis/refrigerator/refrigerator-api.query';
import { MyRefrigeratorItemType } from '@/apis/refrigerator/types/model/by-id-model';
import { ApiResponseType } from '@/apis/type';

import { useGlobalContext } from '@/contexts/global/useGlobalStoreContext';
import useCustomToast from '@/hooks/useCustomToast';
import useHandleError from '@/hooks/useHandleError';
import { HomeStackParamList } from '@/navigations/type';

import ImageSelectActionsheet from './components/ImageSelectActionsheet';
import InputWrapper from './components/InputWrapper';
import useAddItemForm from './useAddItemForm';

type AddItemNavigationProps = NavigationProp<HomeStackParamList, 'AddItem'>;

const AddItemScreen = () => {
  const navigation = useNavigation<AddItemNavigationProps>();
  const queryClient = useQueryClient();
  const Toast = useCustomToast();
  const { handleApiError, handleFormError } = useHandleError();
  const addItemMethod = useAddItemForm();
  const { getValues, setValue, handleSubmit } = addItemMethod;

  const { refrigeratorId } = useGlobalContext((ctx) => ctx.state);

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

  // P_MEMO: 냉장고 정보는 거의 불변성을 지니는 정보기 때문에 API 호출이 아닌 getData 사용
  const refrigeratorInfo = useMemo(
    () =>
      queryClient.getQueriesData<ApiResponseType<MyRefrigeratorItemType>>(
        REFRIGERATOR_API_QUERY_KEY.GET_BY_ID({
          id: refrigeratorId || -1,
        }),
      )[0][1]?.result,
    [queryClient, refrigeratorId],
  );

  const { data: refrigeratorSpaceListData } = useGetRefrigeratorSpaceListQuery({
    variables: {
      refrigeratorId: refrigeratorId || -1,
    },
    options: {
      enabled: !!refrigeratorId,
      onError: handleApiError,
    },
  });

  const { mutate: itemCreateMutate } = useItemCreateMutation({
    options: {
      onSuccess: (data) => {
        Toast.show({
          title: '새 상품 추가에 성공했어요.',
        });
        queryClient.invalidateQueries(
          REFRIGERATOR_SPACE_API_QUERY_KEY.GET_WITH_ITEM_LIST({
            refrigeratorId: refrigeratorId || -1,
          }),
        );
        navigation.goBack();
      },
      onError: handleApiError,
    },
  });

  const {
    isOpen: isOpenIconActionSheet,
    onClose: onCloseIconActionSheet,
    onOpen: onOpenIconActionSheet,
  } = useDisclose();

  const onPressSelectIcon = useCallback(
    (imgUrl: string) => {
      setValue('imgUrl', imgUrl);
      onCloseIconActionSheet();
    },
    [onCloseIconActionSheet, setValue],
  );

  const onPressImgUrlIcon = useCallback(
    () => onOpenIconActionSheet(),
    [onOpenIconActionSheet],
  );

  // P_TODO: 추가 가능한 갯수에 대한 유효성검사는 백엔드에서 처리함 . FE에서 더 처리하려면 API를 추가로 호출해야 하는데, 굳이 그럴 필요가 없다.
  const onPressAddItemButton = handleSubmit(async () => {
    itemCreateMutate({
      name: getValues('name'),
      imgUrl: getValues('imgUrl'),
      quantity: Number(getValues('quantity')),
      refrigeratorSpaceId: Number(getValues('refrigeratorSpaceId')),
      ownerName: getValues('ownerName'),
      memo: getValues('memo'),
    });
  }, handleFormError);

  // P_MEMO: 이 이름 보이기 외에도 해야될게 있다면 여기서 init 해줌.
  useEffect(() => {
    if (refrigeratorInfo?.isShowUserName && myInfoByRefrigeratorInfo) {
      setValue('ownerName', myInfoByRefrigeratorInfo?.userName);
    }
  }, [addItemMethod, myInfoByRefrigeratorInfo, refrigeratorInfo, setValue]);

  return (
    <>
      <VStack
        flex={1}
        space="16px"
        h="100%"
        p="16px"
        borderRadius="10px"
        bgColor="white"
      >
        <Text size="2xl.bold">내 물건 추가하기</Text>

        <FormProvider {...addItemMethod}>
          <InputWrapper
            refrigeratorSpaceList={refrigeratorSpaceListData?.result}
            refrigeratorInfo={refrigeratorInfo}
            myInfoByRefrigeratorInfo={myInfoByRefrigeratorInfo}
            onPressImgUrlIcon={onPressImgUrlIcon}
          />
        </FormProvider>
      </VStack>

      <ImageSelectActionsheet
        isOpen={isOpenIconActionSheet}
        onClose={onCloseIconActionSheet}
        onPressSelectIcon={onPressSelectIcon}
      />

      <Flex p="16px" bgColor="white">
        <Button onPress={onPressAddItemButton} w="100%">
          <Text color="white" size="lg.bold">
            물건 추가하기
          </Text>
        </Button>
      </Flex>
    </>
  );
};

export default AddItemScreen;
