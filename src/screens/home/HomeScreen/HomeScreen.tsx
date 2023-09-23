import React from 'react';

import { Box, Button, Input } from 'native-base';

import { useNavigation } from '@react-navigation/core';

import CustomIcon from '@/components/@common/CustomIcon';
import { HomeStackScreenProps } from '@/navigations/stack/home/types/home-stack-param-list';

/** Composite Screen type
 * eg)
 * 1. with hooks
 *   const navigation = useNavigation<HomeTabScreenProps<'Home'>['navigation']>();
 *   const route = useRoute<HomeTabScreenProps<'Home'>['route']>();
 * 2. with props
 *  const HomeScreen = ({ navigation, route }: HomeTabScreenProps<'Home'>) => {
 *  // ..
 *  }
 */
const HomeScreen = () => {
  const navigation =
    useNavigation<HomeStackScreenProps<'Home'>['navigation']>();

  return (
    <Box
      flex={1}
      h="100%"
      borderRadius="10px"
      borderColor="white"
      color="primary.400"
    >
      <CustomIcon name="LeftArrowIconIcon" size={24} />
      <Button
        onPress={() => navigation.navigate('Count')}
        bgColor="primary.500"
        _text={{
          fontWeight: 800,
        }}
      >
        Go to CountScreen
      </Button>
      <Button colorScheme="kakao" variant="solid">
        Kakao Login Button
      </Button>
      <Input variant="outline" />
    </Box>
  );
};

export default HomeScreen;
