/**
 * スレッド間での値の転送
 *
 * スレッド間ではプロセス間と異なりメモリを共有できるので値をコピーしないで他スレッドに渡すことが可能
 */

// postMessage()やWorkerのインスタンス化時に転送対象のオブジェクトを指定すると
// そのオブジェクトはコピーされることなく他スレッドに渡され所有権も譲渡される
// 元のスレッドではそのオブジェクトは使用できなくなるがコピーによるオーバーヘッドがないため高パフォーマンス

// 転送可能オブジェクトは以下
// ・ArrayBuffer: 固定長のバイナリデータを表すオブジェクト
// ・MessagePort: スレッド間通信のためのポートを表すオブジェクト
// ・FileHandle: ファイル奇術師のラッパーオブジェクト

const useMaybeTransfer = require('./main_thread')

// 転送を利用する場合
useMaybeTransfer(true)
// console.log
// ArrayBuffer { (detached), byteLength: 0 }
// サブスレッドから値が戻ってくるまでの経過時間 2025.8119989931583

// 転送を利用しない場合
console.log('転送を利用しない場合')
useMaybeTransfer(false)
// console.log
// ArrayBuffer {
//   [Uint8Contents]: <00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 ... 1073741724 more bytes>,
//   byteLength: 1073741824
// }
// サブスレッドから値が戻ってくるまでの経過時間 3524.602445989847

// ++++++++++++++++++++++++++

// 転送を使うことによってパフォーマンスが大幅に改善できることが分かる
// また、ArrayBufferオブジェクトを転送すると転送元ではその値が空になっていることもわかる
