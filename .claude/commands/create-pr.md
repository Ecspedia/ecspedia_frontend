## Command: create-pr

Create a pull request to merge current branch into target branch.

**Arguments:** $ARGUMENTS (target branch, default: dev)

1. Run `git status` to check current branch and changes
2. Run `git log` to see recent commits on this branch
3. Run `git diff` against the target branch to understand all changes
4. Push current branch to remote if needed
5. Create PR using `gh pr create` with:
   - Title based on branch name or recent commits
   - Summary of changes in the body
   - Target branch: use $ARGUMENTS if provided, otherwise default to `dev`
6. Return the PR URL
