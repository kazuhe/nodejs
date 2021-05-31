/**
 * IPC
 *
 * clusterモジュールによってフォークされたプロセス同士は
 * IPC（プロセス間通信）チャンネルを介して通信できる
 */

// multi/webappを一部修正してIPCの挙動確認

'use strict'

const http = require('http')
const fibonacci = require('../webapp/fibonacci')
const pid = process.pid

// IPCでメッセージを受信して指定されたポート番号でWebサーバを起動
process.on('message', (port) => {
  console.log(pid, `ポート${port}でWebサーバを起動します`)
  http
    .createServer((req, res) => {
      const n = Number(req.url.substr(1))
      if (Number.isNaN(n)) {
        // Number.isNaN()で数値化どうか判定し、数値でなかった場合は無視
        return res.end()
      }
      const response = fibonacci(n)
      // 結果をIPCで送信
      process.send({ pid, response })
      res.end(response.toString())
    })
    .listen(port)
})
