const { performance } = require('perf_hooks')
const worker_threads = require('worker_threads')

/**
 * useMaybeTransfer
 *
 * @param {boolean} tranfer - 転送を使うか否か
 */
module.exports = function useMaybeTransfer(tranfer) {
  // 1GBのArrayBufferを生成
  const buffer = new ArrayBuffer(1024 * 1024 * 1024)

  // 現在時刻を記録
  const start = performance.now()

  new worker_threads.Worker(`${__dirname}/sub_thread.js`, {
    workerData: { buffer, tranfer },
    // transferListプロパティに転送対象オブジェクトを指定
    transferList: tranfer ? [buffer] : [],
  }).on('message', () =>
    console.log(
      'サブスレッドから値が戻ってくるまでの経過時間',
      performance.now() - start
    )
  )
  console.log(buffer)
}
