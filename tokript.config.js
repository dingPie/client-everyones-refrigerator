module.exports = {
  'gen:img': {
    /** 조회할 img 파일들이 포함되어있는 폴더 입니다. */
    inputPath: 'src/assets/images',
    /** 생성될 파일이 위치할 경로입니다.*/
    outputPath: 'src/generated/path/images.ts',
    /** 생성될 image 객체의 이름입니다 */
    displayName: 'MY_IMAGES',
    /** 생성될 객체의 value 에 할당될 경로의 base-path 입니다 */
    basePath: '@/assets/images',
    /** 생성될 이미지 파일을 판별하는 패턴으로써, 파일이름이 패턴과 일치할 경우에만 객체에 포함됩니다. */
    includingPattern: ['*.jpg', '*.png', '*.svg', '*.jpeg'],
    /** 제외 될 이미지 파일을 판별하는 패턴으로써, 파일이름이 패턴과 일치할 경우에 객체에서 제외 됩니다. */
    ignoredPattern: ['*node_module*'],
    /** key 값을 결정할 포멧함수입니다. 기본적으로, SNAKE_UPPER_CASE 로 생성됩니다. */
    // formatKey: (filename) => str
  },
  'gen:source': {
    screen: {
      /** 컴포넌트가 생성될 경로입니다. */
      componentOutputPath: 'src/components/',
    },
  },
  'w:start': {
    /** 이슈 생성 권한을 가진 github 토큰입니다. 개인 계정 에서 발급가능합니다 */
    token: process.env.GITHUB_TOKEN,
    /**  해당 프로젝트의 github repository 이름입니다. 이슈 생성시 해당 이름으로 접근하기에, 정확히 기입해야 합니다 */
    repoName: process.env.GITHUB_REPO,
    /**  해당 프로젝트 repository 의 owner 로 써. organization 이름입니다 */
    owner: 'TOKTOKHAN-DEV',
    /**  이슈 생성시 이슈를 추적할 맴버의 아이디 목록 입니다 */
    assignees: ['ldu1020'],
    /**  이슈 생성시 이슈에 달릴 수 있는 이슈 label 의 목록입니다 */
    labels: ['bug', 'feature'],
  },
  'gen:font': {
    /** 조회할 font 파일들이 포함되어있는 폴더 입니다. */
    inputPath: 'src/assets/fonts',
    /** 생성될 파일이 위치할 경로입니다.*/
    outputPath: 'src/generated/fonts/fontConfig.tsx',
    /** 생성될 font 객체의 이름입니다 */
    displayName: 'FONTS',
    /** 생성될 객체의 value 에 할당될 경로의 base-path 입니다 */
    basePath: '',
    /** 생성될 폰트 파일을 판별하는 패턴으로써, 파일이름이 패턴과 일치할 경우에만 객체에 포함됩니다.
     * (default: ['*.otf', '*.ttf', '*.woff', '*.woff2'])
     */
    includingPattern: ['*.otf', '*.ttf', '*.woff', '*.woff2'],
    /** 제외 될 폰트 파일을 판별하는 패턴으로써, 파일이름이 패턴과 일치할 경우에 객체에서 제외 됩니다.
     * (default: ['*node_module*'])
     */
    ignoredPattern: ['*node_module*'],
  },
  'gen:api': {
    /** 조회할 스웨거의 url 혹은 file(yaml, json) 경로 입니다. 통상적으로
     * 백앤드 개발자에게 공유받은  api-swagger-url 의 '/openapi.json' 경로에 해당합니다.
     */
    swaggerSchemaUrl: `${process.env.API_BASE_URL}/openapi.json/`,
    /** 생성될 파일들이 위치할 경로입니다. */
    outputPath: 'src/generated/apis',
    /** 생성되는 코드의 React Query 포함 여부 입니다.
     *  해당 옵션이 false 일경우 infiniteQuery 를 포함한 모든 Query 가 생성되지 않습니다. */
    includeReactQuery: true,
    /** 생성되는 코드의 InfiniteQuery 포함 여부 입니다. */
    includeReactInfiniteQuery: true,
    /** Api 의 axios 요청 instance 주소입니다 */
    axiosInstancePath: '@apis/_axios/instance',
    /**
     * infiniteQuery 를 생성할 함수 필터입니다.
     * - keywords:  api 의 queryParams key 에 keywords 가 포함되어 있는 항목만 생성됩니다. 키워드 배열은 AND 연산으로써 사용됩니다.
     * ex) [limit, offset] === limit && offset
     * - nextkey : InfiniteQuery 의 nextPage 와 nextPageParam 을 구하는 함수를 작성하기 위해 사용됩니다.
     *
     *  getNextPage 와 getNextPagePram 을 커스텀 하고 싶다면 넘겨지는 객체에 포함시켜 주세요,
     */
    paginations: [
      {
        keywords: ['limit', 'offset'],
        nextKey: 'offset',
        /**
         * @type undefined | string | (param: {apiInstanceName: string; functionName: string, pagination: { keywords: string[], nextKey: string }}) => string
         */
        // getNextPage: "",
        /**
         * @type undefined | string | (param: {apiInstanceName: string; functionName: string, pagination: { keywords: string[], nextKey: string }}) => string
         */
        // getNextPageParam: ""
      },
    ],
  },
};
