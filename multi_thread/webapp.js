// メインスレッド

'use strict'

const http = require('http')
const { Worker } = require('worker_threads')

http
  .createServer((req, res) => {
    const n = Number(req.url.substr(1))
    if (Number.isNaN(n)) {
      return res.end()
    }
    // コンストラクタの第二引数で値を渡しつつサブスレッドを生成
    new Worker(`${__dirname}/fibonacci.js`, { workerData: n })
      // サブスレッドから受け取った結果をレスポンスとして返す
      .on('message', (result) => res.end(result.toString()))
  })
  .listen(3000)

// Workerコンストラクタの第二引数でworkerDataに割り当てた値は
// サブスレッド側からworker_threads.WorkerDataとして参照可能

// サブスレッドからworker_threads.parentPort.postMessage()で送信されたメッセージは
// Workerインスタンスのmessageイベントで取得可能

// 起動確認
// $ node ./multi_thread/webapp

// フィボナッチ数の計算をwebアプリケーションを動かしているのとは別のスレッドで行うため
// 計算の完了を待たずに次のリクエストを処理できる
// しかし、webアプリケーションがリクエストの度に新しいスレッドを生成することによる
// オーバーヘッドがマルチスレッド化によるメリット上回ってしまいパフォーマンスが悪化する
