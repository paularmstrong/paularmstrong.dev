---
id: git
title: Git
---

## `main`

Finds the default tracked (main) branch. Used to typically be `master`, but we are thankfully moving to `main`. This script can help remove the guessing game if you work with a bunch of repos.

```bash title="Add to your ~/.zshrc"
function main() {
    DEFAULT_BRANCH=`git remote show origin | grep "HEAD branch" | sed 's/.*: //'`
    git checkout $DEFAULT_BRANCH
    git pull
}
```

## `rmbranch`

Deletes your current branch and moves to the default tracked branch.

```bash title="Add to your ~/.zshrc"
function rmbranch() {
    BRANCH=`git rev-parse --abbrev-ref HEAD`
    DEFAULT_BRANCH=`git remote show origin | grep "HEAD branch" | sed 's/.*: //'`
    git checkout $DEFAULT_BRANCH
    git branch -D $BRANCH
    git pull
}
```

## `rebase`

Super helpful for workplaces that prefer flat commits and don't allow merge commits – or you just find it easier to rebase. Quickly fetches your default branch and rebases on top of the latest changes.

```bash title="Add to your ~/.zshrc"
function rebase() {
    DEFAULT_BRANCH=`git remote show origin | grep "HEAD branch" | sed 's/.*: //'`
    git fetch origin $DEFAULT_BRANCH
    git rebase origin/$DEFAULT_BRANCH
}
```

### Bad rebase? Use `git reflog`

Screw up a rebase somewhere and need to back out to where you were before you started? Check your `git reflog` for the actions taken, most recent at the top, and find the action before you started rebasing. Copy the hash and run `git reset --hard <hash>`

```bash
git reflog
d734bb0 HEAD@{0}: rebase finished: returning to refs/heads/parmstrong/middleware-1-sanitizeauth
d734bb0 HEAD@{1}: rebase: refactor: convert SanitizeAuthFilter to middleware
126725c HEAD@{2}: rebase: checkout master
5dc7d03 HEAD@{3}: checkout: moving from master to parmstrong/middleware-1-sanitizeauth
...

git reset --hard 5dc7d03
```

## Current branch name

```bash
git rev-parse --abbrev-ref HEAD
```
