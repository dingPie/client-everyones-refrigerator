import { FieldErrors } from 'react-hook-form';

import useCustomToast from './useCustomToast';

const useHandleError = () => {
  const Toast = useCustomToast();

  const handleFormError = (err: FieldErrors<any>) => {
    const targetError = Object.values(err);
    if (targetError.length) {
      Toast.show({
        status: 'error',
        title: targetError[0]?.message as string,
      });
      return;
    }
  };

  const handleApiError = (err: any) => {
    const targetError = Object.values(err);
    if (targetError.length) {
      Toast.show({
        status: 'error',
        title: err.response.data?.message,
      });
      return;
    }
  };

  return { handleFormError, handleApiError };
};

export default useHandleError;
