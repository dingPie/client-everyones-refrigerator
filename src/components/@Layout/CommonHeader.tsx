import React from 'react';

import { Pressable } from 'react-native';

import { Box, HStack, Image, Text } from 'native-base';

import { MY_IMAGES } from '@/image';

import CustomIcon from '../@common/CustomIcon';

interface CommonHeaderProps {
  text?: string | number;
  isBackButton?: boolean;
  isCloseButton?: boolean;
  onPress?: () => void;
}
function CommonHeader({
  text,
  isBackButton,
  isCloseButton = false,
  onPress,
}: CommonHeaderProps) {
  return (
    <HStack space={0} justifyContent="space-between">
      {isBackButton ? (
        <CustomIcon name="LeftArrowIconIcon" size={24} />
      ) : (
        <EmptyBox />
      )}
      <Text fontSize="lg" lineHeight="lg" fontWeight="bold">
        {text}
      </Text>
      {isCloseButton ? (
        <Pressable onPress={onPress}>
          <Image source={MY_IMAGES.X_ICON} w="24px" h="24px" alt="close-icon" />
        </Pressable>
      ) : (
        <EmptyBox />
      )}
    </HStack>
  );
}

export function EmptyBox() {
  return <Box w="24px" h="24px" />;
}

export default CommonHeader;
