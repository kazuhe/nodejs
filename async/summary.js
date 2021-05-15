/**
 * Promiseインスタンスはsettled状態になったらそれ以上状態は遷移しない
 */
new Promise((resolve, reject) => {
  resolve('foo')
  // 'foo'で解決されたので以降は実行されない
  resolve('bar')
  reject(new Error('Error'))
})
  .then((result) => console.log('fulfilled', result))
  .catch((err) => console.log('rejected', err))

// ~ console.log ~
// fulfilled foo

/**
 * 同じ文字列を渡された場合はキャッシュした値を返すJSON解析関数
 */
function asyncParseJSON(json) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(JSON.parse(json))
      } catch (err) {
        // エラーをキャッチして正しく表示される
        console.log('<< Catch error >>')
        reject(err)
      }
    }, 1000)
  })
}

const cache = {}

function asyncParseJSONWithCache(json) {
  let cached = cache[json]
  if (!cached) {
    cached = asyncParseJSON(json)
    cache[json] = cached
  }
  return cached
}

asyncParseJSONWithCache('{"message": "Hello", "to": "World"}')
  .then((result) => console.log('1回目の結果', result))
  .then(() => {
    const promise = asyncParseJSONWithCache(
      '{"message": "Hello", "to": "World"}'
    )
    console.log('2回目の呼び出し')
    return promise
  })
  .then((result) => {
    console.log('2回目の結果', result)
  })
console.log('Completed first call')

// ~ console.log ~
// Completed first call
// 1回目の結果 { message: 'Hello', to: 'World' }
// 2回目の呼び出し
// 2回目の結果 { message: 'Hello', to: 'World' }

/**
 * 数値で解決されるfulfilledなPromiseインスタンスの合計値を返す非同期関数
 * rejectedなインスタンスはエラーを返さずスルーさせる
 */
const asyncSum = async (promise) => {
  let total = 0
  const arr = await Promise.allSettled(promise)
  arr.forEach((element) => {
    if (element.status === 'fulfilled') {
      total += element.value
    }
  })
  return total
}

asyncSum([
  Promise.resolve(3),
  Promise.resolve(2),
  Promise.reject(new Error('Error')),
]).then((result) => console.log('asyncSum result: ', result))

/**
 * 上記関数のPromise.all()版
 */
const asyncSum2 = async (promise) => {
  let total = 0
  const arr = await Promise.all(promise.map((v) => v.catch(() => 0)))
  arr.forEach((element) => {
    total += element
  })
  return total
}

asyncSum2([
  Promise.resolve(3),
  Promise.resolve(2),
  Promise.reject(new Error('Error')),
]).then((result) => console.log('asyncSum2 result: ', result))
