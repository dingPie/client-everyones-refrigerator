import React from 'react';

import { StyleSheet } from 'react-native';

import { Box, Spinner } from 'native-base';

import { useIsFetching, useIsMutating } from '@tanstack/react-query';

const GlobalLoading = () => {
  const isFetching = useIsFetching({
    // P_TODO: 예외처리 추후 확인
    predicate: (query) => {
      return true;
    },
  });

  const isMutating = useIsMutating();

  if (!!isFetching || !!isMutating)
    return (
      <Box
        style={StyleSheet.absoluteFill}
        justifyContent="center"
        alignItems="center"
      >
        <Spinner
          size="lg"
          color="black"
          accessibilityLabel="Loading posts"
          shadow="0"
        />
      </Box>
    );
  return null;
};

export default GlobalLoading;
