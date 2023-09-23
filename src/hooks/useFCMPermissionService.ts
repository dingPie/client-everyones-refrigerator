import { useEffect } from 'react';

import messaging from '@react-native-firebase/messaging';

/**
 *
 * ios => GoogleService-Info.plist
 * android => google-services.json
 * 위의 두가지 파일은 프로젝트 마다 새로 셋팅되어야 합니다.
 *
 *
 * @see https://rnfirebase.io/
 * @see https://rnfirebase.io/messaging/usage
 *
 */

function useFCMService() {
  const getFCMToken = async () => {
    try {
      const token = await messaging().getToken();
    } catch (e) {
      console.log(e);
    }
  };

  const getAuthStatus = async () => {
    return await messaging().requestPermission();
  };

  const checkPermission = async () => {
    const authStatus = await getAuthStatus();
    return (
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL
    );
  };

  /** 토큰은 퍼미션을 허용 하지 않아도 발급 가능합니다. */
  const permissionWork = async () => {
    try {
      const isAuth = await checkPermission();
      if (isAuth) {
        getFCMToken();
      } else {
        getAuthStatus();
      }
    } catch (e) {
      console.log('permission rejected');
    }
  };

  // app push notification - permission
  useEffect(() => {
    permissionWork();
  }, []);
}

export default useFCMService;
