#!/usr/bin/env bash

set -eu

PR_ID=$(echo $GITHUB_REF | sed -e 's/[^0-9]//g')

if [[ -z "${PR_ID}" ]]; then
  echo "Generating CSV diff skipped because this action is not triggered by Pull Request."
  exit 0
fi

cat <<__COMMENT1__ > "./comment.txt"
今回更新されたデータの CSV 差分は以下の通りです:

\`\`\`diff
$(diff --unified -r main_branch_content/data/ current_branch_content/data/)
\`\`\`

※現行のデータから、赤の行が削除され、緑の行が追加されます。
__COMMENT1__

if [[ -n "$(diff --unified -r main_branch_content/data/ current_branch_content/data/)" ]]; then
  exit 0
else
  exit 1
fi
