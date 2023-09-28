import React, { memo } from 'react';

import { ColorValue } from 'react-native';

import {
  usePropsWithComponentTheme,
  useStyledSystemPropsResolver,
} from 'native-base';
import { FillProps, SvgProps } from 'react-native-svg';

import { ColorType } from 'native-base/lib/typescript/components/types';

import * as Icons from '@/assets/icons';

export type IconsName = keyof typeof Icons;

export interface IconProps extends FillProps, Omit<SvgProps, 'color'> {
  name: IconsName;
  size?: number;
  color?: ColorType;
  fill?: ColorValue;
}
function CustomIcon({ name, size, color, fill, ...props }: IconProps) {
  const calculatedProps = usePropsWithComponentTheme(Icons[name], {
    width: `${size}px`,
    height: `${size}px`,
    fill,
    color,
    ...props,
  });

  const [style] = useStyledSystemPropsResolver(calculatedProps);
  const DefIcon = Icons[name];

  return (
    <DefIcon
      {...style}
      width={style.width || undefined}
      height={style.height || undefined}
    />
  );
}

export default memo(CustomIcon);
