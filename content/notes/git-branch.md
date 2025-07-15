+++
# Metadata
title = "Git Branch"
description = "Using git branch to create, switch, merge, and keep things clean by isolating work"
slug = "git-branch"
date = 2025-07-13T22:43:08+07:00
draft = false

# Page setting
toc = true

# Taxonomies & Routing
category = "git"
aliases = ["/git-branch"]
+++

Git branches isolate work. Each branch represents a snapshot of your repository. You can create, switch, merge, delete, and push branches to manage changes independently.

## Creating a Branch

Use `git branch <name>` to create a new branch.

```bash
git branch feature-login
````

This creates the branch but keeps you on the current one. To create and switch immediately:

```bash
git checkout -b feature-login
```

Use this when starting a new feature or fix. Start fresh from `main` or any base branch.

## Listing Branches

Use `git branch` to see local branches. The current branch is marked with an asterisk.

```bash
git branch
```

Use `-r` to see remote branches:

```bash
git branch -r
```

Use `-a` to see both:

```bash
git branch -a
```

Useful for checking if a branch already exists or to clean up old ones.

## Switching Branches

Use `git checkout <name>` to move between branches.

```bash
git checkout main
```

If the branch doesn’t exist locally but exists on remote:

```bash
git checkout -t origin/feature-login
```

The `-t` flag sets up tracking.

## Renaming Branches

To rename the current branch:

```bash
git branch -m new-name
```

To rename another branch:

```bash
git branch -m old-name new-name
```

Renaming locally does not affect the remote. To rename on remote:

1. Delete the old remote branch
2. Push the renamed one
3. Reset upstream if needed

```bash
git push origin :old-name
git push origin new-name
git push --set-upstream origin new-name
```

## Deleting Branches

To delete a local branch:

```bash
git branch -d branch-name
```

This fails if the branch is not merged. To force delete:

```bash
git branch -D branch-name
```

To delete a remote branch:

```bash
git push origin --delete branch-name
```

Clean up unused branches after merging.

## Merging Branches

Switch to the base branch before merging:

```bash
git checkout main
git merge feature-login
```

Resolve conflicts if any, then commit the merge.

Fast-forward merges happen when there are no diverging changes. Use `--no-ff` to force a merge commit:

```bash
git merge --no-ff feature-login
```

Use this for visibility in commit history.

## Push and Track

After creating a local branch, push it to the remote:

```bash
git push -u origin feature-login
```

The `-u` flag sets upstream. Future pushes can use `git push` without arguments.

If you clone a repo and want to work on an existing remote branch:

```bash
git checkout -b feature-login origin/feature-login
```

This sets up tracking automatically.

## Checking Tracking Info

Use `git status` to see tracking info.

To check explicitly:

```bash
git branch -vv
```

This shows which remote branch is tracked and whether you're ahead or behind.

## Tips

- Work in branches always. Never commit directly to main.
- Prefix branch names with context. Use `feature/`, `fix/`, or `chore/` if needed. Helps when listing or filtering.
- Delete stale branches often. Local and remote. Keeps history clean.
- Use short, descriptive names. Avoid generic ones like `new`, `test`, or `update`.
- Use `git log --oneline --graph` to visualize branch history.
- Use `git switch <branch>` as a modern alternative to `checkout` for switching.
- Use `git restore` for discarding changes. Keeps branching focused on structure, not cleanup.

## Summary

Branches are lightweight and safe. Use them to isolate features, test ideas, or manage long-running tasks.

Create with intent. Merge with clarity. Clean up after merge.

Know the difference between local and remote. Track appropriately. Push with upstream to simplify workflow.

Use them daily. They’re not optional.
