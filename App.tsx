import React, { useEffect, useState } from 'react';

import Splash from '@/components/Splash';
import withAppProvider from '@/hocs/withAppProvider';
import useFCMPermissionService from '@/hooks/useFCMPermissionService';
import useFCMWorkingService from '@/hooks/useFCMWorkingService';

import { MY_IMAGES } from '@/image';
import { flattenImageObject } from '@/utils/array/flatten-image-object';
import { preLoadImage } from '@/utils/pre-load/pre-load-image';

import Navigations from './src/navigations';

/**
 *
 * @description 스플래시가 보여지는 시간을 활용하여
 * 앱 내의 필요한 작업을 하셔도 됩니다.
 */
function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  useFCMPermissionService();
  useFCMWorkingService();

  useEffect(() => {
    if (!appIsReady) {
      setTimeout(() => {
        setAppIsReady(true);
      }, 2000);
    }
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
