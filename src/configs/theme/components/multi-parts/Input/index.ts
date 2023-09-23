import { theme as baseTheme } from 'native-base';

import { sizes } from './sizes';
import { variants } from './variants';

export const Input = {
  sizes,
  variants: {
    ...baseTheme.components.Input.variants,
    variants,
  },
  baseStyle: {
    ...baseTheme.components.Input.baseStyle,
  },
  defaultProps: {
    ...baseTheme.components.Input.defaultProps,
  },
};
