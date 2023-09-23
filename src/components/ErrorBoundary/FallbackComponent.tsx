import React from 'react';

import { useWindowDimensions } from 'react-native';

import { Button, Center, Text } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';

export interface FallbackComponentProps {
  error: Error;
  resetError: () => void;
}

/**
 *
 * 에러 시 fallback 컴포넌트 입니다.
 */
function FallbackComponent({ error, resetError }: FallbackComponentProps) {
  const { height } = useWindowDimensions();
  return (
    <SafeAreaView
      style={{
        backgroundColor: 'white',
        height: '100%',
      }}
    >
      <Center mt={height / 4}>
        <Text fontSize="2xl" lineHeight="2xl" fontWeight="bold" mt="5px">
          앗! 일시적 오류가 발생했어요!
        </Text>
        <Text fontSize="md" lineHeight="md" color="gray.700" mt="3px">
          잠시 후에 다시 시도 해 주세요.
        </Text>
        <Button
          mt="20px"
          onPress={resetError}
          bgColor="primary.500"
          w="112px"
          h="35px"
          p={0}
          _text={{
            color: 'white',
            fontSize: 'md',
            lineHeight: 'md',
          }}
        >
          다시 시도하기
        </Button>
      </Center>
    </SafeAreaView>
  );
}

export default FallbackComponent;
