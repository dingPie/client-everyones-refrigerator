import React from 'react';

import { IModalProps, Modal, StyledProps } from 'native-base';

interface ModalBasisProps extends Omit<IModalProps, 'children'> {
  header?: string | JSX.Element;
  body?: string | JSX.Element;
  footer?: string | JSX.Element;

  headerProps?: StyledProps;
  bodyProps?: StyledProps;
  footerProps?: StyledProps;
}

export default function ModalBasis({
  header,
  body,
  footer,

  headerProps,
  bodyProps,
  footerProps,
  ...props
}: ModalBasisProps) {
  return (
    <Modal {...props}>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header {...headerProps}>{header}</Modal.Header>
        <Modal.Body {...bodyProps}>{body}</Modal.Body>
        <Modal.Footer {...footerProps}> {footer}</Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
