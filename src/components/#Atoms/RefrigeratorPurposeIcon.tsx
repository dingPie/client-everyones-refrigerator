import React, { memo } from 'react';

import { RefrigeratorSpacePurposeTypeType } from '@/types/type';

import CustomIcon, { IconProps, IconsName } from '../@common/CustomIcon';

interface RefrigeratorPurposeIconProps extends Omit<IconProps, 'name'> {
  purposeType: RefrigeratorSpacePurposeTypeType;
}

const RefrigeratorPurposeIcon = ({
  purposeType,
  ...props
}: RefrigeratorPurposeIconProps) => {
  const iconName: Record<RefrigeratorSpacePurposeTypeType, IconsName> = {
    refrigeration: 'Water',
    freeze: 'Freeze',
    kimchi: 'Cabbage',
  };

  return <CustomIcon name={iconName[purposeType]} {...props} />;
};

export default memo(RefrigeratorPurposeIcon);
