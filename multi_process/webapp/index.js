/**
 * webアプリケーションのマルチプロセス化
 *
 * Webアプリケーションそのものを並列に動かす場合に適している。
 * アプリケーション内部でCPU負荷の高い処理を並列化する場合はマルチスレッドが適している。
 * ./multi_process.jsのclusterモジュールによって以下の処理をマルチプロセスで実行させる
 */

'use strict'

const http = require('http')
const fibonacci = require('./fibonacci')

// サーバーオブジェクトの生成とリクエストハンドラの設定
http
  .createServer((req, res) => {
    // localhost:3000/10 へのリクエストでreq.urlは'/10'になる
    // そこから1文字を取り除いてnを取得
    const n = Number(req.url.substr(1))
    if (Number.isNaN(n)) {
      // Number.isNaN()で数値化どうか判定し、数値でなかった場合は無視
      return res.end()
    }
    const result = fibonacci(n)
    // res.end()で計算結果をレスポンスとして返す
    res.end(result.toString())
  })
  .listen(3000) // 3000ポートでリクエストを待機

// 負荷テスト
// node ./multi_process/webapp/
// npx loadtest -c 100 -t 10 http://localhost:3000/30
