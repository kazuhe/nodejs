/**
 * evtnets.on()の引数に渡したEventEmitterインスタンスが
 * errorイベントを発効した場合、生成されたasyncイテラブルが
 * for await...ofループでエラーを投げ、
 * かつリスナの登録が解除されることを確認してください
 */

const events = require('events')

const eventEmitter = new events.EventEmitter()

// asyncイテラブルの生成
const eventIterable = events.on(eventEmitter, 'event')

// リスナが登録されていることを確認
console.log('start', eventEmitter.listeners('event'))

const run = async () => {
  for await (const a of eventIterable) {
    console.log('[eventIterable]: ', a)

    // if (a[0] === 'error') {
    //   throw new Error('in eventIterable')
    // }
  }
}

run()
  .then(() => console.log(eventEmitter))
  .catch((err) => {
    console.error('for await...ofでエラー', err)
  })

eventEmitter.emit('event', 'test')
eventEmitter.emit('event', 'foo', 'bar')
eventEmitter.emit('error', 'Error!!')

// リスナの登録が解除されていることを確認
console.log('last', eventEmitter.listeners('event'))
