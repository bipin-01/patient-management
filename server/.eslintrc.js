module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb-typescript/base',
    'src',
    'server',
    'app'
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['import', '@typescript-eslint'],
  parserOptions: {
    project: './tsconfig.eslint.json'
  },
  root: true,
  env: {
    node: true
  }
};
