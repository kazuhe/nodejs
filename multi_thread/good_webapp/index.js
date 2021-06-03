/**
 * bad_webappにスレッドプールを実装してパフォーマンスを改善
 */

// bad_webappの様にマルチスレッドでの処理が継続的に発生する場合は、
// 生成したスレッドをプールして使いまわさなければマルチスレッドの恩恵をうけられない
// Node.jsのコアAPIではスレッドプールの機能が提供されていないため独自に実装する必要がある

'use strict'

const http = require('http')
const cpuCount = require('os').cpus().length
const ThreadPool = require('./thread_pool')

// CPUのコア数と同じサイズのスレッドプールを生成
const threadPool = new ThreadPool(cpuCount, `${__dirname}/fibonacci.js`)

http
  .createServer(async (req, res) => {
    const n = Number(req.url.substr(1))
    if (Number.isNaN(n)) {
      return res.end()
    }
    const result = await threadPool.executeInThread(n)
    res.end(result.toString())
  })
  .listen(3000)
