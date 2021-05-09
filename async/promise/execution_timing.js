/**
 * then(), catch(), finally()に渡すコールバックは全て
 * Promiseの状態に関わらず非同期的に実行される
 */
// console.log()は非同期処理ではないがthen()のコールバックなので非同期で実行される
Promise.resolve('foo').then((result) => console.log('collback', result))
console.log('Will be executed first')
