/**
 * 書き込みストリーム
 *
 * 書き込みストリームは読み込みストリームから流れてきたデータを受け取る
 * write()でデータを流し、すべてのデータを流し終えたらend()を実行する
 */

const fs = require('fs')

const fileWriteStream = fs.createWriteStream('dest.txt')

fileWriteStream.write('Hello\n')

fileWriteStream.write('World\n')

fileWriteStream.end()

fs.readFileSync('dest.txt', 'utf8')

// 読み込みストリームのpush()メソッドと書き込みストリームのwrite()メソッドは
// どちらもその戻り値で「それ以上データを流せるかどうか」を返す
// これはストリームの持つ「バックプレッシャ」という仕組みと関連する

// バックプレッシャとは、下流でデータを捌ききれていない状況を上流に伝えることで、
// 上流から過剰にデータを流しメモリを圧迫させないように制御する仕組み
