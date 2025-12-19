# コーディングルール

## 基本方針

### 1. コンポーネント設計
- **1ページ1ファイルの原則は守るが、表示用コンポーネントは分割する**
- セクション単位でコンポーネントを分離し、再利用性とメンテナンス性を確保
- 画面全体のロジックはページコンポーネントで管理
- 表示・UI部分は別コンポーネントに切り出す

### 2. ディレクトリ構成
```
components/
├── common/          # 全体で使用する共通コンポーネント
│   ├── Header.tsx
│   ├── SectionTitle.tsx
│   └── EditableTable.tsx
├── eigyo/          # 営業情報専用コンポーネント
│   ├── EigyoBasicInfoSection.tsx
│   ├── EigyoKingakuSection.tsx
│   └── ...
├── atari/          # あたり情報専用コンポーネント
└── shinchoku/      # 進捗管理専用コンポーネント
```

### 3. コンポーネント分割の基準

#### 分割すべきケース
- 100行以上のセクション
- 複数箇所で使用される可能性があるUI
- 独立したビジネスロジックを持つ部分
- 繰り返し構造（テーブル、リストなど）

#### 分割しないケース  
- 20-30行程度の単純なフォーム
- ページ固有の一度きりのUI
- 他では使用しない特殊な構造

### 4. Props設計
```typescript
interface ComponentProps {
  // データは直接渡さず、必要な部分のみ
  data: { field1: string; field2: number };
  // 更新は関数として渡す
  onChange: (field: string, value: any) => void;
  // マスターデータは必要な分だけ
  options?: SelectOption[];
}
```

### 5. Material-UI使用ルール
- **全てのInputは`size="small"`を使用**
- セクションタイトルは`Typography variant="subtitle2" color="primary"`
- 項目間の余白は`spacing={1.5}`または`spacing={2.5}`（セクション間）
- 金額フィールドには万円表示のhelperTextを追加

### 6. 表形式データの扱い
- 繰り返し項目（DCE担当者、出演料単価など）は`<table>`で表示
- 各行は交互に背景色を変える（#fafafa）
- ヘッダー行は`backgroundColor: '#f5f5f5'`
- セル内のフォームは`size="small"`

### 7. 命名規則
- コンポーネント名: PascalCase（例: `EigyoBasicInfoSection`）
- ファイル名: PascalCase.tsx（例: `EigyoBasicInfoSection.tsx`）
- Props interface: `[ComponentName]Props`
- イベントハンドラー: `handle[Action]`（例: `handleSave`, `handleChange`）

### 8. 状態管理
- ページレベルの状態は親コンポーネント（page.tsx）で管理
- セクションコンポーネントは受け取ったpropsを表示し、変更をcallbackで通知
- グローバルな状態はDataContextを使用

### 9. TypeScript
- `any`の使用は最小限に（動的なプロパティアクセスのみ許可）
- 全ての関数に戻り値の型を明示（推論可能な場合は省略可）
- Props interfaceは必須

### 10. コメント
- セクションの開始には`{/* セクション名 */}`
- 複雑なロジックには簡潔な説明を追加
- 日本語コメントOK

### 11. レスポンシブ対応
- モバイルファースト
- `sx={{ display: 'flex', gap: 1.5 }}`で横並び
- 必要に応じて`flexDirection: { xs: 'column', md: 'row' }`でブレークポイント対応

### 12. ファイル構成の例
```typescript
// app/eigyo/[id]/page.tsx (ページコンポーネント - ロジック管理)
'use client';
import { セクションコンポーネント群 } from '@/components/eigyo';

export default function Page() {
  // 状態管理
  // イベントハンドラー
  // ページ全体の構造
  return (
    <>
      <Header />
      <セクション1 data={...} onChange={...} />
      <セクション2 data={...} onChange={...} />
    </>
  );
}

// components/eigyo/EigyoBasicInfoSection.tsx (表示コンポーネント)
interface EigyoBasicInfoSectionProps {
  data: {...};
  onChange: (updates: Partial<EigyoInfo>) => void;
  masters: MasterData;
}

export default function EigyoBasicInfoSection({ data, onChange, masters }: Props) {
  // 表示ロジックのみ
  return <Box>...</Box>;
}
```

## チェックリスト

新規コンポーネント作成時：
- [ ] Props interfaceを定義
- [ ] TypeScriptの型チェックが通る
- [ ] size="small"を全てのInputに適用
- [ ] セクションタイトルを適切に配置
- [ ] 必要に応じて表形式を使用
- [ ] モバイルで表示崩れがないか確認


