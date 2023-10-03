import React, { memo } from 'react';

import { RefrigeratorSpaceShapeTypeType } from '@/types/type';

import CustomIcon, { IconProps, IconsName } from '../@common/CustomIcon';

interface RefrigeratorShapeIconProps extends Omit<IconProps, 'name'> {
  shapeType: RefrigeratorSpaceShapeTypeType;
}

const RefrigeratorShapeIcon = ({
  shapeType,
  ...props
}: RefrigeratorShapeIconProps) => {
  const iconName: Record<RefrigeratorSpaceShapeTypeType, IconsName> = {
    door: 'Door',
    shelf: 'Shelf',
    drawer: 'Drawer',
  };

  return <CustomIcon name={iconName[shapeType]} {...props} />;
};

export default memo(RefrigeratorShapeIcon);
