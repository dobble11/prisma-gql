// eslint-disable-next-line no-undef
module.exports = {
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'turbo', 'prettier'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    'turbo/no-undeclared-env-vars': 'off',
    eqeqeq: 'error',
  },
};
