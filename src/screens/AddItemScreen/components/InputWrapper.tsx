import React from 'react';

import { Pressable } from 'react-native';

import {
  Box,
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
import CountInput from '@/components/#Atoms/CountInput';
import CustomFastImage from '@/components/#Atoms/CustomFastImage';
import RowLabelWrapper from '@/components/#Atoms/RowLabelWrapper';
import CustomInputController from '@/components/#Molecules/CustomInputController';

import { MY_IMAGES } from '@/image';

import { AddItemDataType } from '../useAddItemForm';

interface InputWrapperProps {
  refrigeratorSpaceList?: RefrigeratorSpaceItemType[];
  refrigeratorInfo?: MyRefrigeratorItemType;
  myInfoByRefrigeratorInfo?: MyInfoByRefrigeratorItemType;
  onPressImgUrlIcon: () => void;
}

const InputWrapper = ({
  refrigeratorSpaceList,
  refrigeratorInfo,
  myInfoByRefrigeratorInfo,
  onPressImgUrlIcon,
}: InputWrapperProps) => {
  const { control } = useFormContext<AddItemDataType>();

  return (
    <VStack space="20px">
      {/* 냉장고 공간 설정 selectbox */}
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
                h="48px"
                bgColor="white"
                placeholder="보관 유형"
                dropdownIcon={<ChevronDownIcon size="4" mr="8px" />}
                _selectedItem={{
                  bg: 'gray.100',
                  endIcon: <CheckIcon size="5" />,
                }}
                _actionSheetContent={{
                  color: 'gray.900',
                  bgColor: 'white',
                }}
                _item={{
                  _text: {
                    color: 'black',
                  },
                  bgColor: 'white',
                }}
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

      {/* 상품명 입력 */}
      <RowLabelWrapper label="상품명" isRequire>
        <CustomInputController
          keyName={'name'}
          placeholder="보관할 상품명 입력"
        />
      </RowLabelWrapper>

      {/* 현재는 몇가지 아이콘 중 이미지 선택 */}
      <RowLabelWrapper
        label="아이콘 선택"
        isRequire
        boxProps={{
          alignItems: 'flex-start',
        }}
      >
        <Controller
          name="imgUrl"
          control={control}
          render={({ field: { value } }) => {
            return (
              <Pressable onPress={onPressImgUrlIcon}>
                <Box
                  borderRadius="8px"
                  bgColor="gray.200"
                  size="80px"
                  p="6px"
                  mr="12px"
                >
                  <CustomFastImage
                    source={{
                      uri: value,
                    }}
                    fallbackSource={MY_IMAGES.EMPTY_PLUS}
                    resizeMode="stretch"
                    w="100%"
                    h="100%"
                  />
                </Box>
              </Pressable>
            );
          }}
        />
      </RowLabelWrapper>

      {/* 상품 갯수 추가 가능한 input */}
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
          <Controller
            name="quantity"
            control={control}
            render={({ field: { onChange, value } }) => {
              return (
                <HStack space="8px" alignItems="center">
                  <CountInput value={value} setValue={onChange} />
                  <Text>개</Text>
                </HStack>
              );
            }}
          />
        </HStack>
      </RowLabelWrapper>

      {/* 내 이름 보이기 checkbox */}
      <HStack space="40px" justifyContent="space-between" w="100%">
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
                bgColor="white"
                borderColor="gray.400"
                borderWidth="1px"
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
          maxLength={24}
        />
      </ColumnLabelWrapper>
    </VStack>
  );
};

export default InputWrapper;
