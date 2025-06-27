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

# Function: check if file has meaningful change (excluding lastmod)
has_meaningful_change() {
    local file="$1"
    local full_commit lastmod_commit

    full_commit=$(git log -1 --format="%H" -- "$file")
    lastmod_commit=$(git log -L'/^lastmod\s*=/,+1':"$file" --pretty=format:"%H" 2>/dev/null | head -n1)

    [[ "$full_commit" != "$lastmod_commit" ]]
}

# Main loop
for dir in "${DIRS[@]}"; do
    for file in $(find "$dir" -type f -name "*.md"); do

        # Skip if file has no lastmod
        if ! grep -q '^lastmod[[:space:]]*=' "$file"; then
            if [[ "$DRY_RUN" == true ]]; then
                SKIPPED_FILES+=("$file")
            fi
            continue
        fi

        # Get Git lastmod date in ISO 8601
        lastmod_git=$(git log -1 --format="%aI" -- "$file")
        if [[ -z "$lastmod_git" ]]; then
            echo "⚠️  Skipping untracked file: $file"
            continue
        fi

        # Get current lastmod value from file
        current_lastmod=$(grep '^lastmod[[:space:]]*=' "$file" | sed -E 's/^lastmod[[:space:]]*=[[:space:]]*//')

        # Only update if actual content changed
        if has_meaningful_change "$file" && [[ "$lastmod_git" != "$current_lastmod" ]]; then
            lastmod_human=$(date -d "$lastmod_git" +"%a, %d %b %Y %H:%M %Z")

            echo "📄 $file"
            echo "    → current: $current_lastmod"
            echo "    → updated: $lastmod_human"

            if [[ "$DRY_RUN" == false ]]; then
                sed -i$SED_EXT "s/^lastmod[[:space:]]*=.*/lastmod = $lastmod_git/" "$file"
                [[ -n "$SED_EXT" ]] && rm -f "$file$SED_EXT"
                UPDATED_FILES+=("$file")
            fi
        fi
    done
done

# Report skipped files (dry-run only)
if [[ "$DRY_RUN" == true && ${#SKIPPED_FILES[@]} -gt 0 ]]; then
    echo ""
    echo "🚫 Skipped files (no lastmod present):"
    for f in "${SKIPPED_FILES[@]}"; do
        echo " - $f"
    done
fi
