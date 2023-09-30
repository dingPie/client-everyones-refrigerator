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
        <Modal.Content p="24px">
          <VStack justifyContent="space-between" space="30px">
            <Text size="xl.bold" {...titleProps}>
              {title}
            </Text>

            {!!content && (
              <Text size="md" color="gray.700" {...contentProps}>
                {content}
              </Text>
            )}

            <HStack justifyContent="flex-end" space="10px" w="100%" mt="10px">
              {!!buttons?.length &&
                buttons?.map((button, idx) => (
                  <Button
                    key={idx + button?.text}
                    variant={button.isCancel ? 'outline' : 'solid'}
                    onPress={
                      button.isCancel ? () => onClose(modalKey) : button.onPress
                    }
                    {...button.buttonStyle}
                  >
                    <Text
                      size="md.bold"
                      color={
                        button.isCancel
                          ? 'primary.500'
                          : button.buttonStyle?.color
                          ? button.buttonStyle?.color
                          : 'white'
                      }
                    >
                      {button.text}
                    </Text>
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
