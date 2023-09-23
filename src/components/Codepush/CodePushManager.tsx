import React from 'react';

import { Modal, useWindowDimensions } from 'react-native';

import { Box, Center, Text, View } from 'native-base';
import CodePush from 'react-native-code-push';

import { CodePushStatusType } from '@/hooks/useCodePush';

interface CodePushManagerProps {
  codePushStatus: CodePushStatusType;
  version?: string;
}
function CodePushManager({ codePushStatus, version }: CodePushManagerProps) {
  const { width } = useWindowDimensions();
  const overlayWidth = width - 40;
  const { downloadProgress, stat } = codePushStatus;

  return (
    <Center bgColor="primary.500" h="100%">
      <Modal transparent animationType={'slide'}>
        <View
          position="absolute"
          bottom={10}
          width="100%"
          flex={1}
          alignItems="center"
        >
          <Box
            flex={1}
            alignItems="center"
            justifyContent="center"
            borderRadius={20}
            backgroundColor="white"
            px="5px"
          >
            {stat === 1 ? (
              <Box h="5px" bgColor="lightgray" w={overlayWidth}>
                <Box h={5} w={`${downloadProgress} + %`} bgColor="gray.700" />
              </Box>
            ) : (
              <Box
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
                height="40px"
              >
                <Text color="black" fontSize="14px" ml="5px">
                  다운로드 완료, 재실행중...
                </Text>
              </Box>
            )}
          </Box>
          {/* <Text>{version}</Text> */}
        </View>
      </Modal>
    </Center>
  );
}

export default CodePush({
  checkFrequency: __DEV__
    ? CodePush.CheckFrequency.MANUAL
    : CodePush.CheckFrequency.ON_APP_RESUME,
})(CodePushManager);
