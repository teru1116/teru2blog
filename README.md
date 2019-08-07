# このアプリケーションについて
フロントエンドにNuxt.js、バックエンドにFirebaseを用いたブログシステムです。  
Nuxt.jsはSPAモードで利用しています。  
データベースにFirestoreを使用しており、本番環境とステージング環境とで、別々のプロジェクトのFirestoreと連携しています。  
管理画面へのログインや、チャットで問い合わせしてきたサイト訪問者の識別にはFirebase Authenticationを使用しています。

# ローカル環境構築
``` bash
# まずは依存パッケージをインストールしてください。
$ yarn install
# localhost:3000でアプリケーションが起動します。ファイルの変更を保存すると即座に反映されます（ホットリロード）。
$ yarn dev
```

# デプロイ
SPAモードでビルドして、生成された静的ファイル群をFirebase Hostingにホスティングしています。

developブランチにpushすると、teru2blog-stagingプロジェクトのFirebase Hostingへ、
masterブランチにpushすると、teru2blogプロジェクトのFirebase Hostingへデプロイされます。

Travis CIを使っているので、デプロイまわりの設定は .travis.yml に記述されています。
`yarn install` 時のNode.jsバージョンは10.16.0ですが、`yarn build` 時は11.11.0になっています。

# 各ページ説明
## フロントページ（ユーザーページ）
### トップページ
#### 新着記事リスト
ストアのarticlesを表示しています。
#### 記事ページ
ストアのarticleを表示しています。
#### チャット
ストアの`messages`を表示しています。  
サイト訪問者にはFirebase Authenticationの匿名認証が行われ、そこで発行された`uid`がすなわちその訪問者とサイト運営者のチャットルームIDとなります。  
このルームIDでメッセージを取得し、`messages`に展開しています。
## 管理画面
### ログイン
Firebase Authenticationのメールアドレス認証（ `signInWithEmailAndPassword()` メソッド ）を使っています。
### 記事一覧
### 記事編集
#### WYSIWYGエディタ
### 記事プレビュー
### チャット応対ページ
スマホは別ページのように見せているが、

# ソースコード
## layouts
**admin.vue** 管理画面のヘッダー  
**site.vue** フロントページのヘッダー、チャットのウィジェット、フッター
## middleware
**authAdmin.js** 認証されていない状態で管理画面のログインページ以外にアクセスされた場合、管理画面ログインページにリダイレクトさせています。
**initEditingArticle.js** 管理画面の記事作成ページを開いた時に、ストア `editingArticle` を初期化し、記事IDを生成してストア `editingArticle` にセットしています。
## plugins
**firebase.js** Nuxtアプリ起動時にFirebaseオブジェクトにプロジェクトID等を渡して初期化しています。  
**isMobile.js** スマホ判定を全コンポーネントで行えるよう、 `Vue.prototype` にスマホ判定値をセットしています。

# テスト
## 単体テスト
### コンポーネント
### Vuex
引数を渡してアクションを実行した結果、ステートが期待通りの値に変わっているかをアサーションしています。  
単体テストというより結合テストと言うべきかもしれません。  
テスト実行時につないでいるFirestoreはステージング環境のそれではありますが、  
Firestoreのデータ変更を伴うようなアクションを実行する場合は、必ずテストの最後にその変更をリセットするようにしています。

#### 課題
Firestoreをリッスンするメソッド`onSnapshot()`に関わるテストを書くことができていません。  
他のアクションとは違い、`onSnapshot()`はPromiseではなくコールバックなので `await`演算子での待機ができません。  
タイマーで数秒間待機させるようなテストコードが必要かもしれません。

## E2Eテスト
