#!/bin/bash

# Note:
# This script is used to update the `lastmod` parameter in markdown file
# Front matter under 'content/'.

# Directories to scan
DIRS=("content/writings" "content/projects")
DRY_RUN=false
SKIPPED_FILES=()

# Parse argument
if [[ "$1" == "--dry-run" ]]; then
    DRY_RUN=true
    echo "🔍 Dry-run mode — no files will be modified."
fi

for dir in "${DIRS[@]}"; do
    for file in $(find "$dir" -type f -name "*.md"); do

        # Skip if file doesn't have lastmod
        if ! grep -q '^lastmod = ' "$file"; then
            if [[ "$DRY_RUN" = true ]]; then
                SKIPPED_FILES+=("$file")
            fi
            continue
        fi

        # Get Git last commit date for file
        lastmod_git=$(git log -1 --format="%aI" -- "$file")
        if [[ -z "$lastmod_git" ]]; then
            echo "⚠️  Skipping untracked file: $file"
            continue
        fi

        # Extract current lastmod value
        current_lastmod=$(grep '^lastmod = ' "$file" | sed -E 's/^lastmod = "(.*)"/\1/')

        if [[ "$lastmod_git" != "$current_lastmod" ]]; then
            # Human-readable display version
            lastmod_human=$(date -d "$lastmod_git" +"%a, %d %b %Y %H:%M %Z")

            echo "📄 $file"
            echo "    → current: $current_lastmod"
            echo "    → updated: $lastmod_human"

            if [[ "$DRY_RUN" = false ]]; then
                sed -i "s/^lastmod = \".*\"/lastmod = \"$lastmod_git\"/" "$file"
            fi
        fi
    done
done

# Show skipped files in dry-run
if [[ "$DRY_RUN" = true && ${#SKIPPED_FILES[@]} -gt 0 ]]; then
    echo ""
    echo "🚫 Skipped files (no lastmod present):"
    for f in "${SKIPPED_FILES[@]}"; do
        echo " - $f"
    done
fi
