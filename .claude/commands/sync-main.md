---
description: Sync main branch with dev (dev is source of truth)
---

Sync the main branch with dev branch where dev is the source of truth.

Steps:
1. Checkout dev branch
2. Pull latest changes from origin/dev
3. Checkout main branch
4. Reset main to match dev exactly using `git reset --hard dev`
5. Show the current status
6. Provide instructions to push to remote using `git push origin main --force-with-lease`

Remember: dev is always the source of truth. main should match dev exactly.
