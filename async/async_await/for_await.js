/**
 * for await...of構文を使って非同期に反復処理を行う
 * async関数の中 or ESモジュールのトップレベル（現在プロポーザルステージ3）
 */
const asyncIterable = {
  [Symbol.asyncIterator]() {
    let i = 0
    // asyncイテレータ
    return {
      // value, doneプロパティを持つオブジェクトで解決されるPromiseを返す
      next() {
        if (i > 3) {
          return Promise.resolve({ done: true })
        }
        return new Promise((resolve) =>
          setTimeout(() => resolve({ value: i++, done: false }), 1000)
        )
      },
    }
  },
}

;(async () => {
  for await (const element of asyncIterable) {
    console.log(element)
  }
})()
