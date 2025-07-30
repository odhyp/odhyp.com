#!/bin/bash

# This script finalizes changes by:
# - Updating 'lastmod' fields in content files
# - Formatting all files with Prettier
# - Committing the changes with a standard message if there are any

set -e

echo "🔄 Updating lastmod..."
bash scripts/update_lastmod.sh

echo "🎨 Formatting with Prettier..."
npx prettier . --write

echo "🕵️ Checking for changes to commit..."
if git diff --quiet; then
  echo "✅ No changes to commit."
  exit 0
fi

echo "📦 Staging and committing changes..."
git add contents/
git commit -m "chore(final): update lastmod and format content"

echo "✅ Done. You can now push the changes manually."
