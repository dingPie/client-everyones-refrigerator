import React, { useCallback, useMemo } from 'react';

import { HStack, Pressable, Text, VStack, useDisclose } from 'native-base';
import { FormProvider } from 'react-hook-form';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useQueryClient } from '@tanstack/react-query';

import { useAuthLogoutMutation } from '@/apis/auth/auth-api.mutation';
import { useRefrigeratorUserJoinMutation } from '@/apis/refrigerator-user/refrigerator-user-api.mutation';
import {
  REFRIGERATOR_USER_API_QUERY_KEY,
  useGetMyRefrigeratorListQuery,
} from '@/apis/refrigerator-user/refrigerator-user-api.query';
import { MyRefrigeratorItemType } from '@/apis/refrigerator-user/types/model/my-refrigerator-list-model';

import useCustomModal from '@/contexts/Modal/useCustomModal';
import { useGlobalContext } from '@/contexts/global/useGlobalStoreContext';
import useCustomToast from '@/hooks/useCustomToast';
import useHandleError from '@/hooks/useHandleError';
import {
  CompositeScreenNavigationProp,
  IntroStackParamList,
} from '@/navigations/type';

import { deleteToken } from '@/utils/async-storage/token';

import JoinOtherRefrigeratorModal from './components/JoinOtherRefrigeratorModal';
import RefrigeratorCarousel from './components/RefrigeratorCarousel';
import useJoinRefrigeratorForm from './useJoinRefrigeratorForm';

type IntroNavigationProp = StackNavigationProp<IntroStackParamList>;

const SelectRefrigeratorScreen = () => {
  const navigation = useNavigation<IntroNavigationProp>();
  const mainNavigation = useNavigation<CompositeScreenNavigationProp>();

  const { dispatch } = useGlobalContext((ctx) => ctx);
  const queryClient = useQueryClient();
  const Modal = useCustomModal();
  const Toast = useCustomToast();
  const { handleApiError, handleFormError } = useHandleError();

  const joinRefrigeratorMethod = useJoinRefrigeratorForm();
  const { handleSubmit, getValues, reset } = joinRefrigeratorMethod;

  const { data: myRefrigeratorData } = useGetMyRefrigeratorListQuery({
    options: {
      onSuccess: (data) => {
        console.log(
          '내가 참여중인 냉장고 목록',
          data.result.myRefrigeratorList,
        );
      },
      onError: handleApiError,
    },
  });

  const myRefrigeratorList = useMemo(() => {
    const result = myRefrigeratorData?.result?.myRefrigeratorList || [];
    result.push({
      authority: 'admin',
      refrigerator: { id: -1, name: '추가용 카드' },
    });
    return result;
  }, [myRefrigeratorData]);

  const { mutate: refrigeratorUserJoinMutate } =
    useRefrigeratorUserJoinMutation({
      options: {
        retry: 1,
        onSuccess: (data) => {
          console.log('냉장고 참여 요청 성공', data.result);
          queryClient.invalidateQueries(
            REFRIGERATOR_USER_API_QUERY_KEY.GET_MY_REFRIGERATOR_LIST(),
          );
          onCloseJoinOtherRefrigeratorModal();
          Toast.show({
            title: '냉장고 참여 신청이 완료되었어요.',
            description: '해당 냉장고 관리자가 승인시 참여 가능해요.',
          });
          // P_TODO: alert 이나 toast 같은걸로 안내 하자.
        },
        onError: (err: any) => {
          Modal.show({
            title: '냉장고 참여 오류',
            content: err.response.data?.message,
            buttons: [
              {
                text: '닫기',
                isCancel: true,
              },
            ],
          });
        },
      },
    });

  const { mutate: authLogoutMutate } = useAuthLogoutMutation({
    options: {
      onSuccess: () => {
        dispatch({ type: 'LOGOUT' });
        deleteToken();
        Toast.show({
          title: '로그아웃 되었어요.',
        });
      },
      onError: handleApiError,
    },
  });

  const {
    isOpen: isOpenJoinOtherRefrigeratorModal,
    onOpen: onOpenJoinOtherRefrigeratorModal,
    onClose: onCloseJoinOtherRefrigeratorModal,
  } = useDisclose();

  const onPressMyRefrigeratorCard = useCallback(
    (refrigeratorItem: MyRefrigeratorItemType) => {
      mainNavigation.navigate('BottomTab');
      // P_TODO: Async Storage 로 바꿀 수 있음.
      dispatch({
        type: 'SET_REFRIGERATOR_ID',
        payload: refrigeratorItem.refrigerator.id,
      });
    },
    [dispatch, mainNavigation],
  );

  const onPressCreateRefrigeratorButton = useCallback(() => {
    navigation.navigate('CreateRefrigerator');
  }, [navigation]);

  const onPressJoinOtherRefrigeratorButton = useCallback(() => {
    onOpenJoinOtherRefrigeratorModal();
    reset();
  }, [onOpenJoinOtherRefrigeratorModal, reset]);

  const onPressJoinOtherRefrigeratorConfirm = useCallback(() => {
    refrigeratorUserJoinMutate(getValues());
  }, [getValues, refrigeratorUserJoinMutate]);

  const onClickLogoutButton = useCallback(() => {
    Modal.show({
      title: '로그아웃',
      content: '현재 계정에서 로그아웃 할까요?',
      buttons: [
        {
          text: '취소',
          isCancel: true,
        },
        {
          text: '로그아웃',
          onPress: () => {
            authLogoutMutate({});
            Modal.close();
          },
        },
      ],
    });
  }, [Modal, authLogoutMutate]);

  return (
    <>
      <VStack
        flex={1}
        h="100%"
        space="40px"
        justifyContent="center"
        alignItems="center"
        bgColor="primary.400"
        // bgColor="white"
      >
        <Text color="white" size="4xl.bold">
          냉장고 선택
        </Text>

        <RefrigeratorCarousel
          refrigeratorList={myRefrigeratorList}
          onPressMyRefrigeratorCard={onPressMyRefrigeratorCard}
          onPressCreateRefrigeratorButton={onPressCreateRefrigeratorButton}
          onPressJoinOtherRefrigeratorButton={
            onPressJoinOtherRefrigeratorButton
          }
        />

        <HStack justifyContent="flex-end" w="100%" px="32px">
          <Pressable onPress={onClickLogoutButton}>
            <Text size="lg.bold" color="gray.200">
              로그아웃
            </Text>
          </Pressable>
        </HStack>
      </VStack>
      <FormProvider {...joinRefrigeratorMethod}>
        <JoinOtherRefrigeratorModal
          isOpen={isOpenJoinOtherRefrigeratorModal}
          onClose={onCloseJoinOtherRefrigeratorModal}
          onPressJoinOtherRefrigeratorConfirm={
            onPressJoinOtherRefrigeratorConfirm
          }
        />
      </FormProvider>
    </>
  );
};

export default SelectRefrigeratorScreen;
