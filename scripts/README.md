# 🛠️ Repository Scripts

This directory contains utility scripts for managing the myPortfolio repository.

## 📋 Available Scripts

### 🏷️ set-repo-topics.sh

Sets the GitHub repository topics/tags for the myPortfolio project.

**Usage:**
```bash
./scripts/set-repo-topics.sh
```

**Prerequisites:**
- GitHub CLI installed (`gh`)
- Authenticated with GitHub (`gh auth login`)
- Write access to the repository

**Topics Added:**
- portfolio
- career-transition
- react
- typescript
- tailwind-css
- framer-motion
- performance-optimization
- accessibility
- responsive-design
- frontend-development
- web-development
- lighthouse
- seo-optimized

**Manual Alternative:**

If you prefer to set topics manually:

1. Navigate to: https://github.com/joembolinas/myPortfolio
2. Click the ⚙️ gear icon next to "About"
3. Add the topics listed above in the "Topics" field
4. Click "Save changes"

**Verification:**

After running the script, you can verify the topics were set by:
```bash
gh repo view joembolinas/myPortfolio --json repositoryTopics -q '.repositoryTopics[].name'
```

Or visit the repository page on GitHub to see the topics displayed below the repository description.