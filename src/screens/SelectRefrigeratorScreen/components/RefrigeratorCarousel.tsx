import React, { memo } from 'react';

import Carousel from 'react-native-reanimated-carousel';

import { MyRefrigeratorItemType } from '@/apis/refrigerator-user/types/model/my-refrigerator-list-model';

import { LAYOUT } from '@/constants/layout';

import MyRefrigeratorCard from './MyRefrigeratorCard';
import NewRefrigeratorCard from './NewRefrigeratorCard';

interface RefrigeratorCarouselProps {
  refrigeratorList: MyRefrigeratorItemType[];
  onPressMyRefrigeratorCard: (refrigeratorItem: MyRefrigeratorItemType) => void;
  onPressCreateRefrigeratorButton: () => void;
  onPressJoinOtherRefrigeratorButton: () => void;
}

const RefrigeratorCarousel = ({
  refrigeratorList,
  onPressMyRefrigeratorCard,
  onPressCreateRefrigeratorButton,
  onPressJoinOtherRefrigeratorButton,
}: RefrigeratorCarouselProps) => {
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
      renderItem={({ item, index }) => {
        return item.refrigerator.id === -1 ? (
          <NewRefrigeratorCard
            key={-1}
            isCanNew={refrigeratorList.length !== 6} // P_TODO: 상수분리 예정
            onPressCreateRefrigeratorButton={onPressCreateRefrigeratorButton}
            onPressJoinOtherRefrigeratorButton={
              onPressJoinOtherRefrigeratorButton
            }
          />
        ) : (
          <MyRefrigeratorCard
            key={item.refrigerator.id}
            refrigeratorItem={item}
            onPressMyRefrigeratorCard={onPressMyRefrigeratorCard}
          />
        );
      }}
    />
  );
};

export default memo(RefrigeratorCarousel);
