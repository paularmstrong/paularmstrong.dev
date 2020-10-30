---
id: git
title: Git
---

## `main`

Finds the default tracked (main) branch. Used to typically be `master`, but we are thankfully moving to `main`. This script can help remove the guessing game if you work with a bunch of repos.

```bash
function main() {
    DEFAULT_BRANCH=`git remote show origin | grep "HEAD branch" | sed 's/.*: //'`
    git checkout $DEFAULT_BRANCH
    git pull
}
```

## `rmbranch`

Deletes your current branch and moves to the default tracked branch.

```bash
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

```bash
function rebase() {
    DEFAULT_BRANCH=`git remote show origin | grep "HEAD branch" | sed 's/.*: //'`
    git fetch origin $DEFAULT_BRANCH
    git rebase origin/$DEFAULT_BRANCH
}
```
