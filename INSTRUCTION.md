# 高松市オープンデータ作業説明書

## 新規データの追加方法

### 1. ディレクトリを作成
- https://github.com/takamatsu-city/opendata/tree/main/data に移動して下さい。
- 「Create new file」 をクリックして下さい。
<img width="1257" alt="スクリーンショット 2023-05-18 17 05 16" src="https://github.com/takamatsu-city/opendata/assets/8760841/0b261634-11e9-46fc-8cc7-cd505d1e07b2">

- ディレクトリ名を入力して下さい。
<img width="1254" alt="スクリーンショット 2023-05-18 17 06 00" src="https://github.com/takamatsu-city/opendata/assets/8760841/25a9bfcd-2473-47df-822a-d5c0bb3236ff">

- 「Create new branch ...」 にチェックを入れ、「Propose changes」 をクリックして下さい。<p style="color:red;">注意：「Commit directly to the main branch.」にチェックを入れないで下さい。</p>

<img width="1255" alt="スクリーンショット 2023-05-18 17 05 48" src="https://github.com/takamatsu-city/opendata/assets/8760841/5cf38811-2901-4953-b75a-3faa9d448eeb">

### 2. ファイルを追加

- 作成したディレクトリに移動し　「Upload files」 から CSV ファイルをアップロードして下さい。
- ファイルのエンコードは、UTF-8で保存して下さい。

<img width="1253" alt="スクリーンショット 2023-05-18 17 06 46" src="https://github.com/takamatsu-city/opendata/assets/8760841/2be72905-a701-4c71-b314-8526fd25e0ed">

### 3. 設定ファイルを更新

- 位置情報があるデータの場合は、[`location-data-categories.json`](https://github.com/takamatsu-city/opendata/blob/main/src/location-data-categories.json)　[(ファイルを開く)](https://github.com/takamatsu-city/opendata/blob/main/src/location-data-categories.json)
- 位置情報がないデータの場合は、[`standard-data-categories.json`](https://github.com/takamatsu-city/opendata/blob/main/src/standard-data-categories.json)　[(ファイルを開く)](https://github.com/takamatsu-city/opendata/blob/main/src/standard-data-categories.json)
- PDFのデータの場合は、[`pdf-data-categories.json`](https://github.com/takamatsu-city/opendata/blob/main/src/pdf-data-categories.json)　[(ファイルを開く)](https://github.com/takamatsu-city/opendata/blob/main/src/pdf-data-categories.json)

```
{
  "category": "public_toilet", // 1. で作成したディレクトリ名
  "name": "公衆トイレ", // データ名
  "filename": "data.csv", // ファイル名
  "description": "" // 説明
  "historical": false // 時系列のデータを含む場合は true
},
```

##### 時系列データの追加方法

旅館業新規開設一覧（2023年04月）など、時系列データの場合は、`historical`を`true`にして下さい。
- `filename` は READMEに使用されます。
- 時系列のデータの場合は、ファイル名は、`{データ番号}_{YYMM}.csv`にして、`filename`は、`{データ番号}`にして下さい。

```
{
  "category": "new_hostels",
  "name": "旅館業新規開設一覧",
  "filename": "0103",
  "description": "",
  "historical": true
}
```

#### 編集方法

- 鉛筆マークの 「Edit this file」 をクリックして下さい。

<img width="1440" alt="スクリーンショット 2023-05-18 18 08 28" src="https://github.com/takamatsu-city/opendata/assets/8760841/cd9496ee-f0ea-4b0c-9270-4e58596afa8f">

- 編集中のブランチ名かを確認し、「Commit Changes」をクリックして下さい。
- 新規に作成したブランチ名だと、`<githubユーザー名>-patch-1` になっているハズです。

<img width="1120" alt="スクリーンショット 2023-05-18 18 12 54" src="https://github.com/takamatsu-city/opendata/assets/8760841/f468a815-3dc4-4dec-af83-bc5064c51bf9">

