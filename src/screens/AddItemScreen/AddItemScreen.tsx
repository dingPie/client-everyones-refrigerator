import React, { useEffect, useMemo } from 'react';

import { Pressable } from 'react-native';

import {
  Actionsheet,
  Box,
  FlatList,
  Flex,
  FormControl,
  HStack,
  Text,
  VStack,
  useDisclose,
} from 'native-base';
import { FormProvider } from 'react-hook-form';

import { useNavigation } from '@react-navigation/core';
import { NavigationProp } from '@react-navigation/native';
import { useQueryClient } from '@tanstack/react-query';

import { useGetRefrigeratorSpaceListQuery } from '@/apis/refrigerator-space/refrigerator-space-api.query';
import { useGetMyInfoByRefrigeratorQuery } from '@/apis/refrigerator-user/refrigerator-user-api.query';
import { REFRIGERATOR_API_QUERY_KEY } from '@/apis/refrigerator/refrigerator-api.query';
import { MyRefrigeratorItemType } from '@/apis/refrigerator/types/model/by-id-model';
import { ApiResponseType } from '@/apis/type';

import RowLabelWrapper from '@/components/#Atoms/RowLabelWrapper';
import CustomInputController from '@/components/#Molecules/CustomInputController';
import { useGlobalContext } from '@/contexts/global/useGlobalStoreContext';
import useCustomToast from '@/hooks/useCustomToast';
import { HomeStackParamList } from '@/navigations/type';

import InputWrapper from './components/InputWrapper';
import useAddItemForm from './useAddItemForm';

type AddItemNavigationProps = NavigationProp<HomeStackParamList, 'AddItem'>;

const AddItemScreen = () => {
  const navigation = useNavigation<AddItemNavigationProps>();
  const reactQuery = useQueryClient();
  const addItemMethod = useAddItemForm();
  const Toast = useCustomToast();

  const { refrigeratorId } = useGlobalContext((ctx) => ctx.state);

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

  // P_MEMO: 냉장고 정보는 거의 불변성을 지니는 정보기 때문에 API 호출이 아닌 getData 사용
  const refrigeratorInfo = useMemo(
    () =>
      reactQuery.getQueriesData<ApiResponseType<MyRefrigeratorItemType>>(
        REFRIGERATOR_API_QUERY_KEY.GET_BY_ID({
          id: refrigeratorId || -1,
        }),
      )[0][1]?.result,
    [reactQuery, refrigeratorId],
  );

  const { data: refrigeratorSpaceListData } = useGetRefrigeratorSpaceListQuery({
    variables: {
      refrigeratorId: refrigeratorId || -1,
    },
    options: {
      enabled: !!refrigeratorId,
      onSuccess: (data) => {
        console.log('$######## 냉장고 정보', data);
      },
      onError: (err: any) => {
        console.log(
          '$######## 냉장고 정보 불러오기 에러',
          err.response.data?.message,
        );

        Toast.show({
          title: err.response.data?.message || '',
          status: 'error',
        });
      },
    },
  });

  const {
    isOpen: isOpenIconActionSheet,
    onClose: onCloseIconActionSheet,
    onOpen: onOpenIconActionSheet,
  } = useDisclose();

  // P_MEMO: 이 이름 보이기 외에도 해야될게 있다면 여기서 init 해줌.
  useEffect(() => {
    if (refrigeratorInfo?.isShowUserName && myInfoByRefrigeratorInfo) {
      addItemMethod.setValue('ownerName', myInfoByRefrigeratorInfo?.userName);
    }
  }, [addItemMethod, myInfoByRefrigeratorInfo, refrigeratorInfo]);

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
        <Text size="3xl.bold">내 물건 추가하기</Text>

        <FormProvider {...addItemMethod}>
          <InputWrapper
            refrigeratorSpaceList={refrigeratorSpaceListData?.result}
            refrigeratorInfo={refrigeratorInfo}
            myInfoByRefrigeratorInfo={myInfoByRefrigeratorInfo}
          />
        </FormProvider>
      </VStack>

      <Actionsheet
        // isOpen={isOpenIconActionSheet}
        isOpen={true}
        onClose={onCloseIconActionSheet}
      >
        <Actionsheet.Content h="200px" px="16px">
          <Flex w="100%" mb="24px">
            <Text size="lg.bold">아이콘 선택</Text>
          </Flex>
          <FlatList
            data={[1, 2, 3, 4, 5]}
            horizontal
            renderItem={({ item }) => (
              // P_TODO: URL 선택 이벤트 넣어야 함.
              // P_TODO: 그리고..나중엔 이미지 업로드 같은걸로 해야지...
              <Pressable>
                <Box bgColor="primary.200" boxSize="100px" mr="16px">
                  <Text>{item} </Text>
                </Box>
              </Pressable>
            )}
          />
        </Actionsheet.Content>
      </Actionsheet>
    </>
  );
};

export default AddItemScreen;
