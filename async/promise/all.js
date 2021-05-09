/**
 * then()やcatch()などでPromiseをチェーンすると全て完了するのに時間を要する
 * 逐次実行の必要がなければPromise.all()などで並行実行する方が早く結果を得られる
 */

// Promise.all()
// 引数に含まれるPromiseインスタンスが全てfulfilledになった時だけ
// Promiseインスタンスを解決した値を与えられた順で配列にして返す
const allResolved = Promise.all([
  1,
  Promise.resolve('foo'),
  Promise.resolve(true),
])
console.log(allResolved)

/**
 * 逐次実行と並行実行の比較
 */
const { performance } = require('perf_hooks')

// Promiseを返す1秒かかる非同期処理
function asyncFunc() {
  return new Promise((resolve) => setTimeout(resolve, 1000))
}

// 現在時刻を取得
const start = performance.now()

// 逐次実行の場合
asyncFunc()
  .then(asyncFunc)
  .then(asyncFunc)
  .then(asyncFunc)
  .then(() => console.log('逐次実行', performance.now() - start))

// 並行実行の場合
Promise.all([asyncFunc(), asyncFunc(), asyncFunc(), asyncFunc()]).then(() =>
  console.log('並行実行', performance.now() - start)
)

// [console.logの表示結果]
// 並行実行 1005.3685340881348
// 逐次実行 4016.6121010780334
