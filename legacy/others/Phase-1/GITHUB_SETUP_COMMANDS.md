# 🚀 GitHub Repository Setup Commands

Follow these commands to push all the GitHub setup files to your repository:

## 1. 📋 Initialize and Add Files

```bash
# Stage all the new GitHub files
git add .github/
git add package.json
git add lighthouserc.json

# Check what files are staged
git status
```

## 2. 📝 Commit the GitHub Setup

```bash
# Commit all GitHub setup files
git commit -m "feat: 🔧 Add professional GitHub setup

- Add comprehensive issue templates (bug, feature, documentation)
- Add detailed pull request template with quality checklists
- Add GitHub Actions for quality checks, performance, and security
- Add Lighthouse CI configuration for performance monitoring
- Add deployment workflow for Vercel
- Update package.json with complete script ecosystem
- Implement GitFlow branching strategy foundation

✅ GitHub repository now follows professional standards
🚀 Ready for Phase 2 development workflow"
```

## 3. 🌿 Create and Push Develop Branch

```bash
# Create develop branch locally
git checkout -b develop

# Push develop branch to GitHub
git push -u origin develop

# Switch back to main
git checkout main
```

## 4. 📤 Push to Main Branch

```bash
# Push all changes to main branch
git push origin main
```

## 5. ⚙️ Set Up Branch Protection (Manual - GitHub Web Interface)

After pushing, go to GitHub web interface:

1. **Navigate to:** `https://github.com/joembolinas/myPortfolio/settings/branches`
2. **Add Rule for `main` branch:**
   - Branch name pattern: `main`
   - ✅ Require a pull request before merging
   - ✅ Require approvals: 1
   - ✅ Dismiss stale PR approvals when new commits are pushed
   - ✅ Require status checks to pass before merging
   - ✅ Require branches to be up to date before merging
   - ✅ Include administrators

3. **Add Rule for `develop` branch:**
   - Branch name pattern: `develop`
   - ✅ Require a pull request before merging
   - ✅ Require status checks to pass before merging

## 6. 🏷️ Add Repository Topics/Tags (Manual - GitHub Web Interface)

Navigate to: `https://github.com/joembolinas/myPortfolio`

Click the ⚙️ gear icon next to "About" and add these topics:

```
portfolio, career-transition, react, vite, typescript, tailwind-css,
framer-motion, performance-optimization, accessibility, responsive-design,
frontend-development, web-development, lighthouse, seo-optimized
```

## 7. 📋 Create GitHub Projects Board (Manual - GitHub Web Interface)

1. **Navigate to:** `https://github.com/joembolinas/myPortfolio/projects`
2. **Click:** "New project"
3. **Select:** "Board" template
4. **Name:** "Growth Journey Portfolio Development"
5. **Add columns:**
   - 📋 Backlog
   - 🔄 In Progress
   - 👀 Review
   - 🧪 Testing
   - ✅ Done

## 8. 🔐 Set Up Deployment Secrets (Manual - For Vercel)

Navigate to: `https://github.com/joembolinas/myPortfolio/settings/secrets/actions`

Add these secrets when ready to deploy:

- `VERCEL_TOKEN` - Your Vercel API token
- `VERCEL_ORG_ID` - Your Vercel organization ID
- `VERCEL_PROJECT_ID` - Your Vercel project ID

## 9. ✅ Verify Setup

After completing all steps, verify:

- [x] All GitHub templates are visible in your repository
- [x] GitHub Actions workflows are present
- [x] Develop branch exists
- [x] Branch protection rules are active
- [x] Repository topics are added
- [x] Projects board is created

## 🎉 Next Steps

Your GitHub repository is now professionally configured! You can:

- Create issues using the templates
- Make feature branches from develop
- Use pull requests with the quality checklist
- Benefit from automated quality checks

Ready for Phase 2 development! 🚀
