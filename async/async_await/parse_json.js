/**
 * ジェネレータとの違い
 * ・function後の'*'がasyncに変わった
 * ・yieldがawaitに置き換えられた点
 *
 * awaitキーワードにPromiseインスタンスを渡すと
 * 関数内の処理が一時停止し、その解決に伴って再開する
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

async function asyncFunc(json) {
  try {
    const result = await asyncParseJSON(json)
    console.log('Parse result', result)
  } catch (err) {
    console.log('[Error]asyncFunc', err)
  }
}

// 正常系
asyncFunc('{"foo": 1}')

// 異常系
asyncFunc('不正なJSON')
