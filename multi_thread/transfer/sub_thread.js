'use strict'

const { parentPort, workerData } = require('worker_threads')

// workerDataでメインスレッドから受け取った値をそのままpostMessage()で返すサブスレッド
// この時、workerData.transferの値に応じて、転送を使うかどうか決定する
// postMessage()で転送を使う場合、第二引数に転送対象オブジェクトを配列で指定
parentPort.postMessage(
  workerData.buffer,
  // postMessage()の第二引数に転送対象オブジェクトを指定
  workerData.transfer ? [workerData.buffer] : []
)
