/**
 * 標準的なイテレータプロトコルには定義されていないジェネレータ特有の機能
 */

// next()に引数を渡すことができる
// ジェネレータ関数内で直前に実行されたyieldの戻り値として取得できる

// リセット可能なカウンター
function* resetableGeneratorFunc() {
  let count = 0
  while (true) {
    // next()を真に評価できる引数で実行するとリセットされる
    if (yield count++) {
      count = 0
    }
  }
}

const resetableGenerator = resetableGeneratorFunc()

console.log(resetableGenerator.next())
// { value: 0, done: false }

console.log(resetableGenerator.next())
// { value: 1, done: false }

console.log(resetableGenerator.next())
// { value: 2, done: false }

console.log(resetableGenerator.next(true)) // リセット
// { value: 0, done: false }

// ~~ 引数を渡す以外にもthrow()メソッドも備えている
