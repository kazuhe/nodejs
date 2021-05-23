/**
 * EventEmitterからのasyncイテラブルの生成
 *
 * on()メソッドにコールバックとしてリスナを登録する方法の他に
 * eventsモジュールのon()というメソッドを使って特定のイベントに対して
 * asyncイテラブルを生成することができる
 */

const events = require('events')

const eventAEmitter = new events.EventEmitter()

// asyncイテラブルの生成
// 内部的にイベントへのリスナを登録してasyncイテラブルを生成する
// events.on()に登録されたリスナはfor await...ofを抜けると自動的にoff()される
const eventAIterable = events.on(eventAEmitter, 'eventA')

// リスナが1つ登録されていることを確認
console.log('start', eventAEmitter.listeners('eventA'))

// 実行関数
const run = async () => {
  for await (const a of eventAIterable) {
    // aの値はeventAをemit()した時の引数の配列
    if (a[0] === 'end') {
      // endが渡されたらループを抜ける
      break
    }
    console.log('eventA', a)
  }
}

// eventAをemit()
eventAEmitter.emit('eventA', 'Hello')

// 再度eventAをemit()
eventAEmitter.emit('eventA', 'Hello', 'World')

// endを渡してeventAをemit()
eventAEmitter.emit('eventA', 'end')

// consoleでループを抜けたためリスナの登録が解除されることを確認
run().then(() => console.log('end', eventAEmitter.listeners('eventA')))

// ~~~ console.log
// start [ [Function: eventHandler] ]
// eventA [ 'Hello' ]
// eventA [ 'Hello', 'World' ]
// end []
