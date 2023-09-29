import React, { ReactNode, memo } from 'react';

import {
  Box,
  Button,
  Flex,
  HStack,
  IModalProps,
  IPressableProps,
  ITextProps,
  Modal, // Modal,
  Pressable,
  Text,
  VStack,
  useDisclose,
} from 'native-base';

// import { ModalDataProps } from './ModalProvider';

interface ModalButtonProps {
  text: string;
  onPress?: () => void;
  buttonStyle?: IPressableProps;
  isCancel?: boolean;
}

export interface CommonModalProps
  extends Omit<IModalProps, 'children' | 'isOpen' | 'onClose'> {
  onClose: (modalId?: string) => void;
  modalKey?: string;
  title?: string;
  content?: ReactNode;
  titleProps?: ITextProps;
  contentProps?: ITextProps;
  buttons?: ModalButtonProps[];
  component?: ReactNode;
}

const CommonModal = ({
  onClose,
  modalKey,
  title,
  content,
  component,
  buttons,
  titleProps,
  contentProps,
  ...props
}: CommonModalProps) => {
  return (
    <Modal isOpen={true} onClose={() => onClose(modalKey)} {...props}>
      {component ? (
        component
      ) : (
        <Modal.Content py="20px" px="24px">
          <VStack justifyContent="space-between" space="36px">
            <VStack space="15px">
              <Text size="xl.bold" {...titleProps}>
                {title}
              </Text>
              {!!content && (
                <Text
                  size="md"
                  color="gray.700"
                  textAlign="center"
                  {...contentProps}
                >
                  {content}
                </Text>
              )}
            </VStack>
            <HStack space="10px" w="100%">
              {!!buttons?.length &&
                buttons?.map((button, idx) => (
                  <Button
                    key={idx + button?.text}
                    w="100%"
                    variant={button.isCancel ? 'outline' : 'solid'}
                    onPress={
                      button.isCancel ? () => onClose(modalKey) : button.onPress
                    }
                    {...button.buttonStyle}
                  >
                    {button.text}
                  </Button>
                ))}
            </HStack>
          </VStack>
        </Modal.Content>
      )}
    </Modal>
  );
};

export default memo(CommonModal);
