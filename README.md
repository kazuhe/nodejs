# nodejs
Node.jsの言語仕様をmemo的にまとめたリポジトリ

# Node.jsの特徴
* 並行処理をマルチスレッドではなくイベントループによって実現
* スモールコアの哲学とnpmの豊かなエコシステム
* 関心の分離を促進するCommonJSモジュールによるモジュールシステム
* W3CやWHATWGによって策定されているWeb標準のAPIも一部取り込まれている

# nodeコマンド

### REPL関連
```bash
# 開始
$ node

# エディターモード
> .editor
```

### ファイルに記述したコードをそのまま実行
```bash
$ node <FileName>
```

# 参考

### ハンズオンNode.js
オライリー・ジャパン発行書籍[ハンズオンNode.js](https://www.oreilly.co.jp/books/9784873119236/)のサポートリポジトリ。  
https://github.com/oreilly-japan/hands-on-nodejs

### node.jreen
Node.jsのECMAScript標準対応状況を確認できるサイト。  
https://node.green/