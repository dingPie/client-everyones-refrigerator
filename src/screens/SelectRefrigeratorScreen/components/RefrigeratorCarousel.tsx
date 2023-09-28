import React, { memo } from 'react';

import { Box, Flex, HStack, Pressable, Text } from 'native-base';
import Carousel from 'react-native-reanimated-carousel';

import { LAYOUT } from '@/constants/layout';

interface RefrigeratorCarouselProps {
  refrigeratorList: any[];
  // viewerImageIdx: number;
  // setViewerImageIdx: any;
}

const RefrigeratorCarousel = ({
  refrigeratorList,
}: // viewerImageIdx,
// setViewerImageIdx,
RefrigeratorCarouselProps) => {
  return (
    <Carousel
      loop={false}
      data={refrigeratorList}
      width={LAYOUT.WINDOW_WIDTH}
      height={LAYOUT.WINDOW_HEIGHT * 0.6}
      mode="parallax"
      modeConfig={{
        parallaxAdjacentItemScale: 0.8,
        parallaxScrollingScale: 0.95,
        parallaxScrollingOffset: 80,
      }}
      panGestureHandlerProps={{ activeOffsetX: [-10, 10] }}
      renderItem={({ item }) => {
        return (
          <Pressable
            flex={1}
            alignSelf={'center'}
            justifyContent="center"
            py="20px"
          >
            <Flex
              key={item.id}
              flex={1}
              width={LAYOUT.WINDOW_WIDTH * 0.85}
              height={LAYOUT.WINDOW_HEIGHT * 0.5}
              borderRadius={'16px'}
              bgColor="red.100"
              shadow={5}
            >
              <Text>dddd</Text>
            </Flex>
          </Pressable>
        );
      }}
    />
  );
};

export default memo(RefrigeratorCarousel);
