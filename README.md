# dentsu Mock Application

Next.js 14 + TypeScript + Material-UI を使用したモックアプリケーション

## 機能

### 1. ログイン画面
- ID/PASSワード入力（任意の値で認証可能）
- 営業職/アタリ職の選択

### 2. TOP画面
以下の3つのメニューから選択:
- 案件情報（営業情報）
- あたり情報
- 進捗管理

### 3. 営業情報
- 検索機能（広告主、タレント名、ステータス）
- 案件一覧表示
- 詳細/編集画面（タブ形式）
  - 基本情報
  - 金額
  - 出演情報
  - 営業情報
  - 事務所情報
  - 社内管理情報
- 新規作成機能

### 4. あたり情報
- 一覧表示
- 詳細/編集画面
- 新規作成機能

### 5. 進捗管理
- MUI DataGrid を使用したExcel風画面
- セル編集機能
- CRUD操作（作成/更新/削除）
- ページネーション

## 技術スタック

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **UI Library**: Material-UI v5
- **Data Grid**: MUI X DataGrid (free version)
- **State Management**: React Context API
- **Mock Data**: JSON files

## セットアップ

### 依存関係のインストール

```bash
npm install
```

### 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開きます。

### ビルド

```bash
npm run build
```

### 本番環境での起動

```bash
npm start
```

## ディレクトリ構成

```
mock-app/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # ログイン画面
│   ├── top/               # TOP画面
│   ├── eigyo/             # 営業情報
│   ├── atari/             # あたり情報
│   └── shinchoku/         # 進捗管理
├── components/            # 共通コンポーネント
│   └── Header.tsx
├── context/               # React Context
│   └── DataContext.tsx
├── data/                  # モックデータ (JSON)
│   ├── masters.json
│   ├── eigyo.json
│   ├── atari.json
│   └── shinchoku.json
└── types/                 # TypeScript型定義
    └── index.ts
```

## 使い方

1. ログイン画面で任意のID/PASSを入力してログイン
2. TOP画面から操作したい項目を選択
3. 各画面でデータの閲覧・作成・編集・削除が可能

## モックデータ

すべてのデータは JSON ファイルとして `data/` ディレクトリに保存されています。
アプリケーション実行中の変更は React の state で管理され、リロードすると初期状態に戻ります。

## モバイル対応

モバイルファーストデザインを採用しており、スマートフォンからタブレット、デスクトップまで対応しています。

## Docker + Basic認証

本番環境ではDocker + nginxでBasic認証を設定できます。

### ローカルでのテスト

```bash
# Docker Composeでビルド＆起動
docker-compose up --build

# ブラウザで http://localhost:8080 を開く
# デフォルト認証情報: admin / password123
```

### 環境変数

| 変数名 | 説明 | デフォルト値 |
|--------|------|--------------|
| `BASIC_AUTH_USER` | Basic認証のユーザー名 | admin |
| `BASIC_AUTH_PASSWORD` | Basic認証のパスワード | admin |

### Renderへのデプロイ

1. `render.yaml` を使用してBlueprint経由でデプロイ
2. Render Dashboardで環境変数を設定:
   - `BASIC_AUTH_USER`: 任意のユーザー名
   - `BASIC_AUTH_PASSWORD`: 強力なパスワード

### Docker単体でのビルド

```bash
# ビルド
docker build -t mock-app .

# 起動（Basic認証付き）
docker run -p 8080:80 \
  -e BASIC_AUTH_USER=myuser \
  -e BASIC_AUTH_PASSWORD=mypassword \
  mock-app
```
