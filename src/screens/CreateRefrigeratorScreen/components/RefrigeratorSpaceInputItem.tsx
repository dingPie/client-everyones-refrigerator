import React, { memo } from 'react';

import {
  ArrowDownIcon,
  Box,
  CheckIcon,
  ChevronDownIcon,
  CloseIcon,
  Flex,
  HStack,
  Pressable,
  Select,
  Text,
  VStack,
} from 'native-base';
import { Controller, useFormContext } from 'react-hook-form';

import RowLabelWrapper from '@/components/#Atoms/RowLabelWrapper';
import CustomInputController from '@/components/#Molecules/CustomInputController';

import { REFRIGERATOR_SPACE } from '@/constants/const';
import { LABEL } from '@/constants/label';
import {
  RefrigeratorSpacePurposeTypeType,
  RefrigeratorSpaceShapeTypeType,
} from '@/types/type';

import { CreateRefrigeratorFormDataType } from '../useCreateRefrigeratorForm';

interface RefrigeratorSpaceInputItemProps {
  index: number;
  onPressRemoveEmptyRefrigeratorButton: (index: number) => void;
}

const RefrigeratorSpaceInputItem = ({
  index,
  onPressRemoveEmptyRefrigeratorButton,
}: RefrigeratorSpaceInputItemProps) => {
  const { control } = useFormContext<CreateRefrigeratorFormDataType>();

  return (
    <VStack
      space="16px"
      p="16px"
      mb="16px"
      bgColor="primary.50"
      borderRadius="6px"
    >
      <HStack justifyContent="space-between" alignItems="center">
        <Text size="lg.bold"> {`${index + 1}번 칸`} </Text>
        <Pressable
          onPress={() => onPressRemoveEmptyRefrigeratorButton(index)}
          borderRadius="100px"
          bgColor="primary.300"
          p="6px"
          _pressed={{
            bgColor: 'primary.400',
          }}
        >
          <CloseIcon color="white" />
        </Pressable>
      </HStack>

      <VStack space="8px">
        <RowLabelWrapper label="냉장고 이름" isRequire>
          <CustomInputController
            keyName={`refrigeratorSpaceList.${index}.name`}
            size="sm"
          />
        </RowLabelWrapper>
        <RowLabelWrapper
          label="이 칸의 최대 보관 갯수"
          isRequire
          labelProps={{
            w: '160px',
          }}
        >
          <HStack
            w="124px"
            space="8px"
            justifyContent="flex-end"
            alignItems="center"
          >
            <CustomInputController
              keyName={`refrigeratorSpaceList.${index}.maxCountPerSpace`}
              keyboardType="numeric"
              placeholder="최대 1,000개"
              size="sm"
              w="100px"
              isShowError={false}
            />
            <Text>개</Text>
          </HStack>
        </RowLabelWrapper>

        {/* 보관유형 선택 */}
        <RowLabelWrapper
          label="보관 유형"
          isRequire
          labelProps={{
            w: '160px',
          }}
        >
          <Controller
            name={`refrigeratorSpaceList.${index}.purposeType`}
            control={control}
            render={({ field: { onChange, value } }) => {
              return (
                <Select
                  selectedValue={value}
                  onValueChange={onChange}
                  minWidth="124px"
                  h="40px"
                  bgColor="white"
                  placeholder="보관 유형"
                  _selectedItem={{
                    bg: 'primary.50',
                    endIcon: <CheckIcon size="5" />,
                  }}
                  dropdownIcon={<ChevronDownIcon size="4" mr="8px" />}
                >
                  {Object.values(REFRIGERATOR_SPACE.PURPOSE_TYPE).map(
                    (type) => {
                      return (
                        <Select.Item
                          key={type}
                          label={
                            LABEL.REFRIGERATOR_SPACE.PURPOSE_TYPE[
                              type as RefrigeratorSpacePurposeTypeType
                            ]
                          }
                          value={type}
                        />
                      );
                    },
                  )}
                </Select>
              );
            }}
          />
        </RowLabelWrapper>

        {/* 칸 형태 */}
        <RowLabelWrapper
          label="칸 형태"
          isRequire
          labelProps={{
            w: '160px',
          }}
        >
          <Controller
            name={`refrigeratorSpaceList.${index}.shapeType`}
            control={control}
            render={({ field: { onChange, value } }) => {
              return (
                <Select
                  selectedValue={value}
                  onValueChange={onChange}
                  minWidth="124px"
                  h="40px"
                  bgColor="white"
                  placeholder="칸 형태"
                  _selectedItem={{
                    bg: 'primary.50',
                    endIcon: <CheckIcon size="5" />,
                  }}
                  dropdownIcon={<ChevronDownIcon size="4" mr="8px" />}
                >
                  {Object.values(REFRIGERATOR_SPACE.SHAPE_TYPE).map((type) => {
                    return (
                      <Select.Item
                        key={type}
                        label={
                          LABEL.REFRIGERATOR_SPACE.SHAPE_TYPE[
                            type as RefrigeratorSpaceShapeTypeType
                          ]
                        }
                        value={type}
                      />
                    );
                  })}
                </Select>
              );
            }}
          />
        </RowLabelWrapper>
      </VStack>
    </VStack>
  );
};

export default memo(RefrigeratorSpaceInputItem);
