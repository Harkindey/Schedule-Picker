module.exports = {
  root: true,
  extends: ['@react-native', 'prettier'],
  plugins: ['prettier', 'unused-imports', 'import'],
  rules: {
    quotes: ['warn', 'single', { avoidEscape: true }],
    'prettier/prettier': 'error',
    'react-native/no-inline-styles': 'off',
    'no-control-regex': 0,
    radix: 'off',
    'eslint-comments/no-unlimited-disable': 'off',
    'no-shadow': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
    'unused-imports/no-unused-imports-ts': 'error',
    'unused-imports/no-unused-vars': 'off',
    'import/no-duplicates': ['error'],
  },
  overrides: [
    {
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: ['plugin:testing-library/react'],
    },
  ],
};
