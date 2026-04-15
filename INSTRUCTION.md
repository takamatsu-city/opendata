# 高松市オープンデータ作業説明書

## 新規データの追加方法

### 1. ディレクトリを作成
- https://github.com/takamatsu-city/opendata/tree/main/data に移動して下さい。
- 「Create new file」 をクリックして下さい。
<img width="1257" alt="スクリーンショット 2023-05-18 17 05 16" src="https://github.com/takamatsu-city/opendata/assets/8760841/0b261634-11e9-46fc-8cc7-cd505d1e07b2">

- ディレクトリ名を入力して下さい。
<img width="1254" alt="スクリーンショット 2023-05-18 17 06 00" src="https://github.com/takamatsu-city/opendata/assets/8760841/25a9bfcd-2473-47df-822a-d5c0bb3236ff">

- `「Create new branch for this commit and start a pullrequest」` にチェックを入れ、`「Propose changes」` をクリックして下さい。
- **【注意：「Create new branch for this commit and start a pullrequest」 にチェックを入れないとデータ追加されません】**

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
- 新規に作成したブランチ名だと、`<githubユーザー名>-patch-1` になります。

<img width="1120" alt="スクリーンショット 2023-05-18 18 12 54" src="https://github.com/takamatsu-city/opendata/assets/8760841/f468a815-3dc4-4dec-af83-bc5064c51bf9">

## データ名称の変更方法

データの表示名を変更したい場合は、以下の2つのファイルを編集して下さい。

### 1. config.yml を編集

- https://github.com/takamatsu-city/opendata/tree/main/data に移動し、名称を変更したいデータのディレクトリを開いて下さい。
- `config.yml` ファイルを開き、鉛筆マークの「Edit this file」をクリックして下さい。
- `name:` の値を新しい名称に変更して下さい。

例）「福祉会館・社会福祉協議会」→「社会福祉協議会」に変更する場合：

変更前：
```yaml
category: welfare_hall
name: 福祉会館・社会福祉協議会
filename: 0054.xlsx
description: ''
dataType: location
```

変更後：
```yaml
category: welfare_hall
name: 社会福祉協議会
filename: 0054.xlsx
description: ''
dataType: location
```

- `「Create new branch for this commit and start a pull request」` にチェックを入れ、`「Propose changes」` をクリックして下さい。

### 2. README.md を編集

- 同じブランチ上で、[README.md](https://github.com/takamatsu-city/opendata/blob/main/README.md) を開いて下さい。
- 鉛筆マークの「Edit this file」をクリックし、該当データの表示名を同じように変更して下さい。
- 編集中のブランチ名が手順1で作成したブランチと同じであることを確認し、「Commit changes」をクリックして下さい。

### 3. Pull Request を作成

- 手順1で自動作成された Pull Request のページを開き、内容を確認して下さい。
- Geolonia にてレビュー・マージを行います。

## データの削除方法

データの削除は手順がやや複雑なため、**Geolonia（smartcity-support@geolonia.com）へご連絡ください**。以下の情報をお伝えいただければ対応いたします。

- 削除したいデータ名（例：市立病院(0052)）

### （参考）削除時に必要な作業

削除の際は、以下の変更を Pull Request で行います。

1. `data/<ディレクトリ名>/` 内のファイルをすべて削除（`config.yml`、データファイル等）
2. `README.md` から該当データの行を削除
