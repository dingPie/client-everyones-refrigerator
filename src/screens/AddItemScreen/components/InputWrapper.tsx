import React from 'react';

import {
  CheckIcon,
  Checkbox,
  ChevronDownIcon,
  HStack,
  Select,
  Text,
  VStack,
} from 'native-base';
import { Controller, useFormContext } from 'react-hook-form';

import { RefrigeratorSpaceItemType } from '@/apis/refrigerator-space/types/model/list-model';

import ColumnLabelWrapper from '@/components/#Atoms/ColumnLabelWrapper';
import RowLabelWrapper from '@/components/#Atoms/RowLabelWrapper';
import CustomInputController from '@/components/#Molecules/CustomInputController';

import { AddItemDataType } from '../useAddItemForm';

interface InputWrapperProps {
  refrigeratorSpaceList?: RefrigeratorSpaceItemType[];
}

const InputWrapper = ({ refrigeratorSpaceList }: InputWrapperProps) => {
  const { control } = useFormContext<AddItemDataType>();

  return (
    <VStack space="12px">
      <ColumnLabelWrapper label="추가할 냉장고 공간" isRequire>
        <Controller
          name="refrigeratorSpaceId"
          control={control}
          render={({ field: { onChange, value } }) => {
            return (
              <Select
                selectedValue={value}
                onValueChange={onChange}
                size="md"
                minWidth="144px"
                h="40px"
                bgColor="white"
                placeholder="보관 유형"
                _selectedItem={{
                  bg: 'primary.50',
                  endIcon: <CheckIcon size="5" />,
                }}
                dropdownIcon={<ChevronDownIcon size="4" mr="8px" />}
              >
                {refrigeratorSpaceList?.map((refrigeratorSpace) => {
                  return (
                    <Select.Item
                      key={refrigeratorSpace.id}
                      label={refrigeratorSpace.name}
                      value={refrigeratorSpace.id.toString()}
                      py="8px"
                    />
                  );
                })}
              </Select>
            );
          }}
        />
      </ColumnLabelWrapper>

      <RowLabelWrapper label="상품명" isRequire>
        <CustomInputController
          keyName={'name'}
          placeholder="이 냉장고 그룹의 이름"
        />
      </RowLabelWrapper>

      {/* P_TODO: 아이콘 input  추가해야 함. */}

      <RowLabelWrapper
        label="보관할 상품 갯수"
        isRequire
        boxProps={{
          py: '4px',
        }}
        labelProps={{
          w: 'auto',
        }}
      >
        <HStack
          w="144px"
          space="8px"
          justifyContent="flex-end"
          alignItems="center"
        >
          <CustomInputController
            keyName={'quantity'}
            keyboardType="numeric"
            placeholder="상품 갯수"
            w="120px"
            isShowError={false}
          />
          <Text>개</Text>
        </HStack>
      </RowLabelWrapper>

      <RowLabelWrapper
        label="내 이름 보이기"
        labelProps={{
          w: 'auto',
        }}
        boxProps={{
          justifyContent: 'space-between',
          h: '40px',
        }}
      >
        <Controller
          name="ownerName"
          control={control}
          render={({ field: { onChange, value } }) => {
            return (
              <Checkbox
                value=""
                isChecked={!!value}
                // P_TODO: 내 이름 넣어야 함.
                onChange={() => onChange(value ? '' : 'dd')}
                size="md"
                mr="-14px"
              >
                {''}
              </Checkbox>
            );
          }}
        />
      </RowLabelWrapper>

      <ColumnLabelWrapper label="간단한 설명">
        <CustomInputController
          keyName={'memo'}
          placeholder="최대 24 자 까지 입력이 가능합니다."
        />
      </ColumnLabelWrapper>
    </VStack>
  );
};

export default InputWrapper;
