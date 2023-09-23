import React from 'react';

import { NativeBaseProvider } from 'native-base';
import FlipperAsyncStorage from 'rn-flipper-async-storage-advanced';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import CodePushManager from '@/components/Codepush/CodePushManager';
import { GlobalStoreProvider } from '@/contexts/global/useGlobalStoreContext';
import useCodePush from '@/hooks/useCodePush';

import theme from '@/configs/theme';

function withAppProvider<T extends React.ComponentType<any>>(AppComponent: T) {
  return function WrappedAppComponent(props: React.ComponentProps<T>) {
    const queryClient = new QueryClient();
    const { isUpdating, codePushStatus, version } = useCodePush();

    if (__DEV__) {
      import('react-query-native-devtools').then(({ addPlugin }) => {
        addPlugin({ queryClient });
      });
    }

    return (
      <QueryClientProvider client={queryClient}>
        <NativeBaseProvider theme={theme}>
          {isUpdating ? (
            <CodePushManager
              codePushStatus={codePushStatus}
              version={version}
            />
          ) : (
            <GlobalStoreProvider>
              <AppComponent {...props} />
            </GlobalStoreProvider>
          )}
          <FlipperAsyncStorage />
        </NativeBaseProvider>
      </QueryClientProvider>
    );
  };
}

export default withAppProvider;
