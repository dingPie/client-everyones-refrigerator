import { useContext } from 'react';

import { ModalContext } from './ModalProvider';

const useCustomModal = () => {
  const { show, close } = useContext(ModalContext);

  return {
    show,
    close,
  };
};
export default useCustomModal;
