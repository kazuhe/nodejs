/**
 * 引数の配列のPromiseインスタンスが1つでもsettledになると
 * その他のPromiseインスタンスの結果を待たずにPromiseインスタンスを
 * 返すPromise.race()を使ってタイムアウトの実装を行う
 */
function withTimeout(promise, timeout) {
  return Promise.race([
    // 最初に解決されたPromiseインスタンスが返される
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Timeout error')), timeout)
    ),
  ])
}

// 20ミリ秒で完了する非同期処理
const promise = new Promise((resolve) => setTimeout(() => resolve(1), 20))

// タイムアウト30ミリ秒で実行（タイムアウトせずにPromiseが返される）
withTimeout(promise, 30)
  .then((promise) => console.log('[sucess]', promise))
  .catch((error) => console.log('[timeout]', error))

// [console.logの表示結果]
// [sucess] 1

// タイムアウト10ミリ秒で実行（タイムアウトしてErrorが返される）
withTimeout(promise, 10)
  .then((promise) => console.log('[sucess]', promise))
  .catch((error) => console.log('[timeout]', error))

// [console.logの表示結果]
// [timeout] Error: Timeout error
