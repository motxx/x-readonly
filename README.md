# X Read-Only

X (Twitter) でポスト・リポスト・返信をできなくし、閲覧だけを許可する Chrome 拡張。

## 仕組み

- `declarativeNetRequest` で CreateTweet / CreateRetweet などの GraphQL API をブロック(UI をすり抜けても送信できない)
- CSS で投稿・リポスト・返信ボタンと投稿欄を非表示
- `/compose/post` への遷移と `n` ショートカットを無効化

いいね・ブックマーク・DM・検索など閲覧系の操作は影響を受けません。

## インストール

1. `chrome://extensions` を開く
2. 「デベロッパーモード」を ON
3. 「パッケージ化されていない拡張機能を読み込む」でこのディレクトリを選択

## 免責事項

無保証・自己責任でご利用ください。
