import React, { memo } from 'react';

import {
  Button,
  HStack,
  IModalProps,
  Modal, // Modal,
  Text,
  VStack,
} from 'native-base';
import { Controller, useFormContext } from 'react-hook-form';

import CustomInput from '@/components/#Atoms/CustomInput';

import { JoinRefrigeratorFormDataType } from '../useJoinRefrigeratorForm';

interface JoinOtherRefrigeratorModalProps extends IModalProps {
  onPressJoinOtherRefrigeratorConfirm: () => void;
}

const JoinOtherRefrigeratorModal = ({
  onPressJoinOtherRefrigeratorConfirm,
  ...props
}: JoinOtherRefrigeratorModalProps) => {
  const method = useFormContext<JoinRefrigeratorFormDataType>();
  const { control, formState } = method;

  return (
    <Modal {...props}>
      <Modal.Content p="24px">
        <VStack justifyContent="space-between" space="30px">
          <Text size="lg.bold">냉장고 코드를 입력하여 참여하세요</Text>

          <VStack space="16px">
            <VStack space="8px">
              <Text color="gray.800">냉장고 코드</Text>
              <Controller
                name="refrigeratorCode"
                control={control}
                render={({ field: { onChange, value } }) => {
                  return (
                    <CustomInput
                      placeholder="AAAAAA_1"
                      value={value}
                      onChangeText={onChange}
                    />
                  );
                }}
              />
              {!!formState.errors.refrigeratorCode && (
                <Text size="sm" color="warning.500">
                  {formState.errors.refrigeratorCode?.message}
                </Text>
              )}
            </VStack>

            <VStack space="8px">
              <Text color="gray.800">참여할 이름</Text>
              <Controller
                name="userName"
                control={control}
                render={({ field: { onChange, value } }) => {
                  return (
                    <CustomInput
                      placeholder="이름을 입력해주세요"
                      value={value}
                      onChangeText={onChange}
                    />
                  );
                }}
              />
              {!!formState.errors.userName && (
                <Text size="sm" color="warning.500">
                  {formState.errors.userName?.message}
                </Text>
              )}
            </VStack>
          </VStack>

          <HStack space="10px" w="100%" justifyContent="flex-end">
            <Button
              onPress={props.onClose}
              bgColor="gray.300"
              borderRadius="8px"
              _pressed={{
                bgColor: 'gray.400',
              }}
            >
              <Text size="md.bold">취소</Text>
            </Button>
            <Button
              onPress={onPressJoinOtherRefrigeratorConfirm}
              borderRadius="8px"
            >
              <Text size="md.bold" color="white">
                참여 신청
              </Text>
            </Button>
          </HStack>
        </VStack>
      </Modal.Content>
    </Modal>
  );
};

export default memo(JoinOtherRefrigeratorModal);
