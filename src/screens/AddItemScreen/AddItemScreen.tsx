import React from 'react';

import { Box, Flex, FormControl, Text, VStack } from 'native-base';
import { FormProvider } from 'react-hook-form';

import { useNavigation } from '@react-navigation/core';
import { NavigationProp } from '@react-navigation/native';
import { useQueryClient } from '@tanstack/react-query';

import { useGetRefrigeratorSpaceListQuery } from '@/apis/refrigerator-space/refrigerator-space-api.query';

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
  const addItemMethod = useAddItemForm();
  const Toast = useCustomToast();

  const { refrigeratorId } = useGlobalContext((ctx) => ctx.state);

  const reactQuery = useQueryClient();
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

  return (
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
        {/* <VStack space="8px">
          <RowLabelWrapper label="냉장고 이름" isRequire>
            <CustomInputController
              keyName={'name'}
              placeholder="이 냉장고 그룹의 이름"
            />
          </RowLabelWrapper>
        </VStack> */}
        <InputWrapper
          refrigeratorSpaceList={refrigeratorSpaceListData?.result}
        />
      </FormProvider>
    </VStack>
  );
};

export default AddItemScreen;
