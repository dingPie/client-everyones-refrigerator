import { theme as baseTheme } from 'native-base';

export const ActionsheetContent = {
  baseStyle: {
    ...baseTheme.components.ActionsheetContent.baseStyle,
    textDecoration: 'none',
    _dragIndicator: {
      mt: '10px',
      bgColor: 'gray.200',
    },
  },
  defaultProps: {},
  sizes: {},
  variants: {},
};
