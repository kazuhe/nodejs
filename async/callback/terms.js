const fs = require('fs')
/**
 * Node.jsのコールバックによる非同期処理の規約
 *
 * 1. コールバックがパラメータの最後にあること
 * 2. コールバックの最初のパラメータが処理中に発生したエラーで
 *    2つめ以降のパラメータが処理の結果であること
 *
 * これはNode.jsのコアAPIだけでなく
 * npmに公開されたモジュールの多くが遵守している
 */

// fs.readdir()は指定したディレクトリに存在するファイル一覧を返す
// これは先の規約に沿っている良い例
fs.readdir('./', (err, files) => {
  console.log('[fs.readdir] Run fs.readdir()')
  console.log('error: ', err)
  console.log('files: ', files)
})

// setTimeout()は先の規約を守っていない
// これはブラウザのJavaScriptのAPIに由来しており
// Node.jsでも概ねそのまま取り込んでいる為
setTimeout(() => {
  console.log('[setTimeout] 1 second has passed')
}, 1000)

console.log('Module final processing')
