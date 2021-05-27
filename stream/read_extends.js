/**
 * 自前の読み込みストリームを実装するには
 * stream.Readableを継承して'_read()'を利用する
 */

const stream = require('stream')

class HelloReadableStream extends stream.Readable {
  constructor(options) {
    super(options)
    this.languages = ['JavaScript', 'Python', 'Java', 'C#']
  }

  // eslint-disable-next-line no-unused-vars
  _read(size) {
    console.log('_read()')

    let language
    while ((language = this.languages.shift())) {
      // push()でデータを流す
      // ただし、push()がfalseを返したらそれ以上流さない
      if (!this.push(`Hello, ${language}!\n`)) {
        console.log('読み込み中断')
        return
      }
    }

    // 最後にnullを流してストリームの終了を通知
    console.log('読み込み完了')
    this.push(null)
  }
}

// _read()の中ではpush()メソッドでこのストリームからのデータを流す
// push()はそれ以上のデータを流せるかどうかをbooleanで返すため、
// 読み込みストリームはこの値に基づいて追加のデータを流すか判断する

// falseを返されるとそこでデータの流れが一時停止するが、
// データを流せる状態になったら再度_read()が呼ばれる

// データを全て流し終わったら最後にnullを流してストリームの終了を通知

// _read()は'size'という引数を受け取り、push()を実行する際このsizeに合わせて
// データを送るような制御も可能だがsizeを無視しても問題ない

const helloReadableStream = new HelloReadableStream()
helloReadableStream
  .on('readable', () => {
    console.log('readable')
    let chunk
    while ((chunk = helloReadableStream.read()) !== null) {
      console.log(`chunk: ${chunk.toString()}`)
    }
  })
  .on('end', () => console.log('end'))

// console.log

// _read()
// 読み込み完了
// readable
// chunk: Hello, JavaScript!
// Hello, Python!
// Hello, Java!
// Hello, C#!
// end

// ↑この例ではデータのサイズが小さかっため、
// 一度の_read()の呼び出しで全データを流せたことがわかる

module.exports = HelloReadableStream

// 下記の様にdataイベントで読み込みストリーム扱う事も可能だが、
// データを読み込むタイミングが制御しにくい為非推奨
// readStream.on('data', (chunk) => console.log(chunk))
