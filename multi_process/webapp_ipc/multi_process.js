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
  // IPCでサブプロセスにポート番号を送信
  sub.send(3000)
  // IPCで受信したメッセージをハンドリング
  sub.on('message', ({ pid, response }) =>
    console.log(process.pid, `${pid}が${response}を返します`)
  )
}

// fork()の返すcluster.Workerインスタンスに対して、.send()と
// .on('message', <ハンドラ>)でそれぞれIPCでのメッセージ送信と受信を行っている

// このファイルを実行すると、メインプロセスからサブプロセスにメッセージが送信され、
// Webサーバーを起動することができる
