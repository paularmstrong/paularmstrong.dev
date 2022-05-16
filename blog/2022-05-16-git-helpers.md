---
title: Git helpers that I can no longer live without
slug: git-helpers
tags:
  - git
---

Working with git can be hard, verbose, and repetitive. I’ve been using this small collection of bash/zsh functions for a few years now and I don’t think I could work without them anymore. 

- `main` - quickly jump back to the default/`HEAD` branch of your repo without needing to know what the name of that branch is.
- `rebase` - rebase your current branch against the current state of the default/`HEAD` branch as it is on the remote server.
- `rmbranch` - delete your current working branch and move to the default/`HEAD` branch. Great for PR cleanup!

<!-- truncate -->

## `main`

The industry seems to be agreeing that `main` is a much better default than the outdated term `master`. Unfortunately, there are still some repos that I’ve needed to work with that use other names.

This function can help remove the guessing game if you work with a bunch of repos that are still transitioning and/or use different names for the default/`HEAD` branch and you want to quickly get there from your current branch:

```bash title="Add to your ~/.zshrc or ~/.bashrc"
function main() {
    DEFAULT_BRANCH=`git remote show origin | grep "HEAD branch" | sed 's/.*: //'`
    git checkout $DEFAULT_BRANCH
    git pull
}
```

Usage:

```bash
main
```

## `rmbranch`

I’m often in a position where the current branch I’m on had its PR was completed, merged, and branch removed from the remote. I dislike keeping old copies of branches around that I don’t need and I want them cleaned up immediately.

This function deletes the current branch and moves to the default tracked branch, avoiding doing the whold dance yourself. Bonus: it does the same thing as the previous `main` function and figures out which default/`HEAD` branch to switch to.

```bash title="Add to your ~/.zshrc or ~/.bashrc"
function rmbranch() {
    BRANCH=`git rev-parse --abbrev-ref HEAD`
    DEFAULT_BRANCH=`git remote show origin | grep "HEAD branch" | sed 's/.*: //'`
    git checkout $DEFAULT_BRANCH
    git branch -D $BRANCH
    git pull
}
```

Usage:

```bash
rmbranch
```

## `rebase`

Super helpful for workplaces that prefer flat commits and don’t allow merge commits – or you just find it easier to rebase. Quickly fetches your default branch and rebases on top of the latest changes.

Again, this figures out the default/`HEAD` branch automatically so you don’t have to think about it.

```bash title="Add to your ~/.zshrc or ~/.bashrc"
function rebase() {
    DEFAULT_BRANCH=`git remote show origin | grep "HEAD branch" | sed 's/.*: //'`
    git fetch origin $DEFAULT_BRANCH
    git rebase origin/$DEFAULT_BRANCH
}
```

Usage:

```
rebase
```
