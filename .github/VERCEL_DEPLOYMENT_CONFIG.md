# 🔐 Vercel Deployment Secrets Configuration

This document provides instructions for configuring GitHub repository secrets for automated Vercel deployment.

## 🎯 Quick Setup Guide

### Access Repository Secrets
1. Navigate to: `https://github.com/joembolinas/myPortfolio/settings/secrets/actions`
2. Click "New repository secret" for each required secret

## 🔑 Required Secrets

### 1. VERCEL_TOKEN
- **Purpose:** Authenticates GitHub Actions with Vercel API
- **How to get:**
  1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
  2. Click your profile → Settings → Tokens
  3. Create new token with name: `GitHub Actions - myPortfolio`
  4. Copy the generated token

**Secret Configuration:**
- **Name:** `VERCEL_TOKEN`
- **Value:** `[your-vercel-token]`

### 2. VERCEL_ORG_ID  
- **Purpose:** Identifies your Vercel organization/team
- **How to get:**
  1. Install Vercel CLI: `npm install -g vercel`
  2. Run: `vercel login`
  3. In your project folder, run: `vercel link`
  4. Find the value in `.vercel/project.json` under `orgId`

**Secret Configuration:**
- **Name:** `VERCEL_ORG_ID`
- **Value:** `[your-org-id]`

### 3. VERCEL_PROJECT_ID
- **Purpose:** Identifies your specific Vercel project
- **How to get:**
  1. Same process as VERCEL_ORG_ID
  2. Find the value in `.vercel/project.json` under `projectId`
  3. Alternatively, get from Vercel dashboard project settings

**Secret Configuration:**
- **Name:** `VERCEL_PROJECT_ID`  
- **Value:** `[your-project-id]`

## 🚀 Vercel Project Setup

### Initial Vercel Configuration

Before setting up secrets, ensure your Vercel project exists:

1. **Connect Repository to Vercel:**
   ```bash
   # Visit https://vercel.com/new
   # Import your GitHub repository
   # Configure build settings
   ```

2. **Project Settings:**
   - **Framework:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

3. **Environment Variables (Optional):**
   Add any environment variables your app needs:
   ```env
   NODE_ENV=production
   VITE_GA_TRACKING_ID=your_ga_id
   VITE_GITHUB_USERNAME=joembolinas
   ```

## 🔧 Local Development Setup

### Vercel CLI Configuration

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Link Project:**
   ```bash
   # In your project directory
   vercel link
   ```

4. **Get Project Details:**
   ```bash
   # This creates .vercel/project.json with IDs
   cat .vercel/project.json
   ```

### .vercel/project.json Example
```json
{
  "orgId": "team_xxxxxxxxxxxxxxxxxx",
  "projectId": "prj_xxxxxxxxxxxxxxxxxx"
}
```

## 🔍 Secret Verification

### Test Deployment Workflow

After adding secrets, test the deployment:

1. **Trigger Workflow:**
   - Push to main branch, or
   - Create a pull request

2. **Monitor Actions:**
   - Go to: `https://github.com/joembolinas/myPortfolio/actions`
   - Watch the "🚀 Deploy to Vercel" workflow

3. **Expected Workflow Steps:**
   ```
   ✅ Checkout repository
   ✅ Setup Node.js  
   ✅ Install dependencies
   ✅ Build project
   ✅ Install Vercel CLI
   ✅ Pull Vercel environment information
   ✅ Build project artifacts for Vercel
   ✅ Deploy to Vercel (Preview/Production)
   ```

## 🌐 Deployment Configuration

### Automatic Deployments

The deployment workflow triggers on:

- **Production Deployment:** Push to `main` branch
- **Preview Deployment:** Pull request to `main` branch

### Branch Deployment Strategy

```yaml
# Production (main branch)
https://your-portfolio.vercel.app

# Preview (pull requests)  
https://your-portfolio-git-feature-branch.vercel.app
```

## 🛠️ Additional Configuration

### Custom Domain Setup (Optional)

1. **Add Domain in Vercel:**
   - Go to Project Settings → Domains
   - Add your custom domain
   - Configure DNS records

2. **Update Repository:**
   - Update README links
   - Update package.json homepage
   - Update meta tags in HTML

### Performance Monitoring

Add Vercel Analytics (optional):

1. **Enable in Vercel Dashboard:**
   - Project Settings → Analytics
   - Enable Web Analytics

2. **Add to Application:**
   ```javascript
   // Add to your React app
   import { Analytics } from '@vercel/analytics/react';
   
   function App() {
     return (
       <>
         <YourApp />
         <Analytics />
       </>
     );
   }
   ```

## 🔒 Security Best Practices

### Secret Management
- ✅ Use repository secrets (not environment variables)
- ✅ Rotate tokens periodically (every 90 days)
- ✅ Use least-privilege principle
- ✅ Monitor secret usage in Actions logs

### Access Control
- ✅ Limit who can view/edit secrets
- ✅ Use organization-level secrets for shared tokens
- ✅ Audit secret access regularly

### Token Security
- ❌ Never commit tokens to code
- ❌ Don't log tokens in Actions output
- ❌ Don't share tokens via unsecure channels

## 🚨 Troubleshooting

### Common Issues

**Authentication Error:**
```
Error: Vercel authentication failed
```
**Solution:** Verify VERCEL_TOKEN is correct and has proper permissions

**Project Not Found:**
```
Error: Project not found
```
**Solution:** Verify VERCEL_PROJECT_ID and VERCEL_ORG_ID are correct

**Build Failure:**
```
Error: Build failed
```
**Solution:** Test build locally first with `npm run build`

**Deployment Timeout:**
```
Error: Deployment timed out
```
**Solution:** Check for large file uploads or slow build processes

### Debug Steps

1. **Verify Secrets:**
   ```bash
   # Test Vercel CLI with same credentials
   vercel --token $VERCEL_TOKEN whoami
   ```

2. **Check Build Locally:**
   ```bash
   npm install
   npm run build
   npm run preview
   ```

3. **Manual Deployment Test:**
   ```bash
   vercel --prod --token $VERCEL_TOKEN
   ```

## 📋 Setup Checklist

- [ ] Vercel account created
- [ ] Repository connected to Vercel
- [ ] Project configured with correct settings
- [ ] VERCEL_TOKEN secret added to GitHub
- [ ] VERCEL_ORG_ID secret added to GitHub  
- [ ] VERCEL_PROJECT_ID secret added to GitHub
- [ ] Deployment workflow tested
- [ ] Production URL verified
- [ ] Preview deployments working
- [ ] Custom domain configured (if applicable)

## 🎯 Next Steps

After deployment is configured:

1. **Monitor Performance:**
   - Set up Lighthouse CI
   - Configure performance alerts
   - Monitor Core Web Vitals

2. **Setup Analytics:**
   - Add Google Analytics
   - Configure Vercel Analytics
   - Set up conversion tracking

3. **SEO Optimization:**
   - Submit sitemap to search engines
   - Configure meta tags
   - Set up structured data

---

**Configuration Status:** ⚙️ Ready for manual setup  
**Prerequisites:** Vercel account and project created  
**Last Updated:** August 3, 2025