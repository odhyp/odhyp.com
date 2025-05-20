#!/bin/bash
mkdir -p data
git log --pretty=format:"%ad | %h | %s" --date=short > data/changelog.log
