/**
 * EventEmitterにはコールバックパターンの第一引数にエラーを渡すというような規約は無い
 * その代わりにEventEmitterは'error'という名前のイベントによってエラーを伝播させる
 */

const EventEmitter = require('events')

try {
  // errorイベントは特別なイベントとして扱われ、リスナが存在しない状態でemit()するとエラーが投げられる
  new EventEmitter()
    // ↓が無くてもerrorが投げられる
    // .on('error', (err) => console.log('error event!', err))
    .emit('error', new Error('Error!'))
} catch (err) {
  console.log(err)
}

// errorイベントをemit()しうるEventEmitterインスタンスは常にerrorイベントリスナを登録すべき
