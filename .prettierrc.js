module.exports = {
  singleQuote: true,
  semi: true,
  useTabs: false,
  tabWidth: 2,
  trailingComma: 'all',
  printWidth: 80,
  importOrder: [
    '^react$', // react
    '^react-native$', // react-native
    '^((?!(/|^@config$)).)*$', // target: 외부 라이브러리 (문자열에 "/"" 가 포함되지 않을때, 예외처리: @config 도 포함되지 않을때)
    '^(react|lodash|msw|native-base|^@(?!native-base)[^/]|^[^./]*$).*', // 외부 라이브러리 경로
    '^native-base.*', // native-base 로 시작하는 경로
    '^@react-navigation.*', // native-base 로 시작하는 경로
    '^@/(apis|swagger).*', // api 관련
    '^@/(contexts|hooks|hocs|navigations|components|containers).*', // react 관련 선언
    '^@/.*', // 나머지 전역 레벨로 관리되는 경로
    '^[.].*/.*', //  상대 경로
    '.*', // 나머지 경로
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
