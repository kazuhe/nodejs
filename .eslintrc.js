module.exports = {
  root: true,

  env: {
    es6: true,
    browser: true,

    // CommonJSの"module.exports/require"を許容
    node: true,
  },

  plugins: ['prettier'],

  extends: [
    // ESLintのJavaScriptルールセットを適用
    'eslint:recommended',

    // Prettierのお勧めルールセットを適用
    'plugin:prettier/recommended',
  ],

  parserOptions: {
    ecmaVersion: 2021,
  },

  rules: {
    // Prettier options
    'prettier/prettier': ['error', { singleQuote: true, semi: false }],
  },

  parserOptions: {
    // async/await構文に対応する為
    ecmaVersion: 2017,
  },
}
