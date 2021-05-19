/**
 * classを用いたEventEmitterの利用方法
 */
const EventEmitter = require('events')

// EventEmitterを継承
// インスタンスの生成はコンストラクタで行われ、start()メソッドとは分離しているので
// 関数版のprocess.nextTick()のような処理は必要がない
class FizzBuzzEmitter extends EventEmitter {
  async start(until) {
    this.emit('start')
    let count = 1
    while (count <= until) {
      await new Promise((resolve) => setTimeout(resolve, 100))
      if (count % 15 === 0) {
        this.emit('FizzBuzz', count)
      } else if (count % 3 === 0) {
        this.emit('Fizz', count)
      } else if (count % 5 === 0) {
        this.emit('Buzz', count)
      }
      count += 1
    }
    this.emit('end')
  }
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

new FizzBuzzEmitter()
  .on('start', startListener)
  .on('Fizz', fizzListener)
  .once('Buzz', buzzListener) // Buzzイベントだけonceで登録
  .on('FizzBuzz', fizzBuzzListener)
  .on('end', endListener)
  .start(20)
