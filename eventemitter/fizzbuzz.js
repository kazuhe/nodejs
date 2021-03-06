/**
 * EventEmitterでFizzBuzzを実装
 */

const EventEmitter = require('events')

function createFizzBuzzEventEmitter(until) {
  // EventEmitterインスタンスの生成
  const eventEmitter = new EventEmitter()
  // イベントの発行を常に非同期にする為、process.nextTick()を利用する
  process.nextTick(() => _emitFizzBuzz(eventEmitter, until))
  return eventEmitter
}

// ※EventEmitterインスタンスの生成処理の中で
// 同期的にイベントを発行（emit）してはならない
// つまり、登録（on）されていないリスナは発行することができない為
// すべて非同期で発行する必要がある

// async/await構文が使える様にイベント発行部分を別関数に切り離す
async function _emitFizzBuzz(eventEmitter, until) {
  eventEmitter.emit('start')
  let count = 1
  while (count <= until) {
    await new Promise((resolve) => setTimeout(resolve, 100))
    if (count % 15 === 0) {
      eventEmitter.emit('FizzBuzz', count)
    } else if (count % 3 === 0) {
      eventEmitter.emit('Fizz', count)
    } else if (count % 5 === 0) {
      eventEmitter.emit('Buzz', count)
    }
    count += 1
  }
  eventEmitter.emit('end')
}

function startListener() {
  console.log('start')
}

function fizzListener(count) {
  console.log('Fizz', count)
}

function buzzListener(count) {
  console.log('Buzz', count)
}

function fizzBuzzListener(count) {
  console.log('fizzBuzz', count)
}

function endListener() {
  console.log('end')
  // thisはEventEmitter
  this
    // すべてのイベントからリスナを削除
    .off('start', startListener)
    .off('Fizz', fizzListener)
    .off('Buzz', buzzListener)
    .off('FizzBuzz', fizzBuzzListener)
    .off('end', endListener)
}

createFizzBuzzEventEmitter(40)
  .on('start', startListener)
  .on('Fizz', fizzListener)
  .once('Buzz', buzzListener) // Buzzイベントだけonceで登録
  .on('FizzBuzz', fizzBuzzListener)
  .on('end', endListener)
