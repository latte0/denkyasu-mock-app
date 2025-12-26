# dentsu Mock Application - 使用方法

## 環境設定

### OpenAI API キーの設定（音声認識機能に必要）

1. [OpenAI Platform](https://platform.openai.com/api-keys) でAPIキーを取得
2. `mock-app/.env.local` ファイルを作成し、以下を記載:

```bash
OPENAI_API_KEY=sk-your-api-key-here
```

---

## アプリケーションの起動

### 開発モードで起動

```bash
cd /Users/kazuyukijimbo/kiei/denkyasu/mock-app
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) にアクセス

### 本番ビルド

```bash
npm run build
npm start
```

## 機能概要

### 1. ログイン
- 任意のID/パスワードでログイン可能（モック）
- 営業職/アタリ職の選択

### 2. TOP画面
3つのメニューから選択:
- 案件情報（営業情報）
- あたり情報  
- 進捗管理

### 3. 営業情報
- 検索・一覧表示
- 詳細表示/編集（タブ形式）
- 新規作成
- 浮動アクションボタンで新規作成

### 4. あたり情報
- 一覧表示
- 詳細表示/編集
- 新規作成
- 浮動アクションボタンで新規作成

### 5. 進捗管理
- Excel風グリッド表示
- セル直接編集
- 行の追加/削除
- ページネーション

### 6. 音声アップロード
- 音声ファイル（mp3, wav, m4a）のアップロード
- OpenAI Whisper APIによる自動文字起こし
- GPT-4による営業情報の自動抽出
- 文字起こし結果の編集
- 営業タスクへの自動転記

## データについて

- すべてのデータは`data/`ディレクトリのJSONファイルに格納
- アプリ実行中の変更はReact stateで管理
- ページリロード時は初期データに戻る

## 注意事項

現在、ビルドは成功していますが、実行時にClient Component関連のエラーが発生する可能性があります。
これは開発サーバー（`npm run dev`）で実行すると回避できることがあります。

## トラブルシューティング

### ビルドエラーが発生する場合

```bash
rm -rf .next
npm run dev
```

### 依存関係の問題

```bash
rm -rf node_modules package-lock.json
npm install
```


