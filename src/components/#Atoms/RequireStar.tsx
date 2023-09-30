import React, { memo } from 'react';

import { Text } from 'native-base';

const RequireStar = () => {
  return (
    <Text color="warning.500" ml="2px">
      *
    </Text>
  );
};

export default memo(RequireStar);
