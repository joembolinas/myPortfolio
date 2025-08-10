# Portfolio Development: Command Reference Guide

## 📋 Document Overview

**Purpose:** Complete reference of all commands used during portfolio development  
**Project:** Joe M. Bolinas Portfolio - Career Transition Tool  
**Development Phase:** Phase 1 (Static HTML/CSS/JS Portfolio)  
**Date:** August 2025

---

## 🔧 Git Commands

### **Repository Management**

#### `git status`

**Purpose:** Check current repository state  
**When used:** Before making changes, after modifications, troubleshooting  
**What it shows:** Modified files, staged changes, branch status, merge state  
**Examples from our project:**

```bash
git status
# Output: Shows untracked files, modifications, merge conflicts
```

#### `git add .`

**Purpose:** Stage all changes for commit  
**When used:** Before committing changes  
**What it does:** Prepares all modified files for the next commit  
**Examples from our project:**

```bash
git add .
# Staged: formatting fixes, workflow updates, portfolio content
```

#### `git commit -m "message"`

**Purpose:** Save changes to repository with descriptive message  
**When used:** After staging changes, completing features  
**Best practices:** Clear, descriptive messages explaining what changed  
**Examples from our project:**

```bash
git commit -m "fix: 🎨 Apply Prettier formatting to index.html"
git commit -m "Phase 1 Complete: Personalized portfolio & optimized workflows"
git commit -m "merge: Resolve divergence after formatting fixes"
```

#### `git push origin <branch>`

**Purpose:** Upload local commits to GitHub repository  
**When used:** After committing changes, sharing work  
**What it does:** Synchronizes local branch with remote repository  
**Examples from our project:**

```bash
git push origin feature/setup-phase1
# Pushed: Portfolio personalization, workflow fixes, formatting updates
```

#### `git pull origin <branch>`

**Purpose:** Download and merge remote changes  
**When used:** Before pushing, resolving divergence, staying updated  
**What it does:** Fetches remote changes and merges them locally  
**Examples from our project:**

```bash
git pull origin feature/setup-phase1
# Used to resolve branch divergence during formatting fixes
```

#### `git log --oneline -3`

**Purpose:** View recent commit history in condensed format  
**When used:** Verification after pushing, troubleshooting, progress tracking  
**What it shows:** Last 3 commits with short hashes and messages  
**Examples from our project:**

```bash
git log --oneline -3
# Output:
# 51c7dd4 merge: Resolve divergence after formatting fixes
# 5fc4cff fix: 🎨 Apply Prettier formatting to index.html
# fb63d3a Update others/phase1.md
```

#### `git merge --abort`

**Purpose:** Cancel a merge operation in progress  
**When used:** When merge conflicts are too complex, want to start over  
**What it does:** Returns repository to pre-merge state  
**Examples from our project:**

```bash
git merge --abort
# Used when terminal got stuck in merge editor
```

---

## 📦 NPM Commands

### **Dependency Management**

#### `npm ci`

**Purpose:** Clean install of dependencies from package-lock.json  
**When used:** Setting up project, CI/CD pipelines, clean installs  
**What it does:** Installs exact versions specified in lock file  
**Why important:** Ensures consistent environments across development/production  
**Examples from our project:**

```bash
npm ci
# Used in: GitHub Actions workflow, local setup verification
```

#### `npm install --save-dev <package>`

**Purpose:** Install development dependencies  
**When used:** Adding build tools, linters, formatters  
**What it does:** Adds packages to devDependencies, updates package.json  
**Examples from our project:**

```bash
npm install --save-dev eslint@8.57.0
# Fixed ESLint v9 compatibility issues
```

#### `npm audit`

**Purpose:** Check for security vulnerabilities in dependencies  
**When used:** Regular security checks, before releases, troubleshooting  
**What it shows:** Vulnerability severity, affected packages, fix recommendations  
**Examples from our project:**

```bash
npm audit
# Found: High-severity vulnerabilities in transitive dependencies
```

#### `npm audit fix`

**Purpose:** Automatically fix security vulnerabilities where possible  
**When used:** After finding vulnerabilities, during security maintenance  
**What it does:** Updates packages to secure versions  
**Examples from our project:**

```bash
npm audit fix
# Fixed: Multiple security vulnerabilities automatically
```

