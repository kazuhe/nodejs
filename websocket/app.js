'use strict'

const http = require('http')
const next = require('next')
const Server = require('socket.io')

let todos = [
  { id: 1, title: 'foo', completed: false },
  { id: 2, title: 'bar', completed: true },
]

// todoの値を管理するための変数
let id = 2

const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })

nextApp.prepare().then(() => {
  // Next.jsのリクエストハンドラを引数にhttp.createServer()を実行してページのルーティングを行う
  const server = http.createServer(nextApp.getRequestHandler()).listen(3000)

  // http.Serverインスタンスを使ってSocket.IOのServerインスタンス(EventEmitter)を生成
  const io = Server(server)

  // /todos名前空間で接続待機
  const ioTodos = io.of('/todos')
  // 新しいクライアントからの接続に伴うconnectionイベント
  ioTodos.on('connection', (socket) => {
    console.log('connected')
    // 接続したクライアントにtodo一覧を送信
    socket.emit('todos', todos)

    // 接続したクライアントからの各種イベントに対応
    socket
      // todoの作成
      .on('createTodo', (title) => {
        if (typeof title !== 'string' || !title) return
        const todo = { id: id++, title, completed: false }
        todos.push(todo)
        ioTodos.emit('todos', todos)
      })

      // todoのcompletedの更新
      .on('updateCompleted', (id, completed) => {
        todos = todos.map((todo) =>
          todo.id === id ? { ...todo, completed } : todo
        )
        ioTodos.emit('todos', todos)
      })

      // todo削除
      .on('deleteTodo', (id) => {
        todos = todos.filter((todo) => todo.id !== id)
        ioTodos.emit('todos', todos)
      })
  }),
    (err) => {
      console.error(err)
      process.exit(1)
    }
})

/*
// 新しいクライアントからの接続に伴うconnectionイベント
io.on('connection', (socket) => {
  // 任意のイベント名でクライアントにデータを送信
  socket.emit('greeting', 'Hello')
  // 任意のイベント名でクライアントからデータを受信
  socket.on('registerName', (name) => {
    // 接続している全クライアントに任意のイベント名でデータを送信
    io.emit('notifyNewComer', `${name} joined`)

    // または、このSocketインスタンスを介して接続しているクライアント以外の全クライアントにデータを送信
    socket.broadcast.emit('notifyNewComer', `${name} joined`)
  })
})

// 任意の名前空間を指定してその中でクライアントとのやりとりを実装できる
io.of('/namespace1').on('connection', (socket) => {
  // この名前空間に接続する全クライアントにデータを送信
  io.of('/namespace1').emit('someEvent', 'foo')
})
*/
