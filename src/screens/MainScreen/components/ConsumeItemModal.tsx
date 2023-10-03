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

interface ConsumeItemModalProps extends IModalProps {
  selectedItem: ItemInfoItemType | null;
  consumeNum: string;
  setConsumeNum: Dispatch<SetStateAction<string>>;
}

const ConsumeItemModal = ({
  selectedItem,
  consumeNum,
  setConsumeNum,
  ...props
}: ConsumeItemModalProps) => {
  const onClickPlusConsumeNum = useCallback(() => {
    setConsumeNum((prev) =>
      Number(prev) < (selectedItem?.storageQuantity || 0)
        ? (Number(prev) + 1).toString()
        : prev,
    );
  }, [selectedItem?.storageQuantity, setConsumeNum]);

  const onClickMinusConsumeNum = useCallback(() => {
    setConsumeNum((prev) =>
      Number(prev) > 1 ? (Number(prev) - 1).toString() : '1',
    );
  }, [setConsumeNum]);

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
              {`현재 보관중인 갯수${selectedItem?.storageQuantity || 0}`}
            </Text>
          </VStack>
          <HStack alignItems="center" space="8px">
            <HStack
              alignItems="center"
              borderRadius="4px"
              borderWidth="1px"
              borderColor="gray.300"
              bgColor="white"
              w="88px"
            >
              <Input
                value={consumeNum}
                onChangeText={setConsumeNum}
                keyboardType="numeric"
                borderWidth="0px"
                w="60px"
                h="48px"
                _focus={{
                  bgColor: 'white',
                }}
              />
              <VStack flex={1}>
                <Pressable onPress={onClickPlusConsumeNum}>
                  <HStack
                    bgColor="gray.50"
                    justifyContent="center"
                    alignItems="center"
                    w="28px"
                    h="24px"
                  >
                    <ChevronUpIcon size="4" w="100%" />
                  </HStack>
                </Pressable>

                <Pressable onPress={onClickMinusConsumeNum}>
                  <HStack
                    bgColor="gray.50"
                    justifyContent="center"
                    alignItems="center"
                    w="28px"
                    h="24px"
                  >
                    <ChevronDownIcon size="4" />
                  </HStack>
                </Pressable>
              </VStack>
            </HStack>

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
          <Button flex={1} fontSize="16px" py="12px">
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