#### `npm update`

**Purpose:** Update packages to latest compatible versions  
**When used:** Regular maintenance, fixing vulnerabilities  
**What it does:** Updates within semver ranges specified in package.json  
**Examples from our project:**

```bash
npm update
# Used: To resolve remaining security issues after audit fix
```

### **Development Scripts**

#### `npm run lint`

**Purpose:** Run ESLint to check code quality and style  
**When used:** Before commits, fixing code issues, CI/CD verification  
**What it checks:** Syntax errors, code style, best practices  
**Examples from our project:**

```bash
npm run lint
# Checked: JavaScript files for errors and style consistency
# Result: No linting errors found after fixes
```

#### `npm run format:check`

**Purpose:** Check if files follow Prettier formatting rules  
**When used:** Before commits, CI/CD verification, debugging formatting  
**What it shows:** Files that need formatting, style violations  
**Examples from our project:**

```bash
npm run format:check
# Initially failed: index.html had formatting issues
# After fixes: All matched files use Prettier code style!
```

#### `npm run format` (or `npm run format:write`)

**Purpose:** Automatically format files using Prettier  
**When used:** Fixing formatting issues, preparing for commits  
**What it does:** Applies consistent formatting to all supported files  
**Examples from our project:**

```bash
# Not directly used, but equivalent to:
npx prettier --write .
```

---

## 🎨 Prettier Commands

### **Formatting Operations**

#### `npx prettier --check .`

**Purpose:** Check formatting of all files without changing them  
**When used:** Debugging format issues, verifying consistency  
**What it shows:** Which files have formatting problems  
**Examples from our project:**

```bash
npx prettier --check .
# Output: [warn] others/phase1.md
#         Code style issues found in the above file
```

#### `npx prettier --write .`

**Purpose:** Format all files in project automatically  
**When used:** Fixing formatting issues, preparing clean codebase  
**What it does:** Applies consistent formatting rules to all files  
**Examples from our project:**

```bash
npx prettier --write .
# Formatted: 25+ files including HTML, CSS, JS, JSON, Markdown
# Result: All files now follow consistent code style
```

#### `npx prettier --write <specific-file>`

**Purpose:** Format a specific file  
**When used:** Targeting specific formatting issues, selective formatting  
**What it does:** Applies formatting rules to one file only  
**Examples from our project:**

```bash
npx prettier --write index.html
# Fixed: Specific formatting issues in portfolio HTML file
```

---

## 🔍 ESLint Commands

### **Code Quality Checks**

#### `npx eslint . --ext js,jsx,ts,tsx`

**Purpose:** Run ESLint with specific file extensions  
**When used:** Comprehensive code quality checking  
**What it checks:** Syntax, style, best practices, potential errors  
**Examples from our project:**

```bash
# Configured in package.json as:
"lint": "eslint . --ext js,jsx,ts,tsx --report-unused-disable-directives --max-warnings 0"
```

---

## 🚀 Development Server Commands

### **Local Development**

#### `echo "message"`

**Purpose:** Display verification messages in workflows  
**When used:** Confirming workflow steps, debugging, status updates  
**What it does:** Outputs text to console/logs  
**Examples from our project:**

```bash
echo "Phase 1 static portfolio verified - HTML/CSS/JS ready"
# Used in: GitHub Actions workflow verification steps
```

---

## 🗂️ File System Commands

### **Directory Navigation**

#### `cd /d "path"`

**Purpose:** Change directory (Windows CMD specific)  
**When used:** Navigating to project folder, ensuring correct working directory  
**What it does:** Changes current working directory  
**Examples from our project:**

```bash
cd /d "c:\Users\ADMIN\Desktop\developerFiles\myPortfolio"
# Ensured: All commands run in correct project directory
```

#### `cls`

**Purpose:** Clear terminal screen (Windows CMD)  
**When used:** Cleaning up terminal output, fresh start  
**What it does:** Removes previous command output from view  
**Examples from our project:**

```bash
cls
# Used: When terminal became cluttered during troubleshooting
```

---

## 🔄 Command Sequences & Workflows

### **Standard Development Workflow**

