import React, { useCallback, useEffect } from 'react';

import { Box, Button, FlatList, Flex, Input, Text, VStack } from 'native-base';
import { FormProvider, useWatch } from 'react-hook-form';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import RowLabelWrapper from '@/components/#Atoms/RowLabelWrapper';
import CustomInputController from '@/components/#Molecules/CustomInputController';
import useCustomToast from '@/hooks/useCustomToast';
import { MainStackParamList } from '@/navigations/type';

import BaseSettingWrapper from './components/BaseSettingWrapper';
import RefrigeratorSpaceInputItem from './components/RefrigeratorSpaceInputItem';
import useCreateRefrigeratorForm, {
  emptyRefrigeratorSpaceItem,
} from './useCreateRefrigeratorForm';

type MainNavigationProp = StackNavigationProp<MainStackParamList>;

const CreateRefrigeratorScreen = () => {
  const navigation = useNavigation<MainNavigationProp>();
  const Toast = useCustomToast();

  const createRefrigeratorMethod = useCreateRefrigeratorForm();

  const refrigeratorSpaceList = useWatch({
    control: createRefrigeratorMethod.control,
    name: 'refrigeratorSpaceList',
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
  const onPressCreateRefrigeratorButton = createRefrigeratorMethod.handleSubmit(
    async () => {
      console.log('냉장고 생성');
      const {
        formState: { errors, isValid },
        trigger,
      } = createRefrigeratorMethod;
      console.log('444');
      // if (!isValid) {
      // }

      await trigger();
      await trigger();

      console.log('$$$$$$$$$$$$', errors, isValid);
    },
  );

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
              <BaseSettingWrapper />

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
          // px="16px"
          // contentContainerStyle={{
          //   paddingHorizontal: 16,
          // }}
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
