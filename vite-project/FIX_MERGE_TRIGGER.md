# Fix: Workflow Not Triggering on Merge

## The Issue

When you merge a pull request, it should trigger the workflow because merging creates a **push event** to the `main` branch. If it's not triggering, here are the likely causes:

## Common Causes & Solutions

### 1. Workflow File Not in Main Branch

The workflow file must be in the `main` branch to work:

1. Check if `.github/workflows/deploy.yml` exists in `main` branch
2. If you created it in a feature branch, merge that branch first
3. Or manually add it to main:
   ```bash
   git checkout main
   git pull origin main
   # Make sure the workflow file is there
   ls -la vite-project/.github/workflows/deploy.yml
   ```

### 2. Workflow File Location

The workflow file must be at:
```
.github/workflows/deploy.yml
```

NOT at:
```
vite-project/.github/workflows/deploy.yml
```

**This is the issue!** The workflow file is in the wrong location.

### 3. Fix the Location

Move the workflow file to the correct location:

```bash
cd /Users/anastasialukianenko/Ai-trust

# Create the directory if it doesn't exist
mkdir -p .github/workflows

# Move the workflow file
mv vite-project/.github/workflows/deploy.yml .github/workflows/deploy.yml

# Update the paths in the workflow since it's now at root
# (Actually, we need to keep the paths as-is since the project is in vite-project/)
```

Actually, wait - if your project structure has `vite-project/` as a subdirectory, the workflow needs to stay there OR we need to adjust the paths. Let me check your structure.

### 4. Verify Workflow Triggers

The workflow should trigger on:
- ✅ Direct push to `main` branch
- ✅ Merge PR to `main` branch (creates push event)
- ✅ Manual trigger via "Run workflow" button

## Quick Fix

1. **Check where the workflow file is:**
   ```bash
   find . -name "deploy.yml" -type f
   ```

2. **If it's in `vite-project/.github/workflows/`, that's correct for your structure**

3. **Make sure it's committed and pushed:**
   ```bash
   git add vite-project/.github/workflows/deploy.yml
   git commit -m "Add deployment workflow"
   git push origin main
   ```

4. **Test by making a small change:**
   ```bash
   echo "# test" >> README.md
   git add README.md
   git commit -m "Test workflow trigger"
   git push origin main
   ```

5. **Check Actions tab** - the workflow should start immediately

## If Still Not Working

1. **Check repository settings:**
   - Settings → Actions → General
   - "Allow all actions and reusable workflows" should be enabled

2. **Check branch protection:**
   - Settings → Branches
   - Make sure `main` branch doesn't have restrictions blocking workflows

3. **Check workflow file syntax:**
   - Go to Actions tab
   - Look for any yellow warnings about workflow syntax


