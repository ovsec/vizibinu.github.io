module.exports = {
  semi: true,
  singleQuote: true,
  printWidth: 100,
  tabWidth: 2,
  trailingComma: 'es5',
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
        singleQuote: true,
        jsxSingleQuote: true,
      },
    },
    {
      files: ['.*', '*.json', '*.md', '*.mdx', '*.toml', '*.yml'],
      options: {
        useTabs: false,
      },
    },
  ],
  plugins: [require.resolve('prettier-plugin-astro'), 'prettier-plugin-tailwindcss'],
};
