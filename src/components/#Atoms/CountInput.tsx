import React, { Dispatch, SetStateAction, memo, useCallback } from 'react';

import { Pressable } from 'react-native';

import {
  ChevronDownIcon,
  ChevronUpIcon,
  HStack,
  Input,
  VStack,
} from 'native-base';

interface CountInputProps {
  value: string;
  setValue: (value: string) => void;
  max?: number;
}

const CountInput = ({ setValue, value, max = 10000 }: CountInputProps) => {
  const onClickPlusConsumeNum = useCallback(() => {
    setValue(Number(value) < max ? (Number(value) + 1).toString() : value);
  }, [max, setValue, value]);

  const onClickMinusConsumeNum = useCallback(() => {
    setValue(Number(value) > 1 ? (Number(value) - 1).toString() : '1');
  }, [setValue, value]);

  return (
    <HStack
      alignItems="center"
      borderRadius="4px"
      borderWidth="1px"
      borderColor="gray.300"
      bgColor="white"
      w="88px"
    >
      <Input
        value={value}
        onChangeText={setValue}
        keyboardType="numeric"
        borderWidth="0px"
        w="60px"
        h="48px"
        size="md"
        color="black"
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
  );
};

export default memo(CountInput);