```bash
# 1. Check current status
git status

# 2. Make changes to files
# (manual editing)

# 3. Verify quality locally
npm run lint
npm run format:check

# 4. Fix any issues
npx prettier --write .
npm run lint

# 5. Stage changes
git add .

# 6. Commit changes
git commit -m "descriptive message"

# 7. Push to remote
git push origin <branch-name>
```

### **Formatting Fix Workflow**

```bash
# 1. Identify formatting issues
npm run format:check

# 2. Fix all formatting issues
npx prettier --write .

# 3. Verify fixes
npm run format:check

# 4. Commit and push
git add .
git commit -m "fix: Apply Prettier formatting"
git push origin <branch>
```

### **Security Update Workflow**

```bash
# 1. Check for vulnerabilities
npm audit

# 2. Fix automatically where possible
npm audit fix

# 3. Manual updates if needed
npm update

# 4. Verify no vulnerabilities remain
npm audit

# 5. Test functionality
npm run lint
npm run format:check

# 6. Commit updates
git add .
git commit -m "fix: Update dependencies for security"
git push origin <branch>
```

### **Troubleshooting Workflow**

```bash
# 1. Check overall status
git status
npm run lint
npm run format:check

# 2. Fix issues individually
npx prettier --write .
npm audit fix

# 3. Verify all fixes
npm run format:check
npm run lint
npm audit

# 4. Commit all fixes
git add .
git commit -m "fix: Resolve [specific issues]"
git push origin <branch>
```

---

## 📊 Command Success Indicators

### **Git Commands**

- `git status`: "nothing to commit, working tree clean"
- `git push`: No error messages, branch updated
- `git pull`: "Already up to date" or successful merge

### **NPM Commands**

- `npm ci`: "added X packages" without errors
- `npm audit`: "found 0 vulnerabilities"
- `npm run lint`: No output (means no errors)

### **Prettier Commands**

- `npx prettier --check .`: "All matched files use Prettier code style!"
- `npx prettier --write .`: Shows formatted files with timing

---

## ⚠️ Common Issues & Solutions

### **Git Issues**

```bash
# Branch divergence
git pull origin <branch>
git push origin <branch>

# Merge conflicts
git status
# Resolve conflicts manually
git add .
git commit -m "merge: resolve conflicts"
```

### **Formatting Issues**

```bash
# Always fix with
npx prettier --write .
# Then verify with
npm run format:check
```

### **Dependency Issues**

```bash
# Clean reinstall
rm -rf node_modules package-lock.json
npm install
# Or use
npm ci
```

---

## 🎯 Command Usage Statistics (Our Project)

### **Most Used Commands**

1. `git status` - Used ~15 times (status checking)
2. `npm run format:check` - Used ~8 times (formatting verification)
3. `npx prettier --write .` - Used ~5 times (formatting fixes)
4. `git commit -m "..."` - Used ~6 times (saving changes)
5. `git push origin feature/setup-phase1` - Used ~4 times (sharing work)

### **Problem-Solving Commands**

1. `npm audit` - Security vulnerability detection
2. `npm audit fix` - Automatic security fixes
3. `git pull origin <branch>` - Resolving branch divergence
4. `npx prettier --write .` - Formatting issue resolution
5. `npm ci` - Clean dependency installation

### **Verification Commands**

1. `npm run lint` - Code quality verification
2. `npm run format:check` - Formatting verification
3. `git log --oneline -3` - Commit history verification
4. `git status` - Repository state verification

---

## 📚 Learning Notes

### **Why These Commands Matter**

- **Git commands:** Version control, collaboration, deployment
- **NPM commands:** Dependency management, security, automation
- **Prettier commands:** Code consistency, team collaboration, maintainability
- **ESLint commands:** Code quality, bug prevention, best practices

### **Professional Development Impact**

- **Consistency:** These commands ensure professional code quality
- **Collaboration:** Standard workflows enable team development
- **Automation:** Commands integrate into CI/CD pipelines
- **Maintenance:** Regular use prevents technical debt

### **Career Relevance**

- **Remote work:** Consistent workflows essential for distributed teams
- **Code reviews:** Clean, formatted code improves review process
- **Professional standards:** Industry-standard tools and practices
- **Problem-solving:** Systematic approach to technical issues

---

**Document Created:** August 3, 2025  
**Last Updated:** August 3, 2025  
**Maintenance:** Add new commands as project evolves
