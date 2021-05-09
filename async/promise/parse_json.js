/**
 * 非同期処理の状態と結果を表現するPromiseオブジェクト
 */
function asyncParseJSON(json) {
  // Promiseインスタンスを生成して返す（pending状態）
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        // fulfilled状態にする（解決）
        resolve(JSON.parse(json))
      } catch (err) {
        // refected状態にする（拒否）
        reject(err)
      }
    }, 1000)
  })
}

const toBeFulfilled = asyncParseJSON('{"foo": 1}')
const toBeRejected = asyncParseJSON('不正なJSON')

console.log('[Log] Promise生成直後')
console.log(toBeFulfilled)
// rejected状態になったPromiseインスタンスに対して
// イベントループが次のフェースに進むまでにエラーハンドリングが
// 行われない為に'UnhandledPromiseRejectionWarning'となる
console.log(toBeRejected)

setTimeout(() => {
  console.log('[Log] 1秒後')
  console.log(toBeFulfilled)
  console.log(toBeRejected)
}, 1000)
