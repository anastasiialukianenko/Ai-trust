# GitHub Pages Deployment Guide

## Quick Setup

### Option 1: Automatic Deployment (Recommended)

1. **Enable GitHub Pages in your repository:**
   - Go to your GitHub repository
   - Click **Settings** → **Pages**
   - Under "Source", select **GitHub Actions**

2. **Push your code:**
   ```bash
   git add .
   git commit -m "Setup GitHub Pages deployment"
   git push origin main
   ```

3. **Wait for deployment:**
   - Go to **Actions** tab in your repository
   - The workflow will build and deploy automatically
   - Once complete, your site will be available at:
     - `https://YOUR_USERNAME.github.io/REPO_NAME/` (if repo has a name)
     - `https://YOUR_USERNAME.github.io/` (if repo is `username.github.io`)

### Option 2: Manual Deployment

1. **Build the project:**
   ```bash
   cd vite-project
   npm run build
   ```

2. **Deploy the `dist` folder:**
   - Go to repository **Settings** → **Pages**
   - Select **Deploy from a branch**
   - Choose `main` branch and `/dist` folder
   - Or use the `gh-pages` branch method (see below)

## Important: Update Base Path

If your repository is NOT named `username.github.io`, you need to update the base path:

1. **Update `vite.config.ts`:**
   ```typescript
   base: '/your-repo-name/',
   ```

2. **Or set it via environment variable in the GitHub Actions workflow:**
   Edit `.github/workflows/deploy.yml` and update:
   ```yaml
   GITHUB_PAGES_BASE: '/your-repo-name/'
   ```

## Environment Variables for Production

For production deployment, you'll need to set your Google Apps Script URL as a **Repository secret**:

1. **Go to repository Settings → Secrets and variables → Actions**
2. **Make sure you're on the "Secrets" tab** (not "Variables")
3. **Click "New repository secret"** (NOT "New environment secret")
4. **Add:**
   - Name: `VITE_GOOGLE_APPS_SCRIPT_URL`
   - Value: Your Google Apps Script Web App URL
   - Format: `https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec`
5. **Click "Add secret"**

**Note**: Use **Repository secrets** (not Environment secrets) - they're simpler and work for all workflows in your repository.

4. **Update the workflow to use the secret:**
   The build process will automatically use it during `npm run build`

## Troubleshooting

- **404 errors**: Check that the base path in `vite.config.ts` matches your repository name
- **Build fails**: Check the Actions tab for error messages
- **Environment variables not working**: Make sure they're set as GitHub Secrets and prefixed with `VITE_`

## Custom Domain (Optional)

If you want to use a custom domain:
1. Add a `CNAME` file in the `public` folder with your domain
2. Configure DNS settings as per GitHub Pages instructions

