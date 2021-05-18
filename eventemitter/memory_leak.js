/**
 * Node.jsはガベージコレクション（GC）の機能を備えている
 */
const EventEmitter = require('events')

// 使われなくなった変数は自動的にメモリから削除される
{
  const a = 1
  console.log(a)
}
// ブロックが終了したらaのスコープ外になるのでGCの対象となる

// しかし、EventEmitterインスタンスにリスナを登録した場合は
// 他のどこから参照されなくなっても内部に参照が残る
const messageEventEmitter = new EventEmitter()
{
  const listener = () => console.log('be in the block')
  messageEventEmitter.on('message', listener)
}

// listeners()メソッドでmessageイベントのリスナを取得
console.log(messageEventEmitter.listeners('message'))
// listenerの参照が残っておりスコープ外になってもGCの対象にならない
// [ [Function: listener] ]

// その為、EventEmitterインスタンスに11子以上のリスナを登録すると警告が出力される
const barEventEmitter = new EventEmitter()
for (let i = 0; i < 11; i++) {
  barEventEmitter.on('bar', () => console.log('bar'))
}
// MaxListenersExceededWarning: Possible EventEmitter memory leak detected...

// EventEmitterインスタンス自体がGCの対象となるか明示的にリスナを削除する必要がある
// メモリを不費用に圧迫する可能性があるので、オブジェクト破棄のタイミングで必ずリスナを削除する

// 11以上リスナの登録が必要な場合はsetMaxListeners()で拡張も可能
