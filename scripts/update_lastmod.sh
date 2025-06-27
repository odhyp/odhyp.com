#!/bin/bash

# Note:
# This script is used to update the `lastmod` parameter in markdown file
# Front matter under 'content/'.

# Directories to scan
DIRS=("content/writings" "content/projects")

# Dry-run flag
DRY_RUN=false

# Parse flags
if [[ "$1" == "--dry-run" ]]; then
    DRY_RUN=true
    echo "🔍 Running in dry-run mode — no files will be modified."
fi

# Loop through directories
for dir in "${DIRS[@]}"; do
    for file in $(find "$dir" -type f -name "*.md"); do
        # Get last modified date from Git
        lastmod=$(git log -1 --format="%aI" -- "$file")

        if [[ -z "$lastmod" ]]; then
            echo "⚠️  Skipping untracked file: $file"
            continue
        fi

        # Extract existing lastmod
        current_lastmod=$(grep '^lastmod = ' "$file" | cut -d'"' -f2)

        if [[ "$lastmod" != "$current_lastmod" ]]; then
            echo "📄 $file"
            echo "    → lastmod update: $current_lastmod → $lastmod"

            if [[ "$DRY_RUN" = false ]]; then
                # Update the lastmod line in place
                sed -i "s/^lastmod = \".*\"/lastmod = \"$lastmod\"/" "$file"
            fi
        fi
    done
done
