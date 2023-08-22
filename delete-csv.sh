#!/bin/bash

shopt -s globstar

for file in data/**/*.csv; do
    if [[ -f "$file" ]]; then
        echo "Deleting $file"
        rm -f "$file"
    fi
done
