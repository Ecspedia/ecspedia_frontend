## Command: create-branch

Create a new branch from the current branch.

**Arguments:** $ARGUMENTS (branch name)

1. Run `git status` to check current branch and ensure working directory is clean
2. If there are uncommitted changes, warn the user
3. Create and checkout the new branch using `git checkout -b <branch-name>`
4. Push the new branch to remote with `git push -u origin <branch-name>`
5. Confirm the branch was created successfully
