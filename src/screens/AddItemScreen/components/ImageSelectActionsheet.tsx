import React, { memo } from 'react';

import { Actionsheet, Box, FlatList, Flex, Pressable, Text } from 'native-base';

import CustomFastImage from '@/components/#Atoms/CustomFastImage';

import { IMAGE_URL_LIST } from '@/constants/const';

interface ImageSelectActionsheetProps {
  isOpen: boolean;
  onClose: () => void;
  onPressSelectIcon: (imgUri: string) => void;
  imgUrlList?: { name: string; uri: string }[];
}

const ImageSelectActionsheet = ({
  isOpen,
  onClose,
  onPressSelectIcon,
  imgUrlList = IMAGE_URL_LIST,
}: ImageSelectActionsheetProps) => {
  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content h="200px" px="16px">
        <Flex w="100%" mb="24px">
          <Text size="lg.bold">아이콘 선택</Text>
        </Flex>
        <FlatList
          data={imgUrlList}
          horizontal
          renderItem={({ item }) => {
            return (
              <Pressable onPress={() => onPressSelectIcon(item.uri)}>
                <Box
                  borderRadius="8px"
                  bgColor="gray.200"
                  size="80px"
                  p="6px"
                  mr="12px"
                >
                  <CustomFastImage
                    source={{
                      uri: item.uri,
                    }}
                    resizeMode="stretch"
                    w="100%"
                    h="100%"
                  />
                </Box>
              </Pressable>
            );
          }}
        />
      </Actionsheet.Content>
    </Actionsheet>
  );
};

export default memo(ImageSelectActionsheet);
