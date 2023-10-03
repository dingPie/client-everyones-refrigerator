export const normalStyle = {
  title: {
    fontSize: '50px',
    lineHeight: '100px',
    fontWeight: '700',
  },
  '4xl': {
    fontSize: '36px',
    lineHeight: '40px',
  },
  '3xl': {
    fontSize: '30px',
    lineHeight: '36px',
  },
  '2xl': {
    fontSize: '24px',
    lineHeight: '32px',
  },
  xl: {
    fontSize: '20px',
    lineHeight: '30px',
  },
  lg: {
    fontSize: '18px',
    lineHeight: '27px',
  },
  md: {
    fontSize: '16px',
    lineHeight: '24px',
  },
  sm: {
    fontSize: '15px',
    lineHeight: '21px',
  },
  xs: {
    fontSize: '14px',
    lineHeight: '18px',
  },
};

export const boldStyle = {
  '4xl.bold': {
    ...normalStyle['4xl'],
    fontWeight: '700',
  },
  '3xl.bold': {
    ...normalStyle['3xl'],
    fontWeight: '700',
  },
  '2xl.bold': {
    ...normalStyle['2xl'],
    fontWeight: '700',
  },
  'xl.bold': {
    ...normalStyle['xl'],
    fontWeight: '700',
  },
  'lg.bold': {
    ...normalStyle['lg'],
    fontWeight: '700',
  },
  'md.bold': {
    ...normalStyle.md,
    fontWeight: '700',
  },
  'sm.bold': {
    ...normalStyle.sm,
    fontWeight: '700',
  },
  'xs.bold': {
    ...normalStyle.xs,
    fontWeight: '700',
  },
};

export const textStyle = {
  ...normalStyle,
  ...boldStyle,
};
