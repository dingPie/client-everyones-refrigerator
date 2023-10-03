import React, { useMemo } from 'react';

import { StyleProp } from 'react-native';

import { Factory, Image, StyledProps } from 'native-base';
import FastImage, {
  FastImageProps,
  ImageStyle,
  Source,
} from 'react-native-fast-image';

import { MY_IMAGES } from '@/image';

const FactoryFastImage = Factory<FastImageProps>(FastImage);

type CustomFastImageProps = Pick<
  FastImageProps,
  'resizeMode' | 'defaultSource' | 'fallback'
> &
  Omit<StyledProps, 'tintColor'> & {
    source?: Source | number;
    fallbackSource?: Source | number;
    fallbackType?: 'USER' | 'ARTWORK';
    style?: StyleProp<Omit<ImageStyle, 'overflow'>>;
    children?: JSX.Element | JSX.Element[];
  };

const CustomFastImage = ({
  source,
  fallbackSource,
  children,
  ...props
}: CustomFastImageProps) => {
  const sourceMemo = useMemo(() => {
    if (typeof source === 'object' && !source.uri) {
      if (fallbackSource) return fallbackSource;
      return MY_IMAGES.SALAD;
    }
    return source;
  }, [source, fallbackSource]);

  return (
    <FactoryFastImage {...props} source={sourceMemo}>
      {children}
    </FactoryFastImage>
  );
};

export default CustomFastImage;
