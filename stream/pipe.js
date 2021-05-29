/**
 * pipe()によるストリームの連結
 */

const HelloReadableStream = require('./read_extends')
const LineTransformStream = require('./transform')
const DelayLogStream = require('./write_extends')

// pipe()は読み込みストリームのメソッドで引数に書き込みストリームを取る
// 二重ストリームはpipe()メソッドを持つとともにその引数に指定することも可能

// ストリームのバックプレッシャの仕組みは複雑だがpipe()を使えば内部実装に任せられる
// その為、それらの詳細は意識せずとも「ストリームの基底クラスを継承し、
// _read(), _write(), _transform()の実装に注力する」の意識でよい

new HelloReadableStream()
  .pipe(new LineTransformStream())
  .pipe(new DelayLogStream())
  .on('finish', () => console.log('完了'))

// 原則、読み込みストリーム・書き込みストリームは完了時にそれぞれendイベント・finishイベントを発行するが
// 何らかの理由で発行されないままストリームが終了することがある（たとえばhttpモジュールを使った送信リクエストを途中で辞めた場合）
// そういった状況を考慮する必要がある場合にストリームの終了をハンドリングするのにstream.finished()が便利
// stream.finished()に渡したコールバックは、end・finish・errorイベントなしでストリームが終了した場合にも呼ばれる
