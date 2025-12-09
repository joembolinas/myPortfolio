---
title: "Git Flow Branch Creator & Management Strategy"
description: "Comprehensive Git branching strategy, workflow automation, and branch lifecycle management for the Growth Journey Portfolio project"
version: "2.0.0"
category: "Git Workflow"
tags: ["git", "branching", "workflow", "version-control", "automation"]
created: "2025-12-09"
updated: "2025-12-09"
author: "Growth Journey Portfolio Team"
---

# Git Flow Branch Creator & Management Strategy

## Current Repository State (Auto-Detected)

### Active Branch
```
* refactor/content (HEAD)
```

### Repository Status
- **Current Branch:** `refactor/content`
- **Default Branch:** `main`
- **Remote:** `origin` (https://github.com/joembolinas/myPortfolio.git)
- **Latest Tag:** `v0.01`

### Existing Branches

**Local Branches:**
```
✓ develop                              # Development integration branch
✓ main                                 # Production-ready code
✓ refactor/content                     # CURRENT: Content pipeline refactoring
✓ feature/API                          # API integration work
✓ feature/costom-hooks                 # Custom React hooks
✓ feature/phase2-architecture-design   # Phase 2 architecture
✓ feature/setup-phase1                 # Phase 1 foundation
✓ feature/uiux-implementation          # UI/UX implementation
✓ joembolinas/issue20                  # Accessibility improvements
✓ joembolinas/issue21                  # Issue tracking branch
```

**Remote Branches:**
```
origin/main                            # Production branch
origin/develop                         # Remote development branch
origin/refactor/content                # Remote content refactor
origin/feature/*                       # Feature branches (5 active)
origin/copilot/fix-*                   # Copilot-generated fix branches (3)
```

### Recent Activity
```
Latest Commits (HEAD):
9f83f5c - docs(prompts): remove obsolete prompt files
b955fb2 - docs(adr): add ADR-005 TypeScript Strict Mode
22f2542 - docs(adr): add ADR-004 Markdown vs CMS
66f2f4f - docs(adr): add ADR-003 Plugin Architecture
98abf33 - docs(adr): add ADR-002 Virtual Modules
ce234a4 - docs(adr): add ADR-001 Build-Time Parsing
```

### Uncommitted Changes
```
docs/PHASE-2/Technology_Stack_Blueprint.md         (43KB) - NEW
docs/PHASE-2/Folder_Structure_Blueprint.md         (44KB) - NEW
docs/PHASE-2/Copilot_Instructions_Blueprint.md     (29KB) - NEW
docs/PHASE-2/Code_Exemplars_Blueprint.md           (44KB) - NEW
docs/PHASE-2/adr/*.md                              (5 ADRs) - NEW
.github/prompt/git-flow-branch-creator.prompt.md   - NEW (this file)
```

---

## Git Flow Strategy Overview

### Branch Hierarchy

```
main (production)
  ↓
develop (integration)
  ↓
├── feature/* (new features)
├── refactor/* (code restructuring)
├── docs/* (documentation)
├── epic/* (large features)
└── experiment/* (experimental work)
  ↓
hotfix/* (emergency fixes) → main + develop
release/* (version preparation) → main + develop
```

### Branch Naming Convention

**Format:** `<type>/<scope>[-<issue-number>]`

**Examples:**
- `feature/github-api-integration`
- `refactor/content-pipeline`
- `docs/architecture-blueprints`
- `hotfix/navigation-crash-issue-42`
- `release/v1.0.0`

---

## 1. Branch Types & Purposes

### 1.1 Permanent Branches

#### `main`
- **Purpose:** Production-ready code
- **Protection:** Protected, requires PR reviews
- **Deploy Target:** Vercel production
- **Merge From:** `release/*`, `hotfix/*`
- **Never Commit Directly:** Always via PR

**Current State:**
```bash
# Latest: b14851c (tag: v0.01)
# Commits ahead of develop: 0
# Last merge: feature/phase2-architecture-design
```

#### `develop`
- **Purpose:** Integration branch for features
- **Protection:** Moderate protection
- **Deploy Target:** Vercel preview/staging
- **Merge From:** `feature/*`, `refactor/*`, `docs/*`
- **Merge To:** `release/*`

**Current State:**
```bash
# Latest: 1fc1314
# Commits behind refactor/content: ~40
# Active PRs: To be determined
```

---

### 1.2 Feature Development Branches

#### `feature/*`
- **Purpose:** New features or enhancements
- **Base Branch:** `develop`
- **Merge To:** `develop` (via PR)
- **Lifetime:** Until feature complete
- **Naming:** `feature/descriptive-name[-issue-num]`

**Active Features:**
```
✓ feature/API                          # GitHub API integration
✓ feature/costom-hooks                 # Custom React hooks (typo noted)
✓ feature/phase2-architecture-design   # Architecture Phase 2
✓ feature/setup-phase1                 # Initial setup
✓ feature/uiux-implementation          # UI/UX components
```

**Future Features (Potential):**
```
feature/markdown-content-pipeline      # ADR-001 implementation
feature/virtual-modules                # ADR-002 implementation
feature/learning-journey-section       # Learning journey UI
feature/blog-section                   # Blog post integration
feature/contact-form                   # Contact form with validation
feature/github-stats-widget            # GitHub contribution widget
feature/seo-optimization               # SEO meta tags & sitemap
feature/pwa-support                    # Progressive Web App
feature/dark-mode-toggle               # Theme switching
feature/analytics-integration          # Google Analytics / Plausible
```

---

#### `refactor/*`
- **Purpose:** Code restructuring without feature changes
- **Base Branch:** `develop`
- **Merge To:** `develop` (via PR)
- **Lifetime:** Short to medium
- **Naming:** `refactor/area-being-refactored`

**Active Refactors:**
```
✓ refactor/content (CURRENT)           # Content pipeline refactoring
```

**Future Refactors (Potential):**
```
refactor/component-structure           # Atomic design restructure
refactor/type-definitions              # Consolidate TypeScript types
refactor/hook-optimization             # Custom hooks performance
refactor/service-layer                 # API service abstraction
refactor/test-coverage                 # Improve test organization
refactor/accessibility                 # A11y improvements (issue #20)
refactor/bundle-optimization           # Code splitting & lazy loading
refactor/css-architecture              # Tailwind organization
```

---

#### `docs/*`
- **Purpose:** Documentation-only changes
- **Base Branch:** `develop` or `main` (for urgent docs)
- **Merge To:** `develop` or `main`
- **Lifetime:** Short (usually single PR)
- **Naming:** `docs/document-type`

**Future Documentation Branches:**
```
docs/api-documentation                 # API endpoint docs
docs/component-library                 # Component usage guide
docs/deployment-guide                  # Deployment instructions
docs/contributing-guide                # CONTRIBUTING.md updates
docs/architecture-updates              # Architecture changes
docs/adr-updates                       # New ADRs
docs/readme-revamp                     # README improvements
docs/code-style-guide                  # Coding standards
```

---

#### `epic/*`
- **Purpose:** Large features spanning multiple sub-features
- **Base Branch:** `develop`
- **Merge To:** `develop` (after all sub-features complete)
- **Lifetime:** Long (weeks to months)
- **Naming:** `epic/epic-name`
- **Sub-branches:** `feature/epic-name-subfeature`

**Potential Epics:**
```
epic/phase-3-testing-deployment        # Phase 3 complete implementation
  ├── feature/phase3-unit-tests
  ├── feature/phase3-e2e-tests
  ├── feature/phase3-ci-cd-pipeline
  └── feature/phase3-deployment-automation

epic/content-management-system         # Full CMS implementation
  ├── feature/cms-markdown-parser
  ├── feature/cms-admin-ui
  ├── feature/cms-preview-mode
  └── feature/cms-content-versioning

epic/performance-optimization          # Lighthouse 90+ achievement
  ├── feature/perf-lazy-loading
  ├── feature/perf-code-splitting
  ├── feature/perf-image-optimization
  └── feature/perf-caching-strategy

epic/accessibility-wcag-aa             # Full WCAG AA compliance
  ├── feature/a11y-keyboard-navigation
  ├── feature/a11y-screen-reader
  ├── feature/a11y-color-contrast
  └── feature/a11y-automated-testing
```

---

#### `experiment/*`
- **Purpose:** Experimental features (may be discarded)
- **Base Branch:** `develop`
- **Merge To:** `develop` (if successful) or DELETE
- **Lifetime:** Short to medium
- **Naming:** `experiment/idea-name`

**Potential Experiments:**
```
experiment/three-js-background         # 3D animated background
experiment/ai-chat-assistant           # AI-powered portfolio chat
experiment/code-playground             # Interactive code demos
experiment/resume-builder              # Dynamic resume generation
experiment/skill-tree-visualization    # Interactive skill graph
experiment/blog-recommendation-engine  # ML-based content suggestions
experiment/voice-navigation            # Voice-controlled navigation
experiment/gamification                # Portfolio achievements system
```

---

### 1.3 Release Management Branches

#### `release/*`
- **Purpose:** Prepare new production release
- **Base Branch:** `develop`
- **Merge To:** `main` AND `develop`
- **Lifetime:** Short (days)
- **Naming:** `release/v{major}.{minor}.{patch}`
- **Activities:** Version bumps, changelog, final testing

**Release Flow:**
```bash
# 1. Create release branch from develop
git checkout develop
git pull origin develop
git checkout -b release/v1.0.0

# 2. Update version numbers
# - package.json version
# - CHANGELOG.md
# - Documentation version footers

# 3. Final testing & bug fixes
npm run test
npm run build
npm run lint

# 4. Merge to main (via PR)
git checkout main
git merge --no-ff release/v1.0.0
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin main --tags

# 5. Merge back to develop
git checkout develop
git merge --no-ff release/v1.0.0
git push origin develop

# 6. Delete release branch
git branch -d release/v1.0.0
```

**Planned Releases:**
```
release/v1.0.0                         # First production release
release/v1.1.0                         # Blog section addition
release/v1.2.0                         # Learning journey enhancement
release/v2.0.0                         # Major redesign (if needed)
```

---

#### `hotfix/*`
- **Purpose:** Emergency production fixes
- **Base Branch:** `main`
- **Merge To:** `main` AND `develop`
- **Lifetime:** Very short (hours)
- **Naming:** `hotfix/issue-description-issue-num`
- **Priority:** CRITICAL

**Hotfix Flow:**
```bash
# 1. Create hotfix from main
git checkout main
git pull origin main
git checkout -b hotfix/navigation-crash-42

# 2. Fix the critical bug
# Make minimal changes to resolve issue

# 3. Test thoroughly
npm run test
npm run build

# 4. Merge to main
git checkout main
git merge --no-ff hotfix/navigation-crash-42
git tag -a v0.1.1 -m "Hotfix: Navigation crash"
git push origin main --tags

# 5. Merge to develop
git checkout develop
git merge --no-ff hotfix/navigation-crash-42
git push origin develop

# 6. Delete hotfix branch
git branch -d hotfix/navigation-crash-42
```

**Potential Hotfixes:**
```
hotfix/cors-api-error                  # API CORS blocking requests
hotfix/mobile-layout-break             # Mobile responsive crash
hotfix/performance-regression          # Lighthouse score drop
hotfix/security-vulnerability          # XSS or security issue
hotfix/deployment-failure              # Production deploy broken
hotfix/data-loss-bug                   # User data not saving
```

---

### 1.4 Issue-Specific Branches

#### `{username}/issue{number}`
- **Purpose:** GitHub issue tracking branches
- **Base Branch:** `develop`
- **Merge To:** `develop` (via PR with issue close)
- **Lifetime:** Until issue resolved
- **Naming:** `{github-username}/issue{issue-number}`

**Active Issues:**
```
✓ joembolinas/issue20                  # Accessibility improvements
✓ joembolinas/issue21                  # Issue tracking
```

**Future Issue Branches:**
```
joembolinas/issue25                    # Example: Fix dark mode toggle
joembolinas/issue30                    # Example: Add blog pagination
joembolinas/issue35                    # Example: Improve mobile nav
```

---

### 1.5 CI/CD & Automation Branches

#### `ci/*`
- **Purpose:** CI/CD pipeline improvements
- **Base Branch:** `develop`
- **Merge To:** `develop`
- **Naming:** `ci/workflow-name`

**Potential CI Branches:**
```
ci/github-actions-setup                # Initial GitHub Actions
ci/lighthouse-automation               # Automated Lighthouse tests
ci/test-coverage-reporting             # Jest coverage reports
ci/dependency-updates                  # Renovate/Dependabot config
ci/preview-deployments                 # PR preview deploys
ci/cache-optimization                  # Build cache improvements
ci/docker-containerization             # Docker build setup
```

---

#### `chore/*`
- **Purpose:** Maintenance tasks (deps, config, etc.)
- **Base Branch:** `develop`
- **Merge To:** `develop`
- **Naming:** `chore/task-description`

**Potential Chore Branches:**
```
chore/dependency-updates               # Package updates
chore/eslint-config-update             # ESLint rules update
chore/gitignore-cleanup                # .gitignore improvements
chore/vscode-settings                  # Workspace settings
chore/prettier-config                  # Code formatting updates
chore/github-templates                 # Issue/PR template updates
```

---

## 2. Branch Creation Commands

### 2.1 Feature Branch Creation

```bash
# Create new feature from develop
git checkout develop
git pull origin develop
git checkout -b feature/your-feature-name

# Push to remote
git push -u origin feature/your-feature-name

# Example: New blog section feature
git checkout develop
git pull origin develop
git checkout -b feature/blog-section
git push -u origin feature/blog-section
```

### 2.2 Refactor Branch Creation

```bash
# Create refactor branch
git checkout develop
git pull origin develop
git checkout -b refactor/area-to-refactor

# Example: Refactor component structure
git checkout develop
git pull origin develop
git checkout -b refactor/component-structure
git push -u origin refactor/component-structure
```

### 2.3 Documentation Branch Creation

```bash
# Create docs branch
git checkout develop
git pull origin develop
git checkout -b docs/documentation-type

# Example: Update API documentation
git checkout develop
git pull origin develop
git checkout -b docs/api-documentation
git push -u origin docs/api-documentation
```

### 2.4 Hotfix Branch Creation (EMERGENCY)

```bash
# Create hotfix from main
git checkout main
git pull origin main
git checkout -b hotfix/critical-issue-description

# Example: Fix navigation crash
git checkout main
git pull origin main
git checkout -b hotfix/navigation-crash-42
git push -u origin hotfix/navigation-crash-42
```

### 2.5 Release Branch Creation

```bash
# Create release branch from develop
git checkout develop
git pull origin develop
git checkout -b release/v1.0.0

# Update version in package.json
npm version minor --no-git-tag-version

# Push release branch
git add package.json package-lock.json
git commit -m "chore(release): bump version to 1.0.0"
git push -u origin release/v1.0.0
```

---

## 3. Branch Switching & Navigation

### 3.1 Switch to Existing Branch

```bash
# Switch to branch (without uncommitted changes)
git checkout <branch-name>

# Examples:
git checkout develop
git checkout main
git checkout feature/blog-section

# Modern syntax (Git 2.23+)
git switch <branch-name>
git switch develop
git switch main
```

### 3.2 Switch with Uncommitted Changes

```bash
# Save uncommitted work
git stash push -m "Work in progress on feature X"

# Switch branch
git checkout <other-branch>

# Later, return and restore
git checkout <original-branch>
git stash pop
```

### 3.3 Switch to Remote Branch

```bash
# Fetch remote branches
git fetch origin

# Check out remote branch
git checkout -b feature/remote-feature origin/feature/remote-feature

# Or modern syntax
git switch -c feature/remote-feature origin/feature/remote-feature
```

### 3.4 List All Branches

```bash
# Local branches
git branch

# All branches (local + remote)
git branch -a

# Remote branches only
git branch -r

# With last commit info
git branch -v
git branch -vv  # Shows tracking info
```

---

## 4. Merging Strategies

### 4.1 Feature → Develop (Merge Commit)

```bash
# Update develop
git checkout develop
git pull origin develop

# Merge feature with merge commit (preserves history)
git merge --no-ff feature/your-feature
git push origin develop

# Delete local feature branch
git branch -d feature/your-feature

# Delete remote feature branch
git push origin --delete feature/your-feature
```

### 4.2 Pull Request Merge (Recommended)

```bash
# Push feature branch
git push origin feature/your-feature

# Create PR on GitHub:
# 1. Go to github.com/joembolinas/myPortfolio
# 2. Click "Compare & pull request"
# 3. Set base: develop, compare: feature/your-feature
# 4. Add description, link issues
# 5. Request reviews
# 6. Merge when approved

# After PR merge, update local develop
git checkout develop
git pull origin develop
git branch -d feature/your-feature
```

### 4.3 Hotfix → Main & Develop

```bash
# Merge hotfix to main
git checkout main
git pull origin main
git merge --no-ff hotfix/critical-fix
git tag -a v0.1.1 -m "Hotfix: Critical bug fix"
git push origin main --tags

# Merge hotfix to develop
git checkout develop
git pull origin develop
git merge --no-ff hotfix/critical-fix
git push origin develop

# Clean up
git branch -d hotfix/critical-fix
git push origin --delete hotfix/critical-fix
```

### 4.4 Release → Main & Develop

```bash
# Merge release to main
git checkout main
git pull origin main
git merge --no-ff release/v1.0.0
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin main --tags

# Merge back to develop
git checkout develop
git pull origin develop
git merge --no-ff release/v1.0.0
git push origin develop

# Delete release branch
git branch -d release/v1.0.0
git push origin --delete release/v1.0.0
```

### 4.5 Rebase Strategy (Alternative)

```bash
# Rebase feature onto latest develop (linear history)
git checkout feature/your-feature
git fetch origin
git rebase origin/develop

# Resolve conflicts if any
# git add <resolved-files>
# git rebase --continue

# Force push (rewrite history)
git push --force-with-lease origin feature/your-feature

# Then merge to develop
git checkout develop
git merge --ff-only feature/your-feature
git push origin develop
```

---

## 5. Conflict Resolution

### 5.1 Merge Conflicts

```bash
# When merge conflict occurs
git merge feature/your-feature
# CONFLICT (content): Merge conflict in src/App.tsx

# Check conflicted files
git status

# Open files, resolve conflicts between markers:
# <<<<<<< HEAD
# Current branch content
# =======
# Incoming branch content
# >>>>>>> feature/your-feature

# Stage resolved files
git add src/App.tsx

# Complete merge
git commit -m "merge: resolve conflicts from feature/your-feature"
```

### 5.2 Rebase Conflicts

```bash
# During rebase
git rebase develop
# CONFLICT: Merge conflict in src/components/HeroSection.tsx

# Resolve conflicts in files
# Stage resolved files
git add src/components/HeroSection.tsx

# Continue rebase
git rebase --continue

# Or abort if needed
git rebase --abort
```

### 5.3 Conflict Prevention

```bash
# Regularly sync with develop
git checkout feature/your-feature
git fetch origin
git merge origin/develop  # or git rebase origin/develop

# Small, frequent commits
# Communicate with team about file changes
# Use feature toggles for incomplete features
```

---

## 6. Branch Cleanup & Maintenance

### 6.1 Delete Local Branches

```bash
# Delete merged branch (safe)
git branch -d feature/completed-feature

# Force delete unmerged branch
git branch -D feature/abandoned-feature

# Delete multiple branches
git branch -d feature/feature1 feature/feature2
```

### 6.2 Delete Remote Branches

```bash
# Delete remote branch
git push origin --delete feature/old-feature

# Delete multiple remote branches
git push origin --delete feature/old1 feature/old2
```

### 6.3 Prune Stale Remote Branches

```bash
# Remove remote-tracking branches that no longer exist
git fetch --prune

# Or
git remote prune origin

# Check what would be pruned
git remote prune origin --dry-run
```

### 6.4 List Stale Branches

```bash
# Branches not updated in 30 days
git for-each-ref --sort=-committerdate refs/heads/ \
  --format='%(committerdate:short) %(refname:short)' \
  | awk '$1 < "'$(date -d '30 days ago' +%Y-%m-%d)'"'

# Merged branches (safe to delete)
git branch --merged develop | grep -v "develop\|main"
```

---

## 7. Advanced Workflows

### 7.1 Cherry-Pick Commits

```bash
# Apply specific commit from another branch
git checkout develop
git cherry-pick <commit-hash>

# Cherry-pick multiple commits
git cherry-pick <hash1> <hash2> <hash3>

# Cherry-pick without committing (review changes first)
git cherry-pick -n <commit-hash>
```

### 7.2 Interactive Rebase (Clean History)

```bash
# Rebase last 5 commits
git rebase -i HEAD~5

# In editor, choose actions:
# pick   = use commit
# reword = use commit, edit message
# edit   = use commit, stop to amend
# squash = combine with previous commit
# fixup  = like squash, discard message
# drop   = remove commit

# Example: Squash 3 commits into 1
# pick abc123 First commit
# squash def456 Second commit
# squash ghi789 Third commit
```

### 7.3 Stash Management

```bash
# Stash with message
git stash push -m "WIP: Blog section UI"

# List stashes
git stash list

# Apply stash (keep in stash list)
git stash apply stash@{0}

# Pop stash (apply and remove)
git stash pop

# Apply specific stash
git stash apply stash@{2}

# Delete stash
git stash drop stash@{0}

# Clear all stashes
git stash clear
```

### 7.4 Bisect (Find Bug Introduction)

```bash
# Start bisect
git bisect start

# Mark current commit as bad
git bisect bad

# Mark old commit as good
git bisect good <commit-hash>

# Git will checkout commits for testing
# After each test:
git bisect good  # if test passes
git bisect bad   # if test fails

# When found, reset
git bisect reset
```

---

## 8. Workflow Automation Scripts

### 8.1 Create Feature Branch Script

```bash
#!/bin/bash
# create-feature.sh

FEATURE_NAME=$1

if [ -z "$FEATURE_NAME" ]; then
  echo "Usage: ./create-feature.sh <feature-name>"
  exit 1
fi

git checkout develop
git pull origin develop
git checkout -b "feature/$FEATURE_NAME"
git push -u origin "feature/$FEATURE_NAME"

echo "✅ Created and pushed feature/$FEATURE_NAME"
```

**Usage:**
```bash
chmod +x create-feature.sh
./create-feature.sh blog-section
```

### 8.2 Clean Merged Branches Script

```bash
#!/bin/bash
# clean-merged-branches.sh

# Delete local merged branches
git branch --merged develop | grep -v "develop\|main" | xargs -r git branch -d

# Prune remote-tracking branches
git fetch --prune

echo "✅ Cleaned merged local branches and pruned remote refs"
```

### 8.3 Sync with Develop Script

```bash
#!/bin/bash
# sync-develop.sh

CURRENT_BRANCH=$(git branch --show-current)

echo "Syncing $CURRENT_BRANCH with latest develop..."

git fetch origin
git merge origin/develop

if [ $? -eq 0 ]; then
  echo "✅ Successfully synced with develop"
else
  echo "❌ Merge conflicts detected. Resolve and commit."
fi
```

---

## 9. Commit Message Conventions

### 9.1 Conventional Commits Format

```
<type>(<scope>): <subject>

[optional body]

[optional footer]
```

**Types:**
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code formatting (no logic change)
- `refactor:` Code restructuring
- `test:` Adding/updating tests
- `chore:` Build process, dependencies
- `perf:` Performance improvements
- `ci:` CI/CD changes

**Examples:**
```bash
# Feature commit
git commit -m "feat(hero): add animated gradient background"

# Bug fix with issue reference
git commit -m "fix(navigation): resolve mobile menu z-index issue

Fixes #42"

# Documentation update
git commit -m "docs(adr): add ADR-006 for state management decision"

# Refactor with breaking change
git commit -m "refactor(hooks)!: change useGitHub return structure

BREAKING CHANGE: useGitHub now returns { data, loading, error }
instead of direct data object."

# Chore commit
git commit -m "chore(deps): update react to 18.3.0"
```

---

## 10. Current Branch Action Plan

### For `refactor/content` (Current Branch)

**Uncommitted Changes:**
```
docs/PHASE-2/Technology_Stack_Blueprint.md         (NEW)
docs/PHASE-2/Folder_Structure_Blueprint.md         (NEW)
docs/PHASE-2/Copilot_Instructions_Blueprint.md     (NEW)
docs/PHASE-2/Code_Exemplars_Blueprint.md           (NEW)
docs/PHASE-2/adr/*.md                              (5 ADRs NEW)
.github/prompt/git-flow-branch-creator.prompt.md   (NEW)
```

**Recommended Actions:**

1. **Stage and Commit Blueprint Documentation**
```bash
# Add all blueprint files
git add docs/PHASE-2/*.md
git add docs/PHASE-2/adr/*.md
git add .github/prompt/git-flow-branch-creator.prompt.md

# Commit with conventional format
git commit -m "docs(blueprints): add comprehensive architecture and workflow documentation

- Add Technology Stack Blueprint (43KB)
- Add Folder Structure Blueprint (44KB)
- Add Copilot Instructions Blueprint (29KB)
- Add Code Exemplars Blueprint (44KB)
- Add 5 ADRs (Build-time parsing, Virtual modules, Plugin architecture, Markdown CMS, TypeScript strict)
- Add Git Flow Branch Creator workflow documentation

Total documentation: ~200KB across 11 files
Completes Phase 2 architecture documentation milestone"

# Push to remote
git push origin refactor/content
```

2. **Create Pull Request**
```bash
# On GitHub:
# Base: develop
# Compare: refactor/content
# Title: "docs: Complete Phase 2 architecture documentation and blueprints"
# Description: Detail all changes, link ADRs, reference project board
```

3. **After Merge, Sync Local**
```bash
# Update develop
git checkout develop
git pull origin develop

# Delete local refactor/content
git branch -d refactor/content

# Delete remote refactor/content (after PR merge)
git push origin --delete refactor/content
```

---

## 11. Branch Protection Rules (Recommended)

### For `main` Branch
```yaml
Protection Rules:
  - Require pull request before merging: ✅
  - Require approvals: 1
  - Dismiss stale reviews: ✅
  - Require status checks: ✅
    - CI/CD tests pass
    - Lighthouse score ≥90
    - Build successful
  - Require branches be up to date: ✅
  - Require signed commits: ❌ (optional)
  - Include administrators: ✅
  - Allow force pushes: ❌
  - Allow deletions: ❌
```

### For `develop` Branch
```yaml
Protection Rules:
  - Require pull request: ✅
  - Require approvals: 1 (can be self-approved)
  - Require status checks: ✅
    - Tests pass
    - Build successful
  - Require linear history: ❌
  - Allow force pushes: ❌
  - Allow deletions: ❌
```

---

## 12. Quick Reference Commands

### Branch Operations
```bash
# List branches
git branch -a

# Create branch
git checkout -b <branch-name>

# Switch branch
git checkout <branch-name>
git switch <branch-name>

# Delete branch (local)
git branch -d <branch-name>
git branch -D <branch-name>  # force

# Delete branch (remote)
git push origin --delete <branch-name>

# Rename branch
git branch -m <old-name> <new-name>

# Track remote branch
git checkout -b <branch> origin/<branch>
```

### Syncing
```bash
# Fetch all changes
git fetch origin

# Pull changes
git pull origin <branch-name>

# Push changes
git push origin <branch-name>

# Push and set upstream
git push -u origin <branch-name>
```

### Status & History
```bash
# Current status
git status

# Commit history
git log --oneline --graph --all -20

# Branch differences
git diff main...develop
git diff --stat main...develop

# Show branch structure
git log --graph --oneline --all --simplify-by-decoration
```

---

## 13. Future Branch Roadmap

### Phase 3: Testing & Deployment
```
epic/phase3-testing-deployment
  ├── feature/unit-testing-vitest
  ├── feature/e2e-testing-playwright
  ├── feature/ci-cd-github-actions
  ├── feature/deployment-automation
  └── docs/testing-strategy
```

### Phase 4: Content Enhancement
```
epic/content-enhancement
  ├── feature/blog-cms-integration
  ├── feature/markdown-preview-editor
  ├── feature/content-search
  └── feature/rss-feed
```

### Phase 5: Performance & SEO
```
epic/optimization
  ├── feature/lighthouse-90-plus
  ├── feature/seo-metadata
  ├── feature/sitemap-generator
  └── feature/web-vitals-monitoring
```

### Phase 6: Advanced Features
```
epic/advanced-features
  ├── feature/ai-chat-assistant
  ├── feature/interactive-demos
  ├── feature/analytics-dashboard
  └── feature/multi-language-support
```

---

## 14. Troubleshooting

### Common Issues

**Issue: "Your branch is behind origin/develop"**
```bash
git pull origin develop
```

**Issue: "Cannot delete branch - not fully merged"**
```bash
git branch -D <branch-name>  # Force delete (be careful!)
```

**Issue: "Merge conflict in multiple files"**
```bash
git status                    # See conflicted files
# Resolve conflicts
git add <resolved-files>
git commit -m "merge: resolve conflicts"
```

**Issue: "Accidentally committed to wrong branch"**
```bash
# If not pushed yet:
git reset --soft HEAD~1       # Undo commit, keep changes
git stash                     # Save changes
git checkout <correct-branch>
git stash pop                 # Apply changes
git commit -m "..."
```

**Issue: "Want to undo last commit"**
```bash
# Keep changes
git reset --soft HEAD~1

# Discard changes (DANGEROUS!)
git reset --hard HEAD~1
```

---

## Appendix: Branch Decision Tree

```
Need to make changes?
  ├── Emergency production fix? → hotfix/*
  ├── Preparing release? → release/*
  ├── New feature? → feature/*
  ├── Code restructure? → refactor/*
  ├── Documentation only? → docs/*
  ├── Large multi-feature work? → epic/*
  ├── Experimental/POC? → experiment/*
  ├── CI/CD changes? → ci/*
  └── Dependencies/config? → chore/*

Where to create branch from?
  ├── hotfix/* → main
  ├── release/* → develop
  └── All others → develop

Where to merge?
  ├── hotfix/* → main + develop
  ├── release/* → main + develop
  └── All others → develop (via PR)

When to delete?
  └── After successful merge to target branch
```

---

**Document Version:** 2.0.0  
**Last Updated:** December 9, 2025  
**Author:** Growth Journey Portfolio Team  
**Repository:** https://github.com/joembolinas/myPortfolio

---

v2.0.0 | Active | Last Updated: Dec 09 2025 - 17:30
