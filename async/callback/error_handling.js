/**
 * [NG例]
 * 非同期処理は'try catch'構文の中で適切にエラーハンドリングができない
 * setTimeout()が'try catch'が完了した後にエラーを出す為
 */
function NGparseJSON(json, callback) {
  try {
    setTimeout(() => {
      callback(null, JSON.parse(json))
    }, 1000)
  } catch (err) {
    // エラーをキャッチすることなく通過してしまう
    console.log('<< Catch error >>')
    callback(err)
  }
}

NGparseJSON('不正なJSON', (err, result) => {
  console.log('Run parseJSONAsync()', err, result)
})

/**
 * [OK例]
 * 非同期処理の中で'try catch'を行うと適切にエラーをキャッチできる
 * コールバック関数の中で起こりうるエラーをイベントループまで
 * 到達させることなく呼び出し元に返すことが重要
 */
function OKparseJSON(json, callback) {
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

OKparseJSON('不正なJSON', (err, result) => {
  console.log('Run parseJSONAsync()', err, result)
})
