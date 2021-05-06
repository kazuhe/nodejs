/**
 * Node.jsが自動的に割り当てる'module'という変数の
 * 'exports'プロパティを通して外部に公開される
 */
module.exports = {
  add: require('./add'),
  substract: require('./substract'),
}
