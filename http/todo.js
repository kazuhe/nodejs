const http = require('http')

const todos = [
  { id: 1, title: 'foo', completed: false },
  { id: 2, title: 'bar', completed: true },
]

// HTTPサーバの初期化
const server = http
  // req: 読み込みストリーム, res: 書き込みストリーム
  .createServer((req, res) => {
    // リクエストのURLやHTTPメソッドに応じて適切なレスポンスを返す
    if (req.url === '/api/todos') {
      if (req.method === 'GET') {
        // GETメソッドの場合、全todoをJSON形式で返す
        res.setHeader('Content-Type', 'application/json')
        return res.end(JSON.stringify(todos))
      }

      // GET以外のHTTOメソッドはサポートしないため405(Method Not Allowed)
      res.statusCode = 405
    } else {
      // /api/todos以外のURLはないので404(Not Found)
      res.statusCode = 404
    }
    res.end()
  })
  .listen(3000)

// HTTPサーバに対してGETリクエスト
http
  // request()メソッドは書き込みストリームであるhttp.ClientRequestオブジェクトを返す
  // コールバックの引数resは読み込みストリーム
  .request('http://localhost:3000/api/todos', (res) => {
    let responseData = ''
    console.log('statusCode', res.statusCode)
    res.on('data', (chunk) => (responseData += chunk)) // データの蓄積
    res.on('end', () => console.log('responseData', JSON.parse(responseData))) // endのタイミングで出力
  })
  // end()メソッドを実行したタイミングでリクエストを送信される
  .end()

// サーバを停止
setTimeout(() => server.close(), 1000)
