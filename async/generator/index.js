/**
 * ジェネレータはジェネレータ関数から返されるオブジェクト
 *
 * 処理を途中で停止したり再開したりできる仕組みを持つ
 * Promiseと組み合わせて非同期処理を同期処理のようにシンプルに
 * 実行できるが現在はasync/awaitに取って変わられている
 */

function* generatorFunc() {
  console.log('Start generator')
  console.log('yield 1')
  yield 1

  console.log('yield 2')
  yield 2

  console.log('yield 3')
  yield 3

  console.log('End generator')
  return 'generator value'
}

// generator.next()を実行すると段階的にgeneratorFunc()内の
// 'yield'までが実行され、最後まで到達するとそれ以降は
// { value: undefined, done: true }が返される
const generator = generatorFunc()
console.log(generator.next())
// Start generator
// yield 1
// { value: 1, done: false }

console.log(generator.next())
// yield 2
// { value: 2, done: false }

console.log(generator.next())
// yield 3
// { value: 3, done: false }

console.log(generator.next())
// End generator
// { value: 'generator value', done: true }

console.log(generator.next())
// { value: undefined, done: true }

console.log('========')
/**
 * イテレータとイテラブル
 */
// next()メソッド（valueとdoneの2つのプロパティを含むオブジェクトを返す）
// はイテレータプロトコルの仕様に準拠している
// イテレータプロトコルは値の配列を生成する為の標準的な方法を定義したもの
// イテレータプロトコルを実装したオブジェクトのことをイテレータという

// ジェネレータはイテラブルプロトコルという仕様を満たしたイテラブルでもある
// これは[Symbol.iterator]()メソッドによってイテレータが返される
const generator2 = generatorFunc()
const iterator = generator2[Symbol.iterator]()

console.log(iterator.next())
// Start generator
// yield 1
// { value: 1, done: false }

console.log(iterator.next())
// yield 2
// { value: 2, done: false }

console.log(iterator.next())
// yield 3
// { value: 3, done: false }

console.log(iterator.next())
// End generator
// { value: 'generator value', done: true }

console.log(iterator.next())
// { value: undefined, done: true }

// ジェネレータのイテラブルプロトコルから返されるイテレータは
// ジェネレータそのものと同一
console.log(iterator === generator2)
// true

// イテラブルはその名の通り反復可能オブジェクト
const generator3 = generatorFunc()
// for...ofで値を取り出す
for (const v of generator3) {
  console.log('for...of', v)
}
// Start generator
// yield 1
// for...of 1
// yield 2
// for...of 2
// yield 3
// for...of 3
// End generator
