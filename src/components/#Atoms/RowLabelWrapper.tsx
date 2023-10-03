import React, { ReactNode, memo } from 'react';

import { Flex, HStack, IBoxProps, ITextProps, Text } from 'native-base';

import RequireStar from './RequireStar';

interface RowLabelWrapperProps {
  label: string;
  children: ReactNode;
  isRequire?: boolean;
  boxProps?: IBoxProps;
  labelProps?: ITextProps;
}

const RowLabelWrapper = ({
  label,
  children,
  isRequire,
  boxProps,
  labelProps,
}: RowLabelWrapperProps) => {
  return (
    <HStack
      space="40px"
      justifyContent="space-between"
      alignItems="center"
      w="100%"
      {...boxProps}
    >
      <HStack space="2px" w="100px" flexShrink={0} {...labelProps}>
        <Text size="md" color="gray.800" flexShrink={0}>
          {label}
        </Text>
        {isRequire && <RequireStar />}
      </HStack>
      {children}
    </HStack>
  );
};

export default memo(RowLabelWrapper);
