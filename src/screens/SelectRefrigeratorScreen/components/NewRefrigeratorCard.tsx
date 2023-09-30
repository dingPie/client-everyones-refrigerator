import React, { memo } from 'react';

import { Box, Button, Text, VStack } from 'native-base';

import CustomIcon from '@/components/@common/CustomIcon';

import { LAYOUT } from '@/constants/layout';

interface NewRefrigeratorCardProps {
  onPressCreateRefrigeratorButton: () => void;
  onPressJoinOtherRefrigeratorButton: () => void;
  isCanNew?: boolean;
}

const NewRefrigeratorCard = ({
  isCanNew = true,
  onPressCreateRefrigeratorButton,
  onPressJoinOtherRefrigeratorButton,
}: NewRefrigeratorCardProps) => {
  return (
    <Box flex={1} alignSelf={'center'} justifyContent="center">
      <VStack
        flex={1}
        alignItems="center"
        justifyContent="space-between"
        space="40px"
        width={LAYOUT.WINDOW_WIDTH * 0.85}
        height={LAYOUT.WINDOW_HEIGHT * 0.5}
        pt="60px"
        pb="60px"
        px="24px"
        borderRadius={'16px'}
        bgColor="white"
        shadow={5}
      >
        <Text size="2xl.bold">
          {isCanNew
            ? '새로운 냉장고에 참여하세요!'
            : '너무 많은 냉장고에 참여했어요!'}
        </Text>

        <VStack space="24px" alignItems="center" w="100%">
          <CustomIcon name="TruckRefrigerator" size={80} color="primary.600" />
          <VStack space="12px" w="100%">
            {isCanNew ? (
              <>
                <Button
                  onPress={onPressCreateRefrigeratorButton}
                  bgColor="primary.500"
                  w="100%"
                >
                  <Text size="md.bold" color="white">
                    새 냉장고 만들기
                  </Text>
                </Button>
                <Button
                  onPress={onPressJoinOtherRefrigeratorButton}
                  variant="outline"
                  borderWidth="2px"
                  borderColor="primary.500"
                  w="100%"
                >
                  <Text size="md.bold" color="primary.500">
                    다른 냉장고 참여하기
                  </Text>
                </Button>
              </>
            ) : (
              <Text size="md" textAlign="center">
                {
                  '최대 5개의 냉장고까지 생성 및 참여할 수 있어요.\n다른 냉장고에 가입하고 싶다면 기존 냉장고를 제거해주세요!'
                }
              </Text>
            )}
          </VStack>
        </VStack>
      </VStack>
    </Box>
  );
};

export default memo(NewRefrigeratorCard);
