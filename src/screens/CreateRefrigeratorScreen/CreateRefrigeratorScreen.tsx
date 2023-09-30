import React, { useCallback } from 'react';

import { Box, Button, FlatList, Flex, Input, Text, VStack } from 'native-base';
import { FormProvider, useWatch } from 'react-hook-form';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { MainStackParamList } from '@/navigations/type';

import BaseSettingWrapper from './components/BaseSettingWrapper';
import RefrigeratorSpaceInputItem from './components/RefrigeratorSpaceInputItem';
import useCreateRefrigeratorForm, {
  emptyRefrigeratorSpaceItem,
} from './useCreateRefrigeratorForm';

type MainNavigationProp = StackNavigationProp<MainStackParamList>;

const CreateRefrigeratorScreen = () => {
  const navigation = useNavigation<MainNavigationProp>();

  const createRefrigeratorMethod = useCreateRefrigeratorForm();

  const refrigeratorSpaceList = useWatch({
    control: createRefrigeratorMethod.control,
    name: 'refrigeratorSpaceList',
  });

  const onPressAddEmptyRefrigeratorButton = useCallback(() => {
    const newList = [...refrigeratorSpaceList, emptyRefrigeratorSpaceItem];
    createRefrigeratorMethod.setValue('refrigeratorSpaceList', newList, {
      shouldValidate: true,
    });
  }, [createRefrigeratorMethod, refrigeratorSpaceList]);

  const onPressRemoveEmptyRefrigeratorButton = useCallback(
    (index: number) => {
      const removedList = refrigeratorSpaceList.filter(
        (_, idx) => index !== idx,
      );
      createRefrigeratorMethod.setValue('refrigeratorSpaceList', removedList, {
        shouldValidate: true,
      });
    },
    [createRefrigeratorMethod, refrigeratorSpaceList],
  );

  // 냉장고 생성 버튼
  const onPressCreateRefrigeratorButton = useCallback(() => {
    console.log('냉장고 생성');
  }, []);

  return (
    <FormProvider {...createRefrigeratorMethod}>
      <VStack flex={1} h="100%" bgColor="white">
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
              <BaseSettingWrapper />
              <Text size="2xl.bold" mb="16px">
                기본 설정
              </Text>
            </>
          )}
          ListFooterComponent={() => {
            return (
              <Button onPress={onPressAddEmptyRefrigeratorButton} py="4px">
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
          contentContainerStyle={{
            paddingHorizontal: 16,
          }}
        />

        <Flex p="16px">
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
