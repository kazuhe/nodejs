/**
 * コールバックパターン形式でイベントリスナを登録
 *
 * Node.jsコアのAPIの一部はEventEmitterのメソッドを使う代わりに
 * コールバックパターンでイベントリスナを登録する手段を提供している
 */

// eventemitter/index.jsの処理をコールバックパターンで簡潔に記載
const http = require('http')

const server = http.createServer((req, res) => {
  // レスポンスを返す
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.write('Hello, World!')
  res.end()
})

server.listen(8000, () => {
  console.log('Listening port')
})

// これはあくまでもEventEmitterのon()メソッドのショートカット
// 実際のコールバックパターンのように第一引数がエラーになる規約は適用外

/**
 * EventEmitterをインターフェースとするAPIを実装する際
 * 次のようなケースはコールバックパターンの採用を検討する
 */
// ・そのEventEmitterインスタンスにとって主要なイベント（httpモジュールの例におけるrequestイベント）のリスナを
//   EventEmitterインスタンスを生成する関数の引数で登録できるようにする
// ・あるメソッドの呼び出しと明確な関連性があるイベント（httpモジュールの例におけるlisten()メソッドに対するlisteningイベント）のリスナを
//   そのメソッドの引数で登録できるようにする
