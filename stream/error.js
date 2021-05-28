/**
 * エラーハンドリングとstream.pipeline()
 *
 * 各種ストリームはEventEmitterのインスタンスなので
 * errorインスタンスによってエラーを通知する
 *
 * ストリームのエラーハンドリングではpipe()がエラーが伝搬しないことに注意
 */

const fs = require('fs')
const util = require('util')
const stream = require('stream')

// ダメな例：エラーがerrorイベントをすり抜けてしまう
/**
fs.createReadStream('no-such-file.txt')
  .pipe(fs.createWriteStream('dest.txt'))
  .on('error', (err) => console.log('Error event!', err.message))
*/

// 適切な例：読み込みストリームに対してもerrorイベントをon()する必要がある
fs.createReadStream('no-such-file.txt')
  .on('error', (err) => console.log('Error event!', err.message))
  .pipe(fs.createWriteStream('dest.txt'))
  .on('error', (err) => console.log('Error event!', err.message))

// 下流のストリームでエラーが発生した場合、そのストリームは上流のストリームから
// 自動的に切り離される（unpipe()）が、上流のストリーは破棄（destroy()）されない
// ストリームは分岐可能で下流のストリームがエラー終了しても上流から別ストリームに
// 分岐されている可能性も存在するためである

// しかし、ストリームが分岐していない場合はメモリリークに繋がるので
// 下流のストリームのerrorベントの中で明示的に上流ストリームの破棄が必要

// 解決策はstream.pipeline()を使ってストリームを連結する
stream.pipeline(
  // pipe()したい2つ以上のストリーム
  fs.createReadStream('no-such-file.txt'),
  fs.createWriteStream('dest.txt'),

  // コールバック
  (err) => (err ? console.log('Error pipeline') : console.log('正常終了'))
)

// stream.pipeline()は2つ以上のストリームを引数に取りそれらをpipe()で連結する
// 連結したストリームのどこかでエラーが発生した場合は最後の引数として渡した
// コールバックがそのエラーを引数に実行される
// また、エラーの発生なく終了した場合はコールバックが引数なく終了する
// いずれの場合も引数に渡したストリームはすべて自動的に破棄される

// この関数はNode.jsのコールバックによる非同期処理の規約に準拠している
// つまり、util.promisify()によるPromise化が可能
const promisePipeline = async () => {
  try {
    await util.promisify(stream.pipeline)(
      fs.createReadStream('no-such-file.txt'),
      fs.createWriteStream('dest.txt')
    )
    console.log('[promisePipeline] 正常終了')
  } catch (err) {
    console.log('[promisePipeline] エラー発生', err.message)
  }
}
promisePipeline()

// [まとめ]
// エラーハンドリングが必要なケースでは、ストリームの連結にpipe()メソッドを用いるより
// stream.pipeline()を使用する方が適している
// util.promisify()で用意にPromise化できることも魅力
