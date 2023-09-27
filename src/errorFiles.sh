#!/usr/bin/env bash
set -eu

PR_ID=$(echo $GITHUB_REF | sed -e 's/[^0-9]//g')
DIR=$(cat ./error-file.txt)
DIR=${DIR#"/home/runner/work/${REPO}/${REPO}/"}
URL="https://github.com/${OWNER}/${REPO}/blob/${BRANCH}/${DIR}"

cat <<__COMMENT1__ > "./comment.txt"
## エラー：Excel の変換に失敗しました
アップロードした Excel ファイルにデータが含まれていないか、壊れている可能性があります。

問題のあるファイルは以下の通りです。

[$URL]($URL)

__COMMENT1__

gh pr comment "${PR_ID}" --body-file="./comment.txt" --repo="${OWNER}/${REPO}"

exit 1