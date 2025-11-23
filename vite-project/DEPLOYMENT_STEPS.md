# Step-by-Step GitHub Pages Deployment

## 1. Set Up GitHub Secret for Google Apps Script URL

1. Go to your repository: https://github.com/anastasiialukianenko/Ai-trust
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Make sure you're on the **"Secrets"** tab (not "Variables")
4. Click **New repository secret** (NOT "New environment secret")
5. Add:
   - **Name**: `VITE_GOOGLE_APPS_SCRIPT_URL`
   - **Value**: Your Google Apps Script Web App URL (the correct one, not the library URL)
   - Format should be: `https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec`
6. Click **Add secret**

**Important**: Use **Repository secrets**, not Environment secrets. Repository secrets are available to all workflows in the repository.

## 2. Enable GitHub Pages

1. In your repository, go to **Settings** → **Pages**
2. Under "Source", select **GitHub Actions** (not "Deploy from a branch")
3. Save

## 3. Commit and Push

```bash
cd /Users/anastasialukianenko/Ai-trust
git add .
git commit -m "Add GitHub Pages deployment"
git push origin main
```

## 4. Monitor Deployment

1. Go to the **Actions** tab in your repository
2. You should see a workflow run called "Deploy to GitHub Pages"
3. Wait for it to complete (usually 1-2 minutes)
4. Once green ✅, your site is deployed!

## 5. Access Your Site

Your site will be available at:
**https://anastasiialukianenko.github.io/Ai-trust/**

## Important Notes

- The base path is set to `/Ai-trust/` - this matches your repository name
- Environment variables are loaded from GitHub Secrets during build
- Every push to `main` branch will automatically redeploy
- The workflow builds from the `vite-project` directory

## Troubleshooting

- **404 errors**: Make sure the base path in `vite.config.ts` is `/Ai-trust/`
- **Build fails**: Check the Actions tab for error details
- **Environment variable not working**: Verify the secret name is exactly `VITE_GOOGLE_APPS_SCRIPT_URL`

