/**
 * ストリーム
 *
 * ストリームとはデータの流れを扱うためのインターフェース
 * 効率的な処理を実現できることに加え、複数の機能を容易に結合できることも強み
 */
const fs = require('fs')
const crypto = require('crypto')

// ストリームを使わない（あえて冗長な）ファイルをコピーする関数
function copyFile(src, dest, cb) {
  fs.readFile(src, (err, data) => {
    if (err) {
      return cb(err)
    }

    // 読み込んだ内容を別のファイルに書き出す
    fs.writeFile(dest, data, cb)
  })
}

// 対象のファイルが大きくなければ問題なく動作するが2GB以上になるとエラーを投げる
copyFile('./README.md', './README_copy.md', (err) => console.log(err))
// 2GB以上になるとNode.jsで扱えるバッファサイズの上限を超過してしまう
// バッファサイズの範囲内であっても、大きなファイルの読み込み結果全体が
// メモリ上に展開されるとメモリが圧縮されてパフォーマンスに影響がでる

// その問題を解決するためには、全ファイルの読み込みが完了してからその内容を書き出すのではなく
// 読み込みが完了した部分から順次書き込んでいくような処理を実現する必要がある
// これを「ストリーム」という

/**
 * ストリームの基本
 */

// 上記copyFile()をストリームを使って書き替えた例
function copyFileWithStream(src, dest, cb) {
  // ファイルから読み込みストリームを生成
  fs.createReadStream(src)
    // ファイルから書き込みストリームを生成し、pipe()で繋ぐ
    .pipe(fs.createWriteStream(dest))
    // 完了時にコールバックを呼び出す
    .on('finish', cb)
}

// 読み込み・書き込みストリームはEventEmitterのインスタンス
// pipe()で繋げられたストリーム同士が各種イベントを介して連携しデータが受け渡される

fs.writeFileSync('src.txt', 'Hello World!')
setTimeout(() => {
  copyFileWithStream('./README.md', 'dest.txt', () => console.log('コピー完了'))
}, 1000)

/**
 * ストリームを使うとコピーするさいにファイル内容を暗号化するといった機能追加が容易
 */
fs.createReadStream('src.txt')
  .pipe(crypto.createHash('sha256'))
  .pipe(fs.createWriteStream('dest_crypto.txt'))
  .on('finish', () => console.log('暗号化された文字列にコピー完了'))
