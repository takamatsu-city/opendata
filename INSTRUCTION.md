# 高松市オープンデータ作業説明書

## 新規データの追加方法

1. ディレクトリを作成

```
mkdir -p data/{データ名}
```

2. ファイルを追加

```
touch data/{データ名}/data.csv
```

- UTF-8で保存する
- ファイル名はdata.csvにする

3. 設定ファイルを更新

- 位置情報があるデータの場合は、`location-data-categories.json`
- 位置情報がないデータの場合は、`standard-data-categories.json`
- PDFのデータの場合は、`pdf-data-categories.json`

```
{
  "category": "public_toilet", // 1. で作成したディレクトリ名
  "name": "公衆トイレ", // データ名
  "filename": "data.csv", // ファイル名
  "description": "" // 説明
  "historical": false // 時系列のデータを含む場合は true
},
```

## 時系列データの追加方法

旅館業新規開設一覧（2023年04月）など、時系列データの場合は、`historical`を`true`にして下さい。
- `filename` は READMEに使用されます。
- ファイル名は、`{データ名}_{年月}.csv`にしても大丈夫です。（なぜ？）


```
{
  "category": "new_hostels",
  "name": "旅館業新規開設一覧",
  "filename": "0103",
  "description": "",
  "historical": true
}
```


## READMEの更新

以下で、READMEを更新できます。

```
$ npm run build-readme
```

完了したら、以下でコミットして下さい。

```
git checkout -b add-new-data
git add .
git commit -m"update Data"
git push origin add-new-data
```