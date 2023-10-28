import { useCallback, useEffect } from 'react';

import { Toast } from 'native-base';

import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';

import { LAYOUT } from '@/constants/layout';

function useFCMWorkingService() {
  const onNotificationOpenedApp = useCallback(() => {
    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
      // navigation.navigate(remoteMessage.data.type);
    });
  }, []);

  const getInitialNotification = useCallback(() => {
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
          // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
        }
        // setLoading(false);
      });
  }, []);

  const handleRemoteMessage = useCallback(
    (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
      const { body, title } = remoteMessage.notification || {};
      Toast.show({
        title: `${title}`,
        description: body,
        bgColor: 'white',
        _title: {
          color: 'gray.900',
          fontSize: 'lg',
          mb: '4px',
        },
        _description: {
          color: 'gray.900',
        },
        width: `${LAYOUT.WINDOW_WIDTH - 40}px`,
        placement: 'top',
      });
    },
    [],
  );

  useEffect(() => {
    const unsubscribe = messaging().onMessage(handleRemoteMessage);
    return unsubscribe;
  }, [handleRemoteMessage]);

  useEffect(() => {
    onNotificationOpenedApp();
    getInitialNotification();
  }, [onNotificationOpenedApp, getInitialNotification]);
}

export default useFCMWorkingService;
