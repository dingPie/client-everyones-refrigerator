import React, { memo, useMemo } from 'react';

import { Flex, Text } from 'native-base';

import { LABEL } from '@/constants/label';
import { RefrigeratorUserAuthorityType } from '@/types/type';

interface AuthorityBadgeProps {
  authority: RefrigeratorUserAuthorityType;
}

const AuthorityBadge = ({ authority }: AuthorityBadgeProps) => {
  const bgColor = useMemo(() => {
    if (authority === 'admin') {
      return 'primary.700';
    } else if (authority === 'manager') {
      return 'primary.500';
    } else if (authority === 'normal') {
      return 'primary.300';
    } else {
      return 'gray.300';
    }
  }, [authority]);

  return (
    <Flex
      alignItems="center"
      px="10px"
      py="6px"
      bgColor={bgColor}
      borderRadius="8px"
    >
      <Text color={authority !== 'waiting' ? 'white' : 'gray.800'}>
        {LABEL.USER.AUTHORITY[authority]}
      </Text>
    </Flex>
  );
};

export default memo(AuthorityBadge);
