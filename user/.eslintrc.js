module.exports = {
    env: {
      browser: true,
      es2021: true,
    },
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
    ],
    parserOptions: {
      ecmaVersion: 12,
      sourceType: 'module',
    },
    plugins: [
      'react',
    ],
    rules: {
      // 여기에 사용자 정의 규칙을 추가할 수 있습니다.
    },
    globals: {
      naver: 'readonly', // 전역 변수로 naver 추가
    },
  };
  