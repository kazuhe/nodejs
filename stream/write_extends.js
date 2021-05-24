/**
 * 自前の書き込みストリームを実装するには
 * stream.Writableを継承して'_write()'を利用する
 */

const stream = require('stream')

class DelayLogStream extends stream.Writable {
  constructor(options) {
    // objectMode: trueを指定するとオブジェクトをデータとして流せる
    super({ objectMode: true, ...options })
  }

  _write(chunk, encoding, callback) {
    console.log('_write()')
    // messageプロパティ（文字列）、delayプロパティ（数値）を含むオブジェクトが
    // データとして流れてくることを期待
    const { message, delay } = chunk
    // delayで指定した時間（ミリ秒）だけ遅れてmessageをログに出す
    setTimeout(() => {
      console.log(message)
      callback()
    }, delay)
  }
}

// objectMode: trueを指定していないストリームの状態（デフォルト）をバッファモードと呼び、
// 文字列・Buffer・Unit8Arrayしか扱えない

const delayLogStream = new DelayLogStream()
delayLogStream.write({ message: 'Hi', delay: 0 })

delayLogStream.write({ message: 'Thank you', delay: 1000 })

delayLogStream.write({ message: 'Bye', delay: 100 })
