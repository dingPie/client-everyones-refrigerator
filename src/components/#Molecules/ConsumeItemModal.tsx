import React, { Dispatch, SetStateAction, memo, useCallback } from 'react';

import {
  Button,
  ChevronDownIcon,
  ChevronUpIcon,
  HStack,
  IModalProps,
  Input,
  Modal,
  Pressable,
  Text,
  VStack,
} from 'native-base';

import { ItemInfoItemType } from '@/apis/item/types/model/list-by-space-model';

import { LAYOUT } from '@/constants/layout';

import CountInput from '../#Atoms/CountInput';

interface ConsumeItemModalProps extends IModalProps {
  selectedItem: ItemInfoItemType | null;
  consumeNum: string;
  setConsumeNum: Dispatch<SetStateAction<string>>;
  onPressConsumeItemConfirmButton: () => void;
}

const ConsumeItemModal = ({
  selectedItem,
  consumeNum,
  setConsumeNum,
  onPressConsumeItemConfirmButton,
  ...props
}: ConsumeItemModalProps) => {
  return (
    <Modal size="xl" {...props}>
      <Modal.Content p="24px" bgColor="white">
        {/* header */}
        <VStack bgColor="white" mb="24px">
          <Text size="2xl.bold">이 상품을 소비했나요?</Text>
        </VStack>

        {/* body */}
        <HStack alignItems="center" justifyContent="space-between" mb="32px">
          <VStack space="4px">
            <Text
              size="lg.bold"
              maxW={LAYOUT.WINDOW_WIDTH - 220 + 'px'}
              noOfLines={2}
            >
              {selectedItem?.name}
            </Text>
            <Text color="gray.700">
              {`현재 보관중인 갯수: ${selectedItem?.storageQuantity || 0} 개`}
            </Text>
          </VStack>
          <HStack alignItems="center" space="8px">
            <CountInput
              value={consumeNum}
              setValue={setConsumeNum}
              max={selectedItem?.storageQuantity}
            />

            <Text>개</Text>
          </HStack>
        </HStack>

        <HStack space="8px">
          <Button
            onPress={props.onClose}
            flex={1}
            fontSize="16px"
            py="12px"
            variant="outline"
            _pressed={{
              bgColor: 'gray.100',
            }}
          >
            <Text size="md.bold" color="gray.800">
              아니요
            </Text>
          </Button>
          <Button
            onPress={onPressConsumeItemConfirmButton}
            flex={1}
            fontSize="16px"
            py="12px"
          >
            <Text size="md.bold" color="white">
              네, 소비했어요
            </Text>
          </Button>
        </HStack>
      </Modal.Content>
    </Modal>
  );
};

export default memo(ConsumeItemModal);
