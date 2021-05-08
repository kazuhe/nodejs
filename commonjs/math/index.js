/**
 * Node.jsが自動的に割り当てる'module'という変数の
 * 'exports'プロパティを通して外部に公開される
 */
module.exports = {
  add: require('./add'),
  substract: require('./substract'),

  // CommonJSは'__filename'と'__dirname'という
  // 変数がモジュールスコープで割り当てられている
  __filename,
  __dirname,
}
