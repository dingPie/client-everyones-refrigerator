import React, { Dispatch, SetStateAction, memo } from 'react';

import { Checkbox, HStack, Text, VStack } from 'native-base';

import { RefrigeratorSpaceItemType } from '@/apis/refrigerator-space/types/model/list-model';

import RefrigeratorPurposeIcon from '@/components/#Atoms/RefrigeratorPurposeIcon';
import RefrigeratorShapeIcon from '@/components/#Atoms/RefrigeratorShapeIcon';

import { LABEL } from '@/constants/label';

interface HeaderInfoWrapperProps {
  refrigeratorSpaceInfo: RefrigeratorSpaceItemType;
  totalCount?: number;
  isMine: boolean;
  setIsMine: Dispatch<SetStateAction<boolean>>;
}

const HeaderInfoWrapper = ({
  refrigeratorSpaceInfo,
  totalCount = 0,
  isMine,
  setIsMine,
}: HeaderInfoWrapperProps) => {
  return (
    <VStack
      space="8px"
      bgColor="gray.300"
      borderRadius="8px"
      p="16px"
      mb="12px"
    >
      <HStack justifyContent="space-between" alignItems="center">
        <Text size="xl.bold"> {refrigeratorSpaceInfo.name} </Text>
      </HStack>
      <HStack space="16px" alignItems="center" justifyContent="flex-end">
        <HStack space="8px">
          <RefrigeratorPurposeIcon
            purposeType={refrigeratorSpaceInfo.purposeType}
            size={24}
            color="black"
          />
          <Text size="md.bold">
            {
              LABEL.REFRIGERATOR_SPACE.PURPOSE_TYPE[
                refrigeratorSpaceInfo.purposeType
              ]
            }
          </Text>
        </HStack>
        <HStack space="8px">
          <RefrigeratorShapeIcon
            shapeType={refrigeratorSpaceInfo.shapeType}
            size={24}
            color="black"
          />
          <Text size="md.bold">
            {
              LABEL.REFRIGERATOR_SPACE.SHAPE_TYPE[
                refrigeratorSpaceInfo.shapeType
              ]
            }
          </Text>
        </HStack>
      </HStack>

      <HStack justifyContent="space-between">
        <Text size="md.bold">현재 보관된 상품</Text>
        <Text size="md.bold">
          {`${totalCount} / ${refrigeratorSpaceInfo.maxCountPerSpace} 개`}
        </Text>
      </HStack>

      <HStack justifyContent="space-between">
        <Text size="md.bold">내 상품만 표시</Text>
        <Checkbox
          value=""
          isChecked={isMine}
          onChange={setIsMine}
          size="md"
          mr="-14px"
        >
          {''}
        </Checkbox>
      </HStack>

      {/* P_TODO: 추후 sort 기능 추가될 수 있음. */}
    </VStack>
  );
};

export default memo(HeaderInfoWrapper);
