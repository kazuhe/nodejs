module.exports = {
  root: true,

  plugins: ['prettier'],

  extends: [
    // ESLintのJavaScriptルールセットを適用
    'eslint:recommended',

    // Prettierのお勧めルールセットを適用
    'plugin:prettier/recommended',
  ],

  env: {
    es6: true,
    browser: true,

    // CommonJSの"module.exports/require"を許容
    node: true,
  },
}
