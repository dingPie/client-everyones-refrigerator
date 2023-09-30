import React from 'react';

import {
  Alert,
  CloseIcon,
  HStack,
  IAlertProps,
  IconButton,
  Text,
  VStack,
  useToast,
} from 'native-base';

interface ToastComponentProps {
  title: string;
  description?: string;
  alertProps?: IAlertProps;
}

const useCustomToast = () => {
  const toast = useToast();

  const ToastComponent = ({
    title,
    description,
    ...props
  }: ToastComponentProps) => (
    <Alert
      maxW="90%"
      h="auto"
      status="success"
      mx="20px"
      bgColor="primary.100"
      {...props}
    >
      <HStack w="100%" justifyContent="space-between" alignItems="flex-start">
        <HStack space="16px" flexShrink={1}>
          <Alert.Icon mt="4px" />
          <VStack>
            <Text size="md.bold" color="coolGray.800">
              {title}
            </Text>
            {!!description && (
              <Text size="md" color="coolGray.800">
                {description}
              </Text>
            )}
          </VStack>
        </HStack>
        <IconButton
          position="absolute"
          top="-5px"
          right="00px"
          variant="unstyled"
          icon={<CloseIcon size="3" />}
          onPress={() => toast.closeAll()}
        />
      </HStack>
    </Alert>
  );

  const showToast = (props: ToastComponentProps) => {
    toast.show({ render: () => <ToastComponent {...props} /> });
  };
  const Toast = { show: showToast };

  return Toast;
};

export default useCustomToast;
