module.exports = {
  root: true,

  env: {
    es6: true,
    browser: true,

    // CommonJSの"module.exports/require"を許容
    node: true,
  },

  plugins: ['react', 'prettier'],

  extends: [
    // ESLintのJavaScriptルールセットを適用
    'eslint:recommended',
    
    'plugin:react/recommended',

    // Prettierのお勧めルールセットを適用
    'plugin:prettier/recommended',
  ],

  parserOptions: {
    // ES2021以降の構文を有効にする
    ecmaVersion: 2021,
    sourceType: 'module',
  },

  rules: {
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],

    // Prettier options
    'prettier/prettier': ['error', { singleQuote: true, semi: false }],
  },
}
