/**
 * EventEmitterはPromiseインターフェースでハンドリングすることもできる
 *
 * 例えば、once()メソッドのような最初の1回にしか興味がないケース
 */
const events = require('events')

const eventBEmitter = new events.EventEmitter()

// events.once()でPromiseインスタンスが得られる
const eventBPromise = events.once(eventBEmitter, 'eventB')

eventBPromise.then((arg) => console.log('eventB発生', arg))

setTimeout(() => {
  eventBEmitter.emit('eventB', 'Hello', 'World')

  // 2回目
  setTimeout(() => {
    eventBEmitter.emit('eventB', 'Hello', 'World')
  }, 1000)
}, 1000)
