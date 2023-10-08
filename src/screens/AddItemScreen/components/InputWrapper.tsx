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
import { MyInfoByRefrigeratorItemType } from '@/apis/refrigerator-user/types/model/my-info-by-refrigerator-model';
import { MyRefrigeratorItemType } from '@/apis/refrigerator/types/model/by-id-model';

import ColumnLabelWrapper from '@/components/#Atoms/ColumnLabelWrapper';
import RowLabelWrapper from '@/components/#Atoms/RowLabelWrapper';
import CustomInputController from '@/components/#Molecules/CustomInputController';

import { AddItemDataType } from '../useAddItemForm';

interface InputWrapperProps {
  refrigeratorSpaceList?: RefrigeratorSpaceItemType[];
  refrigeratorInfo?: MyRefrigeratorItemType;
  myInfoByRefrigeratorInfo?: MyInfoByRefrigeratorItemType;
}

const InputWrapper = ({
  refrigeratorSpaceList,
  refrigeratorInfo,
  myInfoByRefrigeratorInfo,
}: InputWrapperProps) => {
  const { control } = useFormContext<AddItemDataType>();

  console.log('$$$$$$$$$$ 어디보자', refrigeratorInfo);

  return (
    <VStack space="20px">
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

      <HStack
        space="40px"
        justifyContent="space-between"
        // alignItems="center"
        w="100%"
      >
        <VStack w="auto" space="4px">
          <Text size="lg" color="gray.800">
            내 이름 보이기
          </Text>
          <Text size="sm" color="gray.700">
            {
              '냉장고 관리자가 이름 표시를 설정해놓았다면\n모든 사용자의 이름이 공개돼요'
            }
          </Text>
        </VStack>
        <Controller
          name="ownerName"
          control={control}
          render={({ field: { onChange, value } }) => {
            return (
              <Checkbox
                value=""
                isChecked={!!value}
                onChange={() =>
                  onChange(value ? '' : myInfoByRefrigeratorInfo?.userName)
                }
                isDisabled={refrigeratorInfo?.isShowUserName}
                size="md"
                mr="-14px"
              >
                {''}
              </Checkbox>
            );
          }}
        />
      </HStack>

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
