module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['react-app', 'eslint:recommended', 'plugin:react/recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'off',
    'array-callback-return': 'off',
    'react/display-name': 'off',
    eqeqeq: 'off',
    semi: [1, 'always'],
    'prettier/prettier': 2,
    'no-unused-vars': 1,
    'react/prop-types': 0
  }
};
