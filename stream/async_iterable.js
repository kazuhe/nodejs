/**
 * 読み込みストリームとasyncイテラブルの互換性
 */
const stream = require('stream')
const util = require('util')
const fs = require('fs')
const HelloReadableStream = require('./read_extends')

// 読み込みストリームは[Symbol.asyncIterator]()メソッドを
// 実装したasyncイテラブルなので、そのままfor await...ofに渡してループできる
const helloReadableStream = new HelloReadableStream().on('end', () =>
  console.log('完了')
)

;(async () => {
  for await (const data of helloReadableStream) {
    console.log('data', data.toString())
  }
})()

// for await...ofではループが回るたびにasynイテレータのnext()メソッドが実行され、
// その戻り値としてデータが返される

// stream.Readable.from()メソッドを使うと任意のasyncイテラブルかた読み込みストリームを作れる
// したがって、たとえばasyncジェネレータ関数から簡単に読み込みストリームを作ることが可能
async function* asyncGenerator() {
  let i = 0
  while (i <= 3) {
    await new Promise((resolve) => setTimeout(resolve, 100))
    // 読み込みストリームとして利用するため数値は使えないことに注意
    yield `${i++}`
  }
}

// asyncジェネレータ関数からasyncイテラブルを生成
const asyncIterable = asyncGenerator()

// asyncイテラブルから読み込みストリームを生成
const readableFromAsyncIterable = stream.Readable.from(asyncIterable)

readableFromAsyncIterable.on('data', console.log)

// stream.pipeline()の引数として渡す際はstream.Readable.from()を使わなくても
// イテラブルやasyncイテラブルをそのまま渡せる
util.promisify(stream.pipeline)(
  asyncGenerator(),
  fs.createWriteStream('dest.txt')
)

// 自前で読み込みストリームを実装するために、stream.Readableを継承する方法もあるが
// 特に非同期処理が絡む場合はasyncジェネレータ関数を使う方が簡単なこともある
