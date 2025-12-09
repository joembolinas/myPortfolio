module.exports = {
  printWidth: 100,
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  trailingComma: 'all',
  bracketSpacing: true,
  arrowParens: 'always',
  endOfLine: 'lf',
  overrides: [
    { files: '*.md', options: { proseWrap: 'always' } },
    { files: '*.json', options: { printWidth: 80 } },
  ],
};
