import React, { ReactNode, memo } from 'react';

import { Flex, HStack, IBoxProps, ITextProps, Text, VStack } from 'native-base';

import RequireStar from './RequireStar';

interface ColumnLabelWrapperProps {
  label: string;
  children: ReactNode;
  isRequire?: boolean;
  boxProps?: IBoxProps;
  labelProps?: ITextProps;
}

const ColumnLabelWrapper = ({
  label,
  children,
  isRequire,
  boxProps,
  labelProps,
}: ColumnLabelWrapperProps) => {
  return (
    <VStack space="8px" {...boxProps}>
      <HStack space="2px" {...labelProps}>
        <Text size="md" color="gray.800">
          {label}
        </Text>
        {isRequire && <RequireStar />}
      </HStack>
      {children}
    </VStack>
  );
};

export default memo(ColumnLabelWrapper);
