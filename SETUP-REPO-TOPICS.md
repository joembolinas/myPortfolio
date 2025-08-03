# 🏷️ Quick Setup: Repository Topics

## 🚀 Automated Setup (Recommended)

Run this single command to set all repository topics:

```bash
./scripts/set-repo-topics.sh
```

If you get an authentication error, first run:
```bash
gh auth login
```

## 🔧 Manual Setup (Alternative)

1. Go to: https://github.com/joembolinas/myPortfolio
2. Click the ⚙️ gear icon next to "About"
3. In the "Topics" field, add these exact topics (comma-separated):

```
portfolio, career-transition, react, typescript, tailwind-css, framer-motion, performance-optimization, accessibility, responsive-design, frontend-development, web-development, lighthouse, seo-optimized
```

4. Click "Save changes"

## ✅ Verification

After setup, verify the topics are visible:
- Visit your repository page on GitHub
- Topics should appear as clickable tags below the repository description
- Or run: `gh repo view joembolinas/myPortfolio --json repositoryTopics`

---

**Note:** These topics help with repository discoverability and showcase the technologies used in your portfolio project.