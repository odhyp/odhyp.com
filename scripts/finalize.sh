#!/bin/bash

# Note:
# This script is used to finalize all changes by updating the 
# lastmod parameter and clean formatting using prettier.

set -e

echo "🔄 Updating lastmod..."
bash update_lastmod.sh

echo "🎨 Formatting..."
npx prettier . --write

if git diff --quiet; then
  echo "✅ No changes to commit."
  exit 0
fi

git add .
git commit -m "chore(final): update lastmod and format content"
