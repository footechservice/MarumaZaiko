# マルマ松本商店 在庫管理システム

紋別漁師食堂（スマホ）と北浜工場（PC）をつなぐ在庫管理システムです。

## ファイル構成

| ファイル | 用途 |
|---|---|
| `mobile.html` | スマホ版アプリ（食堂スタッフ用） |
| `pc.html` | PC版ダッシュボード（工場・管理用） |
| `gas_code.js` | Google Apps Script（このファイルの内容をGASに貼り付ける） |

---

## セットアップ手順

### ステップ① GitHubリポジトリを作成する

1. https://github.com にログイン
2. 右上の「＋」→「New repository」をクリック
3. Repository name に `maruma-inventory` と入力
4. 「Public」を選択（GitHub Pagesに必要）
5. 「Create repository」をクリック

### ステップ② ファイルをアップロードする

1. 作成したリポジトリのページで「uploading an existing file」をクリック
2. `mobile.html` と `pc.html` をドラッグ＆ドロップ
3. 「Commit changes」をクリック

### ステップ③ GitHub Pagesを有効にする

1. リポジトリの「Settings」タブをクリック
2. 左メニューの「Pages」をクリック
3. Source で「Deploy from a branch」を選択
4. Branch で「main」と「/ (root)」を選択して「Save」
5. 数分後にURLが表示される（例：https://あなたのID.github.io/maruma-inventory/）

### ステップ④ Google Apps Scriptを設定する

1. https://script.google.com にアクセス
2. 「新しいプロジェクト」をクリック
3. `gas_code.js` の内容を全てコピーして貼り付け
4. プロジェクト名を「マルマ松本商店_在庫管理」に変更
5. 「デプロイ」→「新しいデプロイ」をクリック
6. 種類：「ウェブアプリ」を選択
7. 「次のユーザーとして実行」→「自分」
8. 「アクセスできるユーザー」→「全員」
9. 「デプロイ」をクリック
10. 表示されたURLをコピーする（https://script.google.com/macros/s/.../exec）

### ステップ⑤ アプリにURLを設定する

**スマホ版：**
1. mobile.html を開く
2. 「＋ 追加」タブの一番下「Google Apps Script URL 設定」に貼り付け

**PC版：**
1. pc.html を開く
2. 左メニュー「設定」→「Google Apps Script URL」に貼り付け

---

## LINE通知の設定

1. https://notify-bot.line.me/ja/ にLINEでログイン
2. 「トークンを発行する」をクリック
3. 通知名を入力（例：在庫発注通知）
4. 送信先グループを選択（例：北浜工場グループ）
5. 発行されたトークンをアプリの「LINE Notify 設定」に貼り付け

---

## アクセスURL（設定後）

- スマホ版：https://あなたのID.github.io/maruma-inventory/mobile.html
- PC版：https://あなたのID.github.io/maruma-inventory/pc.html

このURLをLINEで共有するだけでスタッフ全員が使えます。
