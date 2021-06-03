// サブスレッド

'use stcit'

const fibonacci = require('../../multi_process/webapp/fibonacci')
const { parentPort } = require('worker_threads')

// プールして使いまわせるようにするにはメインスレッドからメッセージの
// 受信を継続して待機し、受信のたびに実行する必要がある

// messageイベントの監視によりメインスレッドからのメッセージの受信を待機
// 受信したらフィボナッチ数を計算して結果をメインスレッドに送信
parentPort.on('message', (n) => parentPort.postMessage(fibonacci(n)))
