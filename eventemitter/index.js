/**
 * 1回の要求に対して結果が複数回発生する非同期処理はPromiseには向かない
 *
 * 監視対象（Subject）に対して発生した何らかのイベントが、
 * 監視役（Observer）に逐一通知されるデザインパターンをObserverパターンという
 * このObserverパターンはNode.jsでは'EventEmitter'によって実装される
 */

// httpモジュールで実際にWebサーバーを起動
const http = require('http')

// サーバオブジェクト（EventEmitterのインスタンス）の生成
const server = http.createServer()

// requestイベントのリスナ登録
server.on('request', (req, res) => {
  // レスポンスを返す
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.write('Hello, World!')
  res.end()
})

// listenig（リクエストの受け付け開始）イベントのリスナ登録
server.on('listening', () => {
  // ...
})

// errorイベントのリスナ登録
server.on('error', () => {
  // ...
})

// close（リクエストの受付終了）イベントのリスナ登録
server.on('close', () => {
  // ...
})

server.listen(8000)
