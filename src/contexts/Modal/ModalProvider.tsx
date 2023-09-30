import React, { createContext, memo, useCallback, useState } from 'react';

import CommonModal, {
  CommonModalProps,
} from '@/components/@common/CommonModal';

interface OpenModalProps extends Omit<CommonModalProps, 'onClose'> {
  // modalKey?: string;
}

export type ModalContextType = {
  show: (props: OpenModalProps) => void;
  close: (modalKey?: string) => void;
};

export const ModalContext = createContext<ModalContextType>({
  show: () => null,
  close: () => null,
});

const ModalProvider = ({ children }: any) => {
  const [modalStateList, setModalStateList] = useState<OpenModalProps[]>([]);

  const show = useCallback((modalState: OpenModalProps) => {
    setModalStateList((prev) => [...prev, modalState]);
  }, []);

  const close = useCallback((modalKey?: string) => {
    if (modalKey) {
      setModalStateList((prev) => prev.filter((v) => v.modalKey !== modalKey));
    } else {
      setModalStateList([]);
    }
  }, []);

  return (
    <ModalContext.Provider
      value={{
        show,
        close,
      }}
    >
      {children}
      {modalStateList?.map((modalState, idx) => {
        return <CommonModal key={idx} {...modalState} onClose={close} />;
      })}
    </ModalContext.Provider>
  );
};

export default memo(ModalProvider);
