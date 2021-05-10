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
generator.next()
// Start generator
// yield 1

generator.next()
// yield 2

generator.next()
// yield 3

generator.next()
// End generator

console.log(generator.next())
// { value: undefined, done: true }
