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
    <VStack space="16px" mb="40px">
      <Text size="2xl.bold">냉장고 기본 설정</Text>

      <VStack space="8px">
        <RowLabelWrapper label="냉장고 이름" isRequire>
          <CustomInputController keyName={'name'} />
        </RowLabelWrapper>

        <RowLabelWrapper label="냉장고 코드">
          <CustomInputController keyName={'code'} />
        </RowLabelWrapper>

        <RowLabelWrapper
          label="최대 보관 갯수"
          isRequire
          boxProps={{
            py: '4px',
          }}
        >
          <HStack
            w="124px"
            space="8px"
            justifyContent="flex-end"
            alignItems="center"
          >
            <CustomInputController
              keyName={'maxCountStoragePerUser'}
              keyboardType="numeric"
              placeholder="최대 1,000개"
              size="sm"
              w="100px"
              isShowError={false}
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
            w="124px"
            space="8px"
            justifyContent="flex-end"
            alignItems="center"
          >
            <CustomInputController
              keyName={'maxStoragePeriod'}
              keyboardType="numeric"
              placeholder="최대 30일"
              size="sm"
              w="100px"
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
