import React, { useEffect, useState } from 'react';

import { GoogleSignin } from '@react-native-google-signin/google-signin';

import { useAuthRefreshMutation } from '@/apis/auth/auth-api.mutation';

import Splash from '@/components/Splash';
import { useGlobalContext } from '@/contexts/global/useGlobalStoreContext';
import withAppProvider from '@/hocs/withAppProvider';
import useFCMPermissionService from '@/hooks/useFCMPermissionService';
import useFCMWorkingService from '@/hooks/useFCMWorkingService';

import { MY_IMAGES } from '@/image';
import { flattenImageObject } from '@/utils/array/flatten-image-object';
import { getToken, setToken } from '@/utils/async-storage/token';
import { preLoadImage } from '@/utils/pre-load/pre-load-image';

import Navigations from './src/navigations';

/**
 *
 * @description 스플래시가 보여지는 시간을 활용하여
 * 앱 내의 필요한 작업을 하셔도 됩니다.
 */
function App() {
  const { dispatch } = useGlobalContext((ctx) => ctx);

  const [appIsReady, setAppIsReady] = useState(false);

  const { mutate: authRefreshMutate } = useAuthRefreshMutation({
    options: {
      onSuccess: (data, { refresh_token }) => {
        // P_TODO: 현재 임시로 accessToken은 두 곳에서 관리함.
        setToken({
          refreshToken: refresh_token,
          accessToken: data.accessToken,
        });
        dispatch({
          type: 'LOGIN',
          payload: data.accessToken,
        });
      },
      onError: (err) => {
        console.log('토큰 Refresh 에러: ', err);
      },
    },
  });

  useFCMPermissionService();
  useFCMWorkingService();

  // P_MEMO: google config
  GoogleSignin.configure({
    webClientId:
      '507352263432-flnmeesbeuvcigs02jpicnniaaun01ge.apps.googleusercontent.com',
  });

  useEffect(() => {
    if (appIsReady) return;
    const initRefreshToken = async () => {
      const token = await getToken();
      if (!token) return;
      authRefreshMutate({
        refresh_token: token.refreshToken,
      });
    };
    initRefreshToken();

    // P_TODO: 여기서 refresh로 검증가자.
    setTimeout(() => {
      setAppIsReady(true);
    }, 2000);
  }, [appIsReady]);

  useEffect(() => {
    async function prepare() {
      try {
        await preLoadImage(flattenImageObject(MY_IMAGES));
      } catch (e) {
        console.warn(e);
      }
    }
    prepare();
  }, []);

  return <>{appIsReady ? <Navigations /> : <Splash />}</>;
}

export default withAppProvider(App);
