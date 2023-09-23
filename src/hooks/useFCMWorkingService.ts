import React, { useCallback } from 'react';

import { Alert } from 'react-native';

import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';

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
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    },
    [],
  );

  React.useEffect(() => {
    const unsubscribe = messaging().onMessage(handleRemoteMessage);
    return unsubscribe;
  }, [handleRemoteMessage]);

  React.useEffect(() => {
    onNotificationOpenedApp();
    getInitialNotification();
  }, [onNotificationOpenedApp, getInitialNotification]);
}

export default useFCMWorkingService;
