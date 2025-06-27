#!/bin/bash

# Note:
# This script is used to update the `lastmod` parameter in Front matter

DIRS=("content/writings" "content/projects" "content/now")
DRY_RUN=false
SKIPPED_FILES=()
UPDATED_FILES=()

# macOS-compatible sed detection
SED_EXT=""
if [[ "$OSTYPE" == "darwin"* ]]; then
    SED_EXT=".bak"
fi

# Parse argument
if [[ "$1" == "--dry-run" ]]; then
    DRY_RUN=true
    echo "🔍 Dry-run mode — no files will be modified."
fi

for dir in "${DIRS[@]}"; do
    for file in $(find "$dir" -type f -name "*.md"); do

        # Skip if no lastmod
        if ! grep -q '^lastmod[[:space:]]*=' "$file"; then
            if [[ "$DRY_RUN" = true ]]; then
                SKIPPED_FILES+=("$file")
            fi
            continue
        fi

        # Get git lastmod per file
        lastmod_git=$(git log -1 --format="%aI" -- "$file")
        if [[ -z "$lastmod_git" ]]; then
            echo "⚠️  Skipping untracked file: $file"
            continue
        fi

        # Get current lastmod in file
        current_lastmod=$(grep '^lastmod[[:space:]]*=' "$file" | sed -E 's/^lastmod[[:space:]]*=[[:space:]]*"([^"]*)"/\1/')

        if [[ "$lastmod_git" != "$current_lastmod" ]]; then
            lastmod_human=$(date -d "$lastmod_git" +"%a, %d %b %Y %H:%M %Z")

            echo "📄 $file"
            echo "    → current: $current_lastmod"
            echo "    → updated: $lastmod_human"

            if [[ "$DRY_RUN" = false ]]; then
                # Replace the lastmod line (with backup suffix if on macOS)
                sed -i$SED_EXT "s/^lastmod[[:space:]]*=.*/lastmod = $lastmod_git/" "$file"

                # Remove backup created by macOS sed
                if [[ -n "$SED_EXT" ]]; then rm -f "${file}${SED_EXT}"; fi

                UPDATED_FILES+=("$file")
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
