/**
 * コールバックの呼び出しが同期or非同期で一貫性のないAPIは×の例
 *
 * asyncParseJSON()はsetTimeout()を用いて重たい処理だと仮定する
 * asyncParseJSONWithCache()の第一引数に同じ文字列を渡した場合は
 * 2回目以降キャッシュした値が使用される
 */

const cache = {}

function asyncParseJSON(json, callback) {
  setTimeout(() => {
    try {
      callback(null, JSON.parse(json))
    } catch (err) {
      // エラーをキャッチして正しく表示される
      console.log('<< Catch error >>')
      callback(err)
    }
  }, 1000)
}

/**
 * [NG例]
 * 挙動が予測しづらくなる為、コールバックをパラメータとする関数は
 * 常に同期的に実行するか常に非同期で実行するかのどちらかでなければならない
 */
/*
function asyncParseJSONWithCache(json, callback) {
  const cached = cache[json]
  if (cached) {
    // 同期的に実行される
    callback(cached.err, cached.result)
    return
  }
  // 非同期的に実行される
  asyncParseJSON(json, (err, result) => {
    cache[json] = { err, result }
    callback(err, result)
  })
}
*/
// [console.logの表示結果]
// Completed first call
// First result null { message: 'Hello', to: 'World' }
// Second result null { message: 'Hello', to: 'World' }
// Completed second call

/**
 * [OK例]
 * 常に非同期的にコールバックを実行する
 */
function asyncParseJSONWithCache(json, callback) {
  const cached = cache[json]
  if (cached) {
    // キャッシュに値が存在する場合でも非同期的にコールバックを実行する
    setTimeout(() => callback(cached.err, cached.result), 0)
    return
  }
  asyncParseJSON(json, (err, result) => {
    cache[json] = { err, result }
    callback(err, result)
  })
}
// [console.logの表示結果]
// Completed first call
// First result null { message: 'Hello', to: 'World' }
// Completed second call
// Second result null { message: 'Hello', to: 'World' }

// 初回
asyncParseJSONWithCache(
  '{"message": "Hello", "to": "World"}',
  (err, result) => {
    console.log('First result', err, result)

    // 2回目（同じ文字列を渡しているのでキャッシュされた値が使用される）
    asyncParseJSONWithCache(
      '{"message": "Hello", "to": "World"}',
      (err, result) => {
        console.log('Second result', err, result)
      }
    )
    console.log('Completed second call')
  }
)
console.log('Completed first call')
