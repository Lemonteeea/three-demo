import antfu from '@antfu/eslint-config'

export default antfu({
  rules: {
    'no-console': 'off',
    'no-unused-expressions': 'off',
    '@typescript-eslint/no-unused-expressions': 'off',
  },
  formatters: {
    css: true,
  },
}, {
  ignores: [
    'public/**/*',
  ],
})
