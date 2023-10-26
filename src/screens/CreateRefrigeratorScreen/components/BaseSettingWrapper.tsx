import React from 'react';

import { Checkbox, HStack, Text, VStack } from 'native-base';
import { Controller, useFormContext } from 'react-hook-form';

import RowLabelWrapper from '@/components/#Atoms/RowLabelWrapper';
import CustomInputController from '@/components/#Molecules/CustomInputController';

import { CreateRefrigeratorFormDataType } from '../useCreateRefrigeratorForm';

interface BaseSettingWrapperProps {}

const BaseSettingWrapper = ({}: BaseSettingWrapperProps) => {
  const { control } = useFormContext<CreateRefrigeratorFormDataType>();

  return (
    <VStack
      space="16px"
      pb="20px"
      mb="12px"
      px="16px"
      bgColor="white"
      borderBottomColor="gray.100"
      borderBottomWidth="6px"
    >
      <Text size="2xl.bold">그룹 기본 설정</Text>

      <VStack space="8px">
        <RowLabelWrapper label="냉장고 이름" isRequire>
          <CustomInputController
            keyName={'name'}
            placeholder="냉장고 그룹 이름"
            maxLength={20}
          />
        </RowLabelWrapper>

        <RowLabelWrapper label="냉장고 코드">
          <CustomInputController
            keyName={'code'}
            placeholder="영문 대문자 6자리"
            autoCapitalize="characters"
            numberOfLines={1}
            maxLength={6}
          />
        </RowLabelWrapper>

        <RowLabelWrapper
          label="최대 보관 갯수"
          isRequire
          boxProps={{
            py: '4px',
          }}
        >
          <HStack
            w="144px"
            space="8px"
            justifyContent="flex-end"
            alignItems="center"
          >
            <CustomInputController
              keyName={'maxCountStoragePerUser'}
              keyboardType="numeric"
              placeholder="최대 999"
              w="120px"
              isShowError={false}
              maxLength={3}
            />
            <Text>개</Text>
          </HStack>
        </RowLabelWrapper>

        <RowLabelWrapper
          label="최대 보관 일"
          isRequire
          boxProps={{
            py: '4px',
          }}
        >
          <HStack
            w="144px"
            space="8px"
            justifyContent="flex-end"
            alignItems="center"
          >
            <CustomInputController
              keyName={'maxStoragePeriod'}
              keyboardType="numeric"
              placeholder="최대 30"
              maxLength={2}
              w="120px"
              isShowError={false}
            />
            <Text>일</Text>
          </HStack>
        </RowLabelWrapper>

        <RowLabelWrapper
          label="보관한 사람 이름 공개"
          labelProps={{
            w: 'auto',
          }}
          boxProps={{
            justifyContent: 'space-between',
            h: '40px',
          }}
        >
          <Controller
            name="isShowUserName"
            control={control}
            render={({ field: { onChange, value } }) => {
              return (
                <Checkbox
                  value=""
                  isChecked={value}
                  onChange={onChange}
                  size="md"
                  mr="-14px"
                  bgColor="white"
                  borderColor="gray.400"
                  borderWidth="1px"
                >
                  {''}
                </Checkbox>
              );
            }}
          />
        </RowLabelWrapper>
      </VStack>
    </VStack>
  );
};

export default BaseSettingWrapper;
