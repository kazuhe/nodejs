/**
 * ディレクトリに'index.js'が存在する場合は
 * 'require()'の引数にディレクトリの指定が可能
 */
const math = require('./math')

console.log(math.add(1, 2))
console.log(math.substract(1, 2))
