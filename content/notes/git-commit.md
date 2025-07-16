+++
# Metadata
title = "Git Commit"
description = "Write Git commits that make sense, stay readable, and help track changes clearly" 
slug = "git-commit"
date = 2025-07-14T17:25:31+07:00
lastmod = 2025-07-14T17:25:31+07:00
draft = false

# Page setting
toc = true

# Taxonomies & Routing
category = "git"
aliases = ["/git-commit"]
+++

Committing in Git is more than just saving changes. It’s about creating a meaningful timeline of your project. A well-crafted commit history helps you (and your team) understand what happened, when, and why.

## What a commit is

A commit is a snapshot of your changes. It records:

- The current state of the project
- Who made the change
- When it was made
- A message describing what and why

Each commit creates a unique hash that becomes part of the project history.

## Basic commit flow

Start with staging the changes:

```bash
git add file.py
````

Then commit them:

```bash
git commit -m "Refactor API endpoint handler"
```

You can commit all staged changes at once:

```bash
git add .
git commit -m "Fix layout issue on dashboard"
```

## Writing good commit messages

I like to use the following format for clear commit messages:

```
<type>: <short summary>

[optional body with more detail]
```

Common types I use:

- feat: a new feature
- fix: a bug fix
- refactor: code cleanup or reorganization
- chore: maintenance tasks
- docs: documentation updates
- style: formatting changes (no code logic change)
- test: adding or fixing tests

Examples:

```bash
git commit -m "fix: handle missing user ID in auth middleware"
git commit -m "feat: add dark mode toggle to settings"
```

### Keep messages short and useful

- Use present tense: "add feature", not "added feature"
- Focus on the “what” and “why”, not “how”
- Keep the first line under 72 characters
- Add context in the body if the change is complex

## Useful flags

### `--amend`

Update the last commit (useful for fixing a typo or adding forgotten files):

```bash
git commit --amend
```

### `-v` (verbose)

Show diff in editor while writing commit:

```bash
git commit -v
```

### `--no-edit`

Re-use the previous commit message:

```bash
git commit --amend --no-edit
```

## Viewing commit history

Check the timeline:

```bash
git log
```

For a concise view:

```bash
git log --oneline
```

Or a graphical version:

```bash
git log --graph --oneline --all
```

## Rewriting history (carefully)

To clean up commits before pushing:

```bash
git rebase -i HEAD~3
```

Use this to:

- Squash multiple commits into one
- Edit commit messages
- Drop unnecessary commits

Only do this on local or personal branches, never on shared branches that others depend on.

## Final thoughts

Writing commits isn’t just a habit — it’s part of communicating through code. A good commit message tells a story. It makes debugging easier. It helps you understand your past self six months later.

Don’t just commit code. Commit with intention.
