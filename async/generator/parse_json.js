/**
 * 下記のジェネレータの機能を使って非同期処理を実行する
 * ・ジェネレータ関数ないの処理を一時停止・再開できる
 * ・next()の引数を取得できる
 * ・throw()の引数を投げる
 */

function asyncParseJSON(json) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(JSON.parse(json))
      } catch (err) {
        reject(err)
      }
    }, 1000)
  })
}

// yieldの仕組みを利用して非同期処理を実行する関数
function* asyncWithGeneratorFunc(json) {
  try {
    const result = yield asyncParseJSON(json)
    console.log('Parse result', result)
  } catch (err) {
    console.log('[Error]asyncWithGeneratorFunc', err)
  }
}

const asyncWithGenerator = asyncWithGeneratorFunc('{"foo": 1}')

// yield asyncParseJSON(json)で生成されるPromiseインスタンスの取得
const promise1 = asyncWithGenerator.next().value

// Promiseインスタンスが解決された値をnext()メソッドに渡す
promise1.then((result) => asyncWithGenerator.next(result))

// [console.logの表示結果]
// Parse result { foo: 1 }
