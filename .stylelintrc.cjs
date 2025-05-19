module.exports = {
  extends: [
    'stylelint-config-recommended-vue',
    'stylelint-config-recess-order',
  ],
  plugins: ['stylelint-order'],
  ignoreFiles: ['**/*.js', '**/*.jsx', '**/*.tsx', '**/*.ts', '**/*.json'],
  rules: {
    'color-hex-length': 'long',
    'at-rule-no-deprecated': [
      true,
      {
        ignoreAtRules: ['apply'],
      },
    ],
    'at-rule-no-unknown': [
      true,
      {
        // tailwindcss directives
        ignoreAtRules: ['import', 'theme', 'source', 'utility', 'variant', 'custom-variant', 'apply', 'reference', 'plugin'],
      },
    ],
  },
}
