import React from 'react';

import { Center, Image } from 'native-base';

import { MY_IMAGES } from '@/image';

import CustomFastImage from './#Atoms/CustomFastImage';

/**
 *
 * @description 애니메이션을 추가할 수 있습니다.
 * lottie, gif, RN 내장 라이브러리 Animated 등을 활용하시면 됩니다.
 */
const Splash = () => {
  return (
    <Center flex={1} bgColor="primary.500">
      {/* <Image
        source={require('@/assets/splash.gif')}
        alt="splash_logo"
        w="100px"
        h="100px"
      /> */}
      <CustomFastImage
        source={MY_IMAGES.REFRIGERATOR_LOGO_IMAGE}
        w="240px"
        h="360px"
        resizeMode="contain"
      />
    </Center>
  );
};

export default Splash;
