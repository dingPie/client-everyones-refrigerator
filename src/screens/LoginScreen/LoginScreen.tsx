import React from 'react';

import { Pressable, Text, VStack } from 'native-base';

import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';

import { useAuthLoginMutation } from '@/apis/auth/auth-api.mutation';

import CustomIcon from '@/components/@common/CustomIcon';
import { useGlobalContext } from '@/contexts/global/useGlobalStoreContext';
import { AuthStackParamList } from '@/navigations/type';

import { setToken } from '@/utils/async-storage/token';

type LoginNavigationProps = StackNavigationProp<AuthStackParamList, 'Login'>;

const LoginScreen = () => {
  const navigation = useNavigation<LoginNavigationProps>();

  const { dispatch } = useGlobalContext((state) => state);

  const { mutate: loginMutate } = useAuthLoginMutation({
    options: {
      onSuccess: (data) => {
        dispatch({ type: 'LOGIN', payload: data.accessToken });
        setToken(data);
      },
      onError: (err) => {
        console.log('로그인 에러: ', err?.response);
      },
    },
  });

  const onPressGoogleLoginButton = async () => {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const result = await auth().signInWithCredential(googleCredential);
      const { uid, email } = result.user;
      const provider = result.additionalUserInfo?.providerId;

      // P_TODO: prod에서는 어떻게 되는지 확인해야 함.
      // P_TODO: 한번만 버튼 눌리게 막아야 함.

      if (provider && uid && email) {
        loginMutate({
          provider,
          userLoginId: email,
          providerUid: uid,
        });
      }
    } catch (err: any) {
      if (err.code === statusCodes.SIGN_IN_CANCELLED) {
        console.error('유저가 취소함.'); // 유저가 취소
      } else if (err.code === statusCodes.IN_PROGRESS) {
        console.error('절차 진행중');
      } else if (err.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.error('구글플레이 서비스 이용 불가?');
      } else {
        console.error('그 외에 에러', err);
      }
    }
  };

  return (
    <VStack
      flex={1}
      h="100%"
      px="24px"
      bgColor="secondary.400"
      alignItems="center"
      justifyContent="space-between"
    >
      <VStack space="40px" alignItems="center" mt="50%">
        {/* P_TODO: 아이콘, 폰트 나중에 바꾸기 */}
        <Text size="4xl.bold" color="white">
          모두의 냉장고
        </Text>
        <CustomIcon name="SolidRefrigerator" size={120} color="white" />
      </VStack>

      <VStack mb="20%" w="100%" space="8px">
        <Pressable
          onPress={async () => await onPressGoogleLoginButton()}
          flexDir="row"
          alignItems="center"
          bgColor="white"
          px="16px"
          py="12px"
          borderRadius="6px"
          shadow={4}
        >
          <CustomIcon name="GoogleLogo" size={18} />
          <Text size="md" fontWeight="500" color="gray.700" ml="32px">
            Google 로 시작하기
          </Text>
        </Pressable>
      </VStack>
    </VStack>
  );
};

export default LoginScreen;
