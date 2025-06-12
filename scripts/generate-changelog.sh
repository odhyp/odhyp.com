#!/bin/bash

# Note:
# This file was used to generate data/changelog.log for the changelog page.
# It's no longer needed now that the repository is public.

# Get current date and time
timestamp=$(date "+%Y-%m-%d %H:%M:%S")

echo "[$timestamp] 🔄 Starting changelog generation..."

# Ensure the data directory exists
mkdir -p data

# Generate the changelog
git log --pretty=format:"%ad | %h | %s" --date=short >data/changelog.log

# Confirm completion
if [ $? -eq 0 ]; then
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] ✅ Changelog successfully generated at data/changelog.log"
else
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] ❌ Failed to generate changelog"
fi
