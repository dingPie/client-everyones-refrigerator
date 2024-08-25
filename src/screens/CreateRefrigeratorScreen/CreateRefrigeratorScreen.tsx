import React, { useCallback, useEffect } from 'react';

import { Box, Button, FlatList, Flex, Input, Text, VStack } from 'native-base';
import { FormProvider, useWatch } from 'react-hook-form';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { useRefrigeratorSpaceCreateListMutation } from '@/apis/refrigerator-space/refrigerator-space-api.mutation';
import { useRefrigeratorCreateMutation } from '@/apis/refrigerator/refrigerator-api.mutation';

import RowLabelWrapper from '@/components/#Atoms/RowLabelWrapper';
import CustomInputController from '@/components/#Molecules/CustomInputController';
import { useGlobalContext } from '@/contexts/global/useGlobalStoreContext';
import useCustomToast from '@/hooks/useCustomToast';
import useHandleError from '@/hooks/useHandleError';
import {
  CompositeScreenNavigationProp,
  MainStackParamList,
} from '@/navigations/type';

import {
  RefrigeratorSpacePurposeTypeType,
  RefrigeratorSpaceShapeTypeType,
} from '@/types/type';

import BaseSettingWrapper from './components/BaseSettingWrapper';
import RefrigeratorSpaceInputItem from './components/RefrigeratorSpaceInputItem';
import useCreateRefrigeratorForm, {
  emptyRefrigeratorSpaceItem,
} from './useCreateRefrigeratorForm';

type MainNavigationProp = StackNavigationProp<MainStackParamList>;

const CreateRefrigeratorScreen = () => {
  const navigation = useNavigation<MainNavigationProp>();
  const mainNavigation = useNavigation<CompositeScreenNavigationProp>();
  const { dispatch } = useGlobalContext((ctx) => ctx);
  const { handleApiError, handleFormError } = useHandleError();
  const Toast = useCustomToast();

  const createRefrigeratorMethod = useCreateRefrigeratorForm();
  const { control, getValues, setValue, handleSubmit } =
    createRefrigeratorMethod;

  const refrigeratorSpaceList = useWatch({
    control,
    name: 'refrigeratorSpaceList',
  });

  const { mutate: refrigeratorCreateMutate } = useRefrigeratorCreateMutation({
    options: {
      onSuccess: (data) => {
        // P_MEMO: 타입정의 및 maxStoragePeriod 합성
        const refrigeratorSpaceList = getValues('refrigeratorSpaceList').map(
          (v) => ({
            ...v,
            purposeType: v.purposeType as RefrigeratorSpacePurposeTypeType,
            shapeType: v.shapeType as RefrigeratorSpaceShapeTypeType,
            maxStoragePeriod: getValues('maxStoragePeriod'),
          }),
        );
        // P_MEMO: 냉장고 생성 후 칸도 생성 해줌
        refrigeratorSpaceCreateListMutate({
          refrigeratorId: data.result.id,
          refrigeratorSpaceList,
        });
      },
      onError: (err: any) => {
        console.log('냉장고 생성 에러', err.response.data?.message);
        handleApiError(err);
      },
    },
  });

  const { mutate: refrigeratorSpaceCreateListMutate } =
    useRefrigeratorSpaceCreateListMutation({
      options: {
        onSuccess: (data) => {
          mainNavigation.navigate('BottomTab');
          // P_TODO: Async Storage 로 바꿀 수 있음.
          dispatch({
            type: 'SET_REFRIGERATOR_ID',
            payload: data.result.refrigeratorId,
          });
          Toast.show({
            title: '새 냉장고 생성에 성공했어요.',
          });
        },
        onError: (err: any) => {
          console.log('냉장고 칸 목록 에러', err.response.data?.message);
          handleApiError(err);
        },
      },
    });

  const onPressAddEmptyRefrigeratorButton = useCallback(() => {
    const newList = [...refrigeratorSpaceList, emptyRefrigeratorSpaceItem];
    setValue('refrigeratorSpaceList', newList, {
      // shouldValidate: true,
    });
  }, [refrigeratorSpaceList, setValue]);

  const onPressRemoveEmptyRefrigeratorButton = useCallback(
    (index: number) => {
      const removedList = refrigeratorSpaceList.filter(
        (_, idx) => index !== idx,
      );
      setValue('refrigeratorSpaceList', removedList, {
        // shouldValidate: true,
      });
    },
    [refrigeratorSpaceList, setValue],
  );

  // 냉장고 생성 버튼
  const onPressCreateRefrigeratorButton = handleSubmit(async () => {
    refrigeratorCreateMutate({
      name: getValues('name'),
      code: getValues('code'),
      maxCountStoragePerUser: getValues('maxCountStoragePerUser'),
      isShowUserName: getValues('isShowUserName'),
      userName: getValues('userName'),
    });
  }, handleFormError);

  return (
    <FormProvider {...createRefrigeratorMethod}>
      <FlatList
        data={refrigeratorSpaceList}
        renderItem={({ item, index }) => {
          return (
            <RefrigeratorSpaceInputItem
              // key={index}
              index={index}
              onPressRemoveEmptyRefrigeratorButton={
                onPressRemoveEmptyRefrigeratorButton
              }
            />
          );
        }}
        keyExtractor={(_, index) => index.toString()}
        ListHeaderComponent={<BaseSettingWrapper />}
        ListFooterComponent={
          <Button
            onPress={onPressAddEmptyRefrigeratorButton}
            mx="16px"
            py="4px"
            shadow={4}
          >
            <Text color="white" size="4xl.bold">
              +
            </Text>
          </Button>
        }
        flex={1}
        py="24px"
        bgColor="white"
        ListFooterComponentStyle={{
          marginBottom: 40,
        }}
      />

      <Flex
        py="24px"
        px="16px"
        borderTopColor="gray.300"
        borderTopWidth="1px"
        bgColor="white"
      >
        <Button rounded="full" onPress={onPressCreateRefrigeratorButton}>
          <Text color="white" size="lg.bold">
            냉장고 생성
          </Text>
        </Button>
      </Flex>
    </FormProvider>
  );
};

export default CreateRefrigeratorScreen;
