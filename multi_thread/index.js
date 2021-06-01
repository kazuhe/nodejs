/**
 * worker_threadsモジュールによるマルチスレッド化
 *
 * アプリケーション内部でCPU負荷の高い処理を並列化する場合に適している。
 * Webアプリケーションそのものを並列に動かす場合（各プロセスが独立して動作し
 * 通信を必要としないような場合）はマルチプロセスが適している。
 */

// マルチスレッドは異なるプロセス同士よりも効率的に通信が可能
// マルチスレッド化のための機能であるworker_threadsモジュールは
// Web標準のWebワーカーと同様の機能を提供する

'use strict'

const { Worker, threadId } = require('worker_threads')

console.log('メインスレッド', threadId)

// CPUコアの数だけスレッドを起動
const cpuCount = require('os').cpus().length
for (let i = 0; i < cpuCount; i++) {
  // サブスレッドで実行するファイルのパスを指定してWorkerをnew
  // マルチプロセス（'/multi_process/webapp/'）を利用
  const worker = new Worker(`${__dirname}/../multi_process/webapp/index.js`)
  console.log('サブスレッド', worker.threadId)
}

// clusterモジュールによるマルチプロセス化と異なり、
// worker_threadが生成したスレッド同士はポートを共有できない
