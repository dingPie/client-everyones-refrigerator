import React, { useMemo } from 'react';

import { IInputProps, Input } from 'native-base';

export interface CustomInputProps
  extends Omit<IInputProps, 'variant' | 'size'> {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'underline' | 'outline';
}

const CustomInput = ({
  size = 'md',
  variant = 'outline',
  ...props
}: CustomInputProps) => {
  const baseStyle = {
    bgColor: 'white',
  };

  const sizeStyle = useMemo(() => {
    switch (size) {
      case 'sm':
        return { fontSize: 'sm', h: '40px' };
      case 'md':
        return { fontSize: 'md', h: '48px' };
      case 'lg':
        return { fontSize: 'lg', h: '60px' };
      default:
        return { h: '48px' };
    }
  }, [size]);

  const variantStyle = useMemo(() => {
    switch (variant) {
      case 'underline':
        return {
          borderWidth: '0px',
          borderBottomWidth: '1px',
          borderBottomColor: 'gray.400',
          borderRadius: '0px',
          _focus: {
            borderColor: 'gray.500',
          },
        };
      case 'outline':
        return {
          borderWidth: '1px',
          borderColor: 'gray.400',
          _focus: {
            borderColor: 'gray.500',
          },
        };
      default:
        return {};
    }
  }, [variant]);

  return (
    <Input
      color="gray.900"
      placeholderTextColor="gray.600"
      {...baseStyle}
      {...sizeStyle}
      {...variantStyle}
      {...props}
    />
  );
};

export default CustomInput;
