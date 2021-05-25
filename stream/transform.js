/**
 * 二重ストリームと変換ストリーム
 *
 * 二重ストリームは読み込みと書き込みの両方が可能なストリーム
 * 自前の二重ストリームを作るにはstream.Duplexを継承し_read()と_write()を実装する
 *
 * 変換ストリームは二重ストリームの中でも読み込んだデータを変換して下流に流す（書き込む）ストリーム
 * 自前の変換ストリームを作るにはstream.Transformを継承して
 * _transfrom()と_flush()メソッドを実装する
 */

const stream = require('stream')

// 文字列データを行単位でDelayLogStramが受け取れる形式のオブジェクトに変換するストリーム
class LineTransformStream extends stream.Transform {
  constructor(options) {
    super({ readableObjectMode: true, ...options })
    // 上流から受け取ったデータのうち、下流に流していない分を保持するフィールド
    this.remaining = ''
  }

  // _transform()では流されたデータの最終行を次のデータと一緒に処理するため
  // remainingというインスタンス変数に保持している
  _transform(chunk, encoding, callback) {
    console.log('_tranform()')
    const lines = (chunk + this.remaining).split(/\n/)
    // 最後の行は次に入ってくるデータの先頭と同じ行になるため変数に保持
    this.remaining = lines.pop()
    for (const line of lines) {
      // 変換ストリームのpush()の戻り値は無視してよいと考えられている
      // 上流のストリームにバックプレッシャを伝搬する手段がないため
      this.push({ message: line, delay: line.length * 100 })
    }
    callback()
  }

  // 上流からデータを流し終わったタイミングで実行され、引数にcallbackをとる
  _flush(callback) {
    console.log('_flush()')
    // 残っているデータを流し切る
    this.push({
      message: this.remaining,
      delay: this.remaining.length * 100,
    })
    callback()
  }
}

// 変換ストリームにデータを流す
const lineTransformStream = new LineTransformStream()
lineTransformStream.on('readable', () => {
  let chunk
  while ((chunk = lineTransformStream.read()) !== null) {
    console.log(chunk)
  }
})

lineTransformStream.write('foo\nbar')

lineTransformStream.write('baz')

lineTransformStream.end()
