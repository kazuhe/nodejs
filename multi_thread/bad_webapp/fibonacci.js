// サブスレッド

'use stcit'

const fibonacci = require('../../multi_process/webapp/fibonacci')
const { workerData, parentPort } = require('worker_threads')

// フィボナッチ数の計算結果をメインスレッドに送信
parentPort.postMessage(fibonacci(workerData))

// workerDataでメインスレッドから入力を受け取り、その値に対応するフィボナッチ数を計算し、
// parentPort.postMessage()でメインスレッドに返す
