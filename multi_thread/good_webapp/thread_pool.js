/**
 * メッセージを繰り返し送信して使いまわせるようにファイルの実行スレッドをプールさせる関数
 */

'use strict'

// どのアプリケーションからも汎用的に使えるよう、
// ・生成するスレッドの数
// ・Workerコンストラクタの第一、第二引数（サブスレッドで実行するファイルとオプション）
// は利用元から指定できるようにしておく

// リクエストを受け付けた時、空いているスレッドがあればそれを使って処理するが、なければキューに積む
// それぞれのスレッドは割り当てられた処理が完了したらキューからリクエストを取り出して実行する

const { Worker } = require('worker_threads')

module.exports = class ThreadPool {
  constructor(size, filePath, options) {
    // 空きスレッド
    this.availableWorkers = []

    // キューを初期化
    this.queue = []

    // 引数で指定されたとおりにスレッドを生成してプール
    for (let i = 0; i < size; i++) {
      this.availableWorkers.push(new Worker(filePath, options))
    }
  }

  // 外部からの処理要求を受け付けるメソッド
  executeInThread(arg) {
    return new Promise((resolve) => {
      const request = { resolve, arg }

      // 空きスレッドがあればリクエストを処理し、なければキューに積む
      const worker = this.availableWorkers.pop()
      worker ? this.process(worker, request) : this.queue.push(request)
    })
  }

  // 実際にスレッドで処理を実行する
  process(worker, { resolve, arg }) {
    worker.once('message', (result) => {
      // リクエスト元に結果を返す
      resolve(result)

      // キューに積まれたリクエストがあれば処理し、なければ空きスレッドに戻す
      const request = this.queue.shift()
      request
        ? this.process(worker, request)
        : this.availableWorkers.push(worker)
    })
    worker.postMessage(arg)
  }
}
