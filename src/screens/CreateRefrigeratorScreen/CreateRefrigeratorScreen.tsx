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
  const Toast = useCustomToast();

  const createRefrigeratorMethod = useCreateRefrigeratorForm();

  const refrigeratorSpaceList = useWatch({
    control: createRefrigeratorMethod.control,
    name: 'refrigeratorSpaceList',
  });

  const { mutate: refrigeratorCreateMutate } = useRefrigeratorCreateMutation({
    options: {
      onSuccess: (data) => {
        const { getValues } = createRefrigeratorMethod;
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
        Toast.show({
          title: err.response.data?.message || '',
          status: 'error',
        });
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
          Toast.show({
            title: err.response.data?.message || '',
            status: 'error',
          });
        },
      },
    });

  const onPressAddEmptyRefrigeratorButton = useCallback(() => {
    const newList = [...refrigeratorSpaceList, emptyRefrigeratorSpaceItem];
    createRefrigeratorMethod.setValue('refrigeratorSpaceList', newList, {
      // shouldValidate: true,
    });
  }, [createRefrigeratorMethod, refrigeratorSpaceList]);

  const onPressRemoveEmptyRefrigeratorButton = useCallback(
    (index: number) => {
      const removedList = refrigeratorSpaceList.filter(
        (_, idx) => index !== idx,
      );
      createRefrigeratorMethod.setValue('refrigeratorSpaceList', removedList, {
        // shouldValidate: true,
      });
    },
    [createRefrigeratorMethod, refrigeratorSpaceList],
  );

  // 냉장고 생성 버튼
  const onPressCreateRefrigeratorButton = useCallback(async () => {
    const {
      getValues,
      formState: { errors, isValid },
      trigger,
    } = createRefrigeratorMethod;

    if (!isValid) {
      Toast.show({
        title: '누락된 값이 있습니다.',
        status: 'error',
        alertProps: { bottom: '60px' },
      });
    }

    await trigger();

    refrigeratorCreateMutate({
      name: getValues('name'),
      code: getValues('code'),
      maxCountStoragePerUser: getValues('maxCountStoragePerUser'),
      isShowUserName: getValues('isShowUserName'),
      userName: getValues('userName'),
    });
  }, [Toast, createRefrigeratorMethod, refrigeratorCreateMutate]);

  return (
    <FormProvider {...createRefrigeratorMethod}>
      <VStack flex={1} h="100%">
        <FlatList
          data={refrigeratorSpaceList}
          renderItem={({ item, index }) => {
            return (
              <RefrigeratorSpaceInputItem
                key={index}
                index={index}
                onPressRemoveEmptyRefrigeratorButton={
                  onPressRemoveEmptyRefrigeratorButton
                }
              />
            );
          }}
          keyExtractor={(_, index) => index.toString()}
          ListHeaderComponent={() => (
            <>
              {/* 상단 냉장고 기본 설정 */}
              <BaseSettingWrapper />
              {/* 중단 냉장고에서 사용할 내 이름 설정 */}
              <RowLabelWrapper
                label="이 그룹에서 내 이름"
                isRequire
                boxProps={{
                  p: '20px',
                  mb: '32px',
                  alignItems: 'flex-start',
                  borderBottomColor: 'gray.100',
                  borderBottomWidth: '6px',
                }}
                labelProps={{ w: 'auto', pt: '10px' }}
              >
                <CustomInputController
                  keyName={`userName`}
                  placeholder="이 그룹에서 설정할 내 이름"
                />
              </RowLabelWrapper>

              <Text size="2xl.bold" px="16px" mb="16px">
                냉장고 칸 별 설정
              </Text>
            </>
          )}
          ListFooterComponent={() => {
            return (
              <Button
                onPress={onPressAddEmptyRefrigeratorButton}
                mx="16px"
                py="4px"
              >
                <Text color="white" size="4xl.bold">
                  +
                </Text>
              </Button>
            );
          }}
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
      </VStack>
    </FormProvider>
  );
};

export default CreateRefrigeratorScreen;
