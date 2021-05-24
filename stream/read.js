/**
 * 読み込みストリーム
 *
 * 読み込みストリームは読み込みが可能になると'readable'イベントを発効し、
 * そのリスナの中でread()メソッドによるデータの読み込みが可能となる
 */

const fs = require('fs')

const readStream = fs.createReadStream('./README.md')
readStream
  // readableイベントリスナの登録
  .on('readable', () => {
    console.log('readable')
    let chunk
    // 現在読み込み可能なデータを全て読み込む
    while ((chunk = readStream.read()) !== null) {
      console.log(`chunk: ${chunk.toString()}`)
    }
  })
  // endイベントリスナの登録
  .on('end', () => console.log('end'))

// 読み込み対象のファイルサイズが大きくなると、
// ファイルの内容は複数回の'readable'イベントに分かれて入ってくる。
// 結果として、fs.reaFile()ではエラーを引き起こしてしまう2GB以上のファイルでも
// 上記のようなストリームを使った実装では問題なく読み込みが可能
