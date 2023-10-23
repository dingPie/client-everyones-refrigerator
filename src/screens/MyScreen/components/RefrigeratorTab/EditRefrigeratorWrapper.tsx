import React from 'react';

import { Checkbox, Text, VStack } from 'native-base';
import { Controller, useFormContext } from 'react-hook-form';

import { MyRefrigeratorItemType } from '@/apis/refrigerator/types/model/by-id-model';

import RowLabelWrapper from '@/components/#Atoms/RowLabelWrapper';
import CustomInputController from '@/components/#Molecules/CustomInputController';

import { EditRefrigeratorDataType } from '../../useEditRefrigeratorForm';

interface EditRefrigeratorWrapperProps {
  isEditRefrigerator: boolean;
  maxStoragePeriod?: number;
  refrigeratorInfo?: MyRefrigeratorItemType;
}

const EditRefrigeratorWrapper = ({
  isEditRefrigerator,
  maxStoragePeriod,
  refrigeratorInfo,
}: EditRefrigeratorWrapperProps) => {
  const method = useFormContext<EditRefrigeratorDataType>();
  const { control } = method;

  return (
    <VStack flex={1} space="16px" p="16px" borderRadius="8px" bgColor="white">
      <RowLabelWrapper
        label="냉장고 이름"
        boxProps={{
          height: '40px',
        }}
      >
        {isEditRefrigerator ? (
          <CustomInputController
            keyName={'name'}
            placeholder="냉장고 이름"
            h="40px"
          />
        ) : (
          <Text size="lg.bold">{refrigeratorInfo?.name}</Text>
        )}
      </RowLabelWrapper>
      <RowLabelWrapper
        label="냉장고 코드"
        boxProps={{
          height: '40px',
        }}
      >
        {isEditRefrigerator ? (
          <CustomInputController
            keyName={'code'}
            placeholder="냉장고 코드"
            h="40px"
            maxLength={6}
          />
        ) : (
          <Text size="lg.bold">{refrigeratorInfo?.code}</Text>
        )}
      </RowLabelWrapper>
      {/* P_MEMO: 최대보관기간, 최대 보관 갯수는 이전항목에 대한 유효성이 들어가야 하기 떄문에 일단 수정 불가능하게 막아둠. */}
      <RowLabelWrapper label="최대 보관 기간">
        <Text size="lg.bold">{maxStoragePeriod} 일</Text>
      </RowLabelWrapper>
      <RowLabelWrapper label="최대 보관 갯수">
        <Text size="lg.bold">
          {refrigeratorInfo?.maxCountStoragePerUser} 개
        </Text>
      </RowLabelWrapper>

      <RowLabelWrapper label="유저 이름 표시 여부" labelProps={{ w: 'auto' }}>
        {isEditRefrigerator ? (
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
        ) : (
          <Text size="lg.bold">
            {refrigeratorInfo?.isShowUserName ? '표시' : '미표시'}
          </Text>
        )}
      </RowLabelWrapper>
    </VStack>
  );
};

export default EditRefrigeratorWrapper;
