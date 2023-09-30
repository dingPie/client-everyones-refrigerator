import React from 'react';

import { Checkbox, HStack, Text, VStack } from 'native-base';

import CustomInput from '@/components/#Atoms/CustomInput';
import RowLabelWrapper from '@/components/#Atoms/RowLabelWrapper';

interface BaseSettingWrapperProps {}

const BaseSettingWrapper = ({}: BaseSettingWrapperProps) => {
  return (
    <VStack space="16px" px="16px">
      <Text size="2xl.bold">기본 설정</Text>

      <VStack space="8px">
        <RowLabelWrapper label="냉장고 이름" isRequire>
          <CustomInput flex={1} placeholder="이 냉장고의 이름" />
        </RowLabelWrapper>
        <RowLabelWrapper label="냉장고 코드">
          <CustomInput flex={1} placeholder="AAAAAA 형식의 대문자 6자리" />
        </RowLabelWrapper>
        <RowLabelWrapper
          label="최대 보관 갯수"
          isRequire
          boxProps={{
            py: '4px',
          }}
        >
          <HStack
            flex={1}
            space="8px"
            justifyContent="flex-end"
            alignItems="center"
          >
            <CustomInput
              keyboardType="numeric"
              placeholder="최대 1,000개"
              w="100px"
              size="sm"
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
            flex={1}
            space="8px"
            justifyContent="flex-end"
            alignItems="center"
          >
            <CustomInput
              keyboardType="numeric"
              placeholder="최대 30일"
              w="100px"
              size="sm"
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
          <Checkbox value={''} size="md" />
        </RowLabelWrapper>
      </VStack>
    </VStack>
  );
};

export default BaseSettingWrapper;
