/**
 * マルチプロセスで動かすための処理
 *
 * multi/webapp/index/をマルチプロセスで実行する
 */

'use strict'

const { fork, setupMaster } = require('cluster')

console.log('メインプロセス', process.pid)

// サブプロセスが実行するファイルの指定
setupMaster({ exec: `${__dirname}/index` })

// CPUコアの数だけプロセスをフォーク
const cpuCount = require('os').cpus().length
for (let i = 0; i < cpuCount; i++) {
  // フォークしたプロセスの情報などを保持するcluster.Workerインスタンスを返す
  const sub = fork()
  console.log('サブプロセス', sub.process.pid)
}

// clusterモジュールによるマルチプロセス化は上記のように
// setupMaster()メソッドを使ってサブブロセスを実行するファイルを指定して、
// CPUコアの数だけfork()を実行してプロセスをフォークする

// 並列度の上限はコアの数までなのでコア数以上にプロセスをフォークすることは意味がない
// 逆にプロセス間のコンテキストスイッチによるコストが発生する

// 負荷テスト
// node ./multi_process/webapp/multi_process/
// npx loadtest -c 100 -t 10 http://localhost:3000/30
