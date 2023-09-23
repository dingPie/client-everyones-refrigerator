import { useCallback, useEffect, useState } from 'react';

import CodePush, { DownloadProgress } from 'react-native-code-push';

export interface CodePushStatusType {
  stat: number;
  downloadProgress: number;
}

/**
 *
 * @see https://toktokhan.notion.site/ReactNative-CodePush-9ba2e1c9e8264347b32038862c230375
 * @see https://learn.microsoft.com/ko-kr/appcenter/distribution/codepush/rn-get-started
 *
 * 기본적인 셋팅은 전부 되어 있습니다. 위의 docs 를 참고하셔서,
 * appcenter를 통해 codepush key 값 발급 받은 후, 새로운 key 값으로 교체해주세요.
 */
function useCodePush() {
  const [isUpdating, setIsUpdating] = useState(false);
  const [codePushStatus, setCodePushStatus] = useState<CodePushStatusType>({
    stat: 0,
    downloadProgress: 0,
  });
  const [version, setVersion] = useState<string>();

  const handleCodePushStatusChange = useCallback(
    (status: CodePush.SyncStatus) => {
      switch (status) {
        case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
          console.log('Checking for updates.');
          break;
        case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
          setIsUpdating(true);
          setCodePushStatus({
            ...codePushStatus,
            stat: 1,
          });
          console.log('Downloading package.');
          break;
        case CodePush.SyncStatus.INSTALLING_UPDATE:
          console.log('Installing update.');
          break;
        case CodePush.SyncStatus.UP_TO_DATE:
          console.log('Up-to-date.');
          break;
        case CodePush.SyncStatus.AWAITING_USER_ACTION:
          setIsUpdating(false);
          break;
        case CodePush.SyncStatus.UPDATE_INSTALLED:
          console.log('Update installed.');
          setCodePushStatus({
            ...codePushStatus,
            stat: 2,
          });
          setIsUpdating(false);
          CodePush.restartApp();
          break;
      }
    },
    [codePushStatus],
  );

  const handleCodePushDownloadProgress = useCallback(
    (progress: DownloadProgress) => {
      setCodePushStatus({
        ...codePushStatus,
        downloadProgress: Math.floor(
          (progress.receivedBytes / progress.totalBytes) * 100,
        ),
      });
    },
    [codePushStatus],
  );

  useEffect(() => {
    if (__DEV__) return;

    async function getVersion() {
      const update = await CodePush.getUpdateMetadata();
      setVersion(`${update?.appVersion} (${update?.label})`);
    }
    getVersion();
  }, []);

  useEffect(() => {
    if (__DEV__) return;

    CodePush.sync(
      {
        updateDialog: {
          title: '새로운 업데이트가 존재합니다.',
          optionalUpdateMessage: '지금 업데이트 하시겠습니까?',
          optionalIgnoreButtonLabel: '다음에하기',
          optionalInstallButtonLabel: '업데이트',
          mandatoryUpdateMessage: '서비스 이용을 위해 업데이트가 필요합니다.',
          mandatoryContinueButtonLabel: '업데이트',
        },
        installMode: CodePush.InstallMode.IMMEDIATE,
        mandatoryInstallMode: CodePush.InstallMode.ON_NEXT_RESTART,
      },
      handleCodePushStatusChange,
      handleCodePushDownloadProgress,
    );
  }, [handleCodePushDownloadProgress, handleCodePushStatusChange]);

  return { isUpdating, codePushStatus, version };
}

export default useCodePush;
